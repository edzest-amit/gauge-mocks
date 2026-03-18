import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class KnowledgeRepository {
  constructor(private prisma: PrismaService) {}

  async createSubject(tenantId: string, name: string, description?: string) {

    return this.prisma.subject.create({
    data: {
      tenant_id: tenantId,
      name,
      description
    }
    });

  }

  async getSubjects(tenantId: string) {

    return this.prisma.subject.findMany({
    where: {
      tenant_id: tenantId
    },
    orderBy: {
      name: 'asc'
    }
    });

    }

    async createTopic(
  tenantId: string,
  subjectId: string,
  name: string,
  description?: string
) {

  return this.prisma.topic.create({
    data: {
      tenant_id: tenantId,
      subject_id: subjectId,
      name: name,
      description: description
    }
  });

}

async getTopicsBySubject(tenantId: string, subjectId: string) {

  return this.prisma.topic.findMany({
    where: {
      tenant_id: tenantId,
      subject_id: subjectId
    },
    orderBy: {
      name: 'asc'
    }
  });

}

async createConcept(
  tenantId: string,
  topicId: string,
  name: string,
  description?: string
) {

  return this.prisma.concept.create({
    data: {
      tenant_id: tenantId,
      topic_id: topicId,
      name: name,
      description: description
    }
  });

}

async getConceptsByTopic(tenantId: string, topicId: string) {

  return this.prisma.concept.findMany({
    where: {
      tenant_id: tenantId,
      topic_id: topicId
    },
    orderBy: {
      name: 'asc'
    }
  });

}


}

