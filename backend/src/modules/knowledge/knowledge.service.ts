
import { Injectable } from '@nestjs/common';
import { KnowledgeRepository } from './repositories/knowledge.repository';

@Injectable()
export class KnowledgeService {

  constructor(private knowledgeRepo: KnowledgeRepository) {}

  async createSubject(tenantId: string, name: string, description?: string) {
    return this.knowledgeRepo.createSubject(tenantId, name, description);
  }

  async getSubjects(tenantId: string) {
  return this.knowledgeRepo.getSubjects(tenantId);
}

async createTopic(
  tenantId: string,
  subjectId: string,
  name: string,
  description?: string
) {

  return this.knowledgeRepo.createTopic(
    tenantId,
    subjectId,
    name,
    description
  );

}

async getTopicsBySubject(
  tenantId: string,
  subjectId: string
) {

  return this.knowledgeRepo.getTopicsBySubject(
    tenantId,
    subjectId
  );

}

async createConcept(
  tenantId: string,
  topicId: string,
  name: string,
  description?: string
) {

  return this.knowledgeRepo.createConcept(
    tenantId,
    topicId,
    name,
    description
  );

}

async getConceptsByTopic(
  tenantId: string,
  topicId: string
) {

  return this.knowledgeRepo.getConceptsByTopic(
    tenantId,
    topicId
  );

}

}