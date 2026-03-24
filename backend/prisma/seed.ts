import * as dotenv from 'dotenv'
dotenv.config()

import { PrismaClient, DifficultyLevel } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as argon2 from 'argon2'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  // ---------------- AUTH ----------------
  const password = await argon2.hash('password123')

    const existingTenant = await prisma.tenant.findFirst({
  where: { slug: 'pmp-demo' }
})

if (existingTenant) {
  console.log('⚠️ Tenant already exists. Skipping seed.')
  return
}

  const tenant = await prisma.tenant.create({
    data: {
      name: 'PMP Demo Tenant',
      slug: 'pmp-demo'
    }
  })



  // -------- ROLES --------
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'super_admin',
      scope: 'PLATFORM',
      tenant_id: tenant.id
    }
  })

  const tenantAdminRole = await prisma.role.create({
    data: {
      name: 'tenant_admin',
      scope: 'TENANT',
      tenant_id: tenant.id
    }
  })

  const studentRole = await prisma.role.create({
    data: {
      name: 'student',
      scope: 'TENANT',
      tenant_id: tenant.id
    }
  })

  // -------- USERS --------
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@pmp.com',
      password_hash: password,
      tenant_id: tenant.id
    }
  })

  const tenantAdmin = await prisma.user.create({
    data: {
      email: 'admin@tenant.com',
      password_hash: password,
      tenant_id: tenant.id
    }
  })

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@tenant.com',
      password_hash: password,
      tenant_id: tenant.id
    }
  })

  // -------- USER ROLES --------
  await prisma.userRole.createMany({
    data: [
      { user_id: superAdmin.id, role_id: superAdminRole.id },
      { user_id: tenantAdmin.id, role_id: tenantAdminRole.id },
      { user_id: studentUser.id, role_id: studentRole.id },
    ]
  })

  console.log('✅ Users & roles created')

  // ---------------- SUBJECT ----------------
  const subject = await prisma.subject.create({
    data: {
      name: 'Project Management',
      tenant_id: tenant.id
    }
  })

  // ---------------- TOPICS ----------------
  const riskTopic = await prisma.topic.create({
    data: {
      name: 'Risk Management',
      subject_id: subject.id,
      tenant_id: tenant.id
    }
  })

  const stakeholderTopic = await prisma.topic.create({
    data: {
      name: 'Stakeholder Management',
      subject_id: subject.id,
      tenant_id: tenant.id
    }
  })

  const scheduleTopic = await prisma.topic.create({
    data: {
      name: 'Schedule Management',
      subject_id: subject.id,
      tenant_id: tenant.id
    }
  })

  // ---------------- CONCEPTS ----------------
  const riskConcept = await prisma.concept.create({
    data: {
      name: 'Risk Identification',
      topic_id: riskTopic.id,
      tenant_id: tenant.id
    }
  })

  const stakeholderConcept = await prisma.concept.create({
    data: {
      name: 'Stakeholder Analysis',
      topic_id: stakeholderTopic.id,
      tenant_id: tenant.id
    }
  })

  const scheduleConcept = await prisma.concept.create({
    data: {
      name: 'Critical Path Method',
      topic_id: scheduleTopic.id,
      tenant_id: tenant.id
    }
  })

  console.log('✅ Concepts created')

  // ---------------- QUESTIONS ----------------
  const questionsData = [
    // -------- RISK --------
    {
      conceptId: riskConcept.id,
      stem: 'What is the primary purpose of risk identification?',
      explanation: 'It identifies potential events affecting objectives.',
      difficulty: DifficultyLevel.easy,
      options: [
        { text: 'Eliminate risks', isCorrect: false },
        { text: 'Identify potential events', isCorrect: true },
        { text: 'Assign owners', isCorrect: false },
        { text: 'Monitor risks', isCorrect: false }
      ]
    },
    {
      conceptId: riskConcept.id,
      stem: 'Which technique is used for identifying risks?',
      explanation: 'Brainstorming is commonly used.',
      difficulty: DifficultyLevel.medium,
      options: [
        { text: 'Monte Carlo Simulation', isCorrect: false },
        { text: 'Brainstorming', isCorrect: true },
        { text: 'Earned Value Analysis', isCorrect: false },
        { text: 'Critical Path Method', isCorrect: false }
      ]
    },
    {
      conceptId: riskConcept.id,
      stem: 'Which is NOT an output of risk identification?',
      explanation: 'Issue log is separate from risk identification.',
      difficulty: DifficultyLevel.hard,
      options: [
        { text: 'Risk Register', isCorrect: false },
        { text: 'Risk Breakdown Structure', isCorrect: false },
        { text: 'Risk Reports', isCorrect: false },
        { text: 'Issue Log', isCorrect: true }
      ]
    },

    // -------- STAKEHOLDER --------
    {
      conceptId: stakeholderConcept.id,
      stem: 'Who is considered a stakeholder?',
      explanation: 'Anyone impacted by the project.',
      difficulty: DifficultyLevel.easy,
      options: [
        { text: 'Project sponsor only', isCorrect: false },
        { text: 'Anyone impacted by the project', isCorrect: true },
        { text: 'Team members only', isCorrect: false },
        { text: 'Customers only', isCorrect: false }
      ]
    },
    {
      conceptId: stakeholderConcept.id,
      stem: 'What is the purpose of stakeholder analysis?',
      explanation: 'To understand stakeholder interest and influence.',
      difficulty: DifficultyLevel.medium,
      options: [
        { text: 'Assign roles', isCorrect: false },
        { text: 'Understand influence', isCorrect: true },
        { text: 'Estimate costs', isCorrect: false },
        { text: 'Track risks', isCorrect: false }
      ]
    },
    {
      conceptId: stakeholderConcept.id,
      stem: 'Which stakeholders require the highest engagement?',
      explanation: 'High power and high interest stakeholders.',
      difficulty: DifficultyLevel.hard,
      options: [
        { text: 'Low power, low interest', isCorrect: false },
        { text: 'High power, low interest', isCorrect: false },
        { text: 'High power, high interest', isCorrect: true },
        { text: 'Low power, high interest', isCorrect: false }
      ]
    },

    // -------- SCHEDULE --------
    {
      conceptId: scheduleConcept.id,
      stem: 'What does a project schedule define?',
      explanation: 'Timeline of project activities.',
      difficulty: DifficultyLevel.easy,
      options: [
        { text: 'Budget', isCorrect: false },
        { text: 'Timeline of activities', isCorrect: true },
        { text: 'Risks', isCorrect: false },
        { text: 'Stakeholders', isCorrect: false }
      ]
    },
    {
      conceptId: scheduleConcept.id,
      stem: 'Which technique identifies the longest path?',
      explanation: 'Critical Path Method identifies longest path.',
      difficulty: DifficultyLevel.medium,
      options: [
        { text: 'PERT', isCorrect: false },
        { text: 'Critical Path Method', isCorrect: true },
        { text: 'Monte Carlo', isCorrect: false },
        { text: 'Agile Planning', isCorrect: false }
      ]
    },
    {
      conceptId: scheduleConcept.id,
      stem: 'What happens if a critical path activity is delayed?',
      explanation: 'Project completion is delayed.',
      difficulty: DifficultyLevel.hard,
      options: [
        { text: 'No impact', isCorrect: false },
        { text: 'Project completion delayed', isCorrect: true },
        { text: 'Cost reduces', isCorrect: false },
        { text: 'Scope increases', isCorrect: false }
      ]
    }
  ]

  for (const q of questionsData) {
    const question = await prisma.question.create({
      data: {
        tenant_id: tenant.id,
        created_by: tenantAdmin.id
      }
    })

    const version = await prisma.questionVersion.create({
      data: {
        question_id: question.id,
        version_number: 1,
        question_type: 'MCQ',
        status: 'published',
        difficulty_level: q.difficulty,
        created_by: tenantAdmin.id
      }
    })

    await prisma.questionContent.create({
      data: {
        version_id: version.id,
        stem_text: q.stem,
        explanation: q.explanation
      }
    })

    let order = 1
    for (const opt of q.options) {
      await prisma.questionOption.create({
        data: {
          version_id: version.id,
          option_text: opt.text,
          is_correct: opt.isCorrect,
          option_order: order++
        }
      })
    }

    await prisma.questionConcept.create({
      data: {
        question_id: question.id,
        concept_id: q.conceptId
      }
    })

    await prisma.question.update({
      where: { id: question.id },
      data: {
        current_version_id: version.id
      }
    })
  }

  console.log('✅ Questions seeded successfully')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })