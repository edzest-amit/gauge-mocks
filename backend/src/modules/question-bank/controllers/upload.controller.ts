import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard'
import * as XLSX from 'xlsx'
import { PrismaService } from '../../../database/prisma.service'
import { Query } from '@nestjs/common'

@Controller('questions')
export class UploadController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadQuestions(
  @UploadedFile() file: Express.Multer.File,
  @Req() req: any,
  @Query('preview') preview: string
)
  
  {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows: any[] = XLSX.utils.sheet_to_json(sheet)

    const errors: any[] = []
    const validRows: any[] = []

    // ---------------- VALIDATION ----------------
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]

      try {
        if (!row.Question) throw new Error('Missing Question')
        if (!row['Option A']) throw new Error('Missing Option A')
        if (!row['Option B']) throw new Error('Missing Option B')
        if (!row['Option C']) throw new Error('Missing Option C')
        if (!row['Option D']) throw new Error('Missing Option D')
        if (!row.Correct) throw new Error('Missing Correct Answer')
        if (!row.Subject) throw new Error('Missing Subject')
        if (!row.Topic) throw new Error('Missing Topic')
        if (!row.Concept) throw new Error('Missing Concept')

        const validCorrect = ['A', 'B', 'C', 'D']
        if (!validCorrect.includes(row.Correct)) {
          throw new Error('Correct must be A/B/C/D')
        }

        if (row.Difficulty) {
          const validDifficulty = ['easy', 'medium', 'hard']
          if (!validDifficulty.includes(row.Difficulty.toLowerCase())) {
            throw new Error('Invalid difficulty')
          }
        }

        validRows.push(row)

      } catch (error: any) {
        errors.push({
          row: i + 2,
          message: error.message
        })
      }
    }

    console.log('VALID ROWS:', validRows.length)
    console.log('ERRORS:', errors)

    if (preview === 'true') {
  return {
    totalRows: rows.length,
    validRows: validRows.length,
    errors,
    previewData: validRows.slice(0, 10) // show first 10 rows
  }
}

    // ---------------- DB SAVE ----------------
    let successCount = 0

    for (const row of validRows) {
      try {
        // -------- SUBJECT --------
        let subject = await this.prisma.subject.findFirst({
          where: {
            tenant_id: req.user.tenantId,
            name: row.Subject
          }
        })

        if (!subject) {
          subject = await this.prisma.subject.create({
            data: {
              name: row.Subject,
              tenant_id: req.user.tenantId
            }
          })
        }

        // -------- TOPIC --------
        let topic = await this.prisma.topic.findFirst({
          where: {
            subject_id: subject.id,
            name: row.Topic,
            tenant_id: req.user.tenantId 
          }
        })

        if (!topic) {
          topic = await this.prisma.topic.create({
            data: {
              name: row.Topic,
              subject_id: subject.id,
              tenant_id: req.user.tenantId 
            }
          })
        }

        // -------- CONCEPT --------
        let concept = await this.prisma.concept.findFirst({
          where: {
            topic_id: topic.id,
            name: row.Concept,
            tenant_id: req.user.tenantId 
          }
        })

        if (!concept) {
          concept = await this.prisma.concept.create({
            data: {
              name: row.Concept,
              topic_id: topic.id,
              tenant_id: req.user.tenantId 
            }
          })
        }

        // -------- QUESTION --------
        const question = await this.prisma.question.create({
          data: {
            tenant_id: req.user.tenantId,
            created_by: req.user.userId
          }
        })

        const version = await this.prisma.questionVersion.create({
          data: {
            question_id: question.id,
            version_number: 1,
            question_type: 'MCQ',
            status: 'published',
            difficulty_level: row.Difficulty?.toLowerCase() || 'medium',
            created_by: req.user.userId
          }
        })

        await this.prisma.questionContent.create({
          data: {
            version_id: version.id,
            stem_text: row.Question,
            explanation: row.Explanation || ''
          }
        })

        const optionKeys = ['Option A', 'Option B', 'Option C', 'Option D']

        for (let i = 0; i < optionKeys.length; i++) {
          const key = optionKeys[i]

          await this.prisma.questionOption.create({
            data: {
              version_id: version.id,
              option_text: row[key],
              is_correct: row.Correct === key.split(' ')[1],
              option_order: i + 1
            }
          })
        }

        await this.prisma.questionConcept.create({
          data: {
            question_id: question.id,
            concept_id: concept.id
          }
        })

        await this.prisma.question.update({
          where: { id: question.id },
          data: {
            current_version_id: version.id
          }
        })

        successCount++

      } catch (error) {
        console.error('DB ERROR:', error)
      }
    }

    return {
      totalRows: rows.length,
      validRows: validRows.length,
      saved: successCount,
      errors
    }
  }
}