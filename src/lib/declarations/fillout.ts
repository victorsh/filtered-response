import { Request, Response } from 'express'

export type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
}

export type FieldValues = {
  id: string;
  name: string;
  type: 'DatePicker' | 'ShortAnswer'
  value: string;
}

export type Filter = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: string;
}

export type FilterBody = Filter[]
export type FilterQuery = {
  limit?: string;
  afterDate?: string;
  beforeDate?: string;
  offset?: `${number}`
  status?: 'in_progress' | 'finished';
  includeEditLinks?: 'true' | 'false';
  sort?: 'asc' | 'desc';
}
export type FilterParams = {
  formId: string;
}

export interface FilloutRequest extends Request {
  body: FilterBody;
  query: FilterQuery;
  params: FilterParams;
}

export type filterResponse = {
  id: string;
  name: string;
  type: 'ShortAnswer' | 'DatePicker' | 'LongAnswer' | 'MultipleChoice' | 'EmailInput';
  value: string;
}

export type questions = {
  questions: filterResponse[];
  submissionId: string;
  submissionTime: string;
}

export interface FilloutResponse extends Response {
  responses: questions[];
  totalResponses: number;
  pageCount: number;
}