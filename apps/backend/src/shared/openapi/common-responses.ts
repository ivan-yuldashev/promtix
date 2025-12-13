import { jsonContent } from 'stoker/openapi/helpers';

import { HttpStatusCodes } from '@/shared/constants/http-status-codes';
import { HttpStatusName } from '@/shared/constants/http-status-name';
import { createProblemSchemaWithExample } from '@/shared/problem/create-problem-schema-with-example';

export const unauthorizedResponse = {
  [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    createProblemSchemaWithExample(HttpStatusName.UNAUTHORIZED, '/'),
    'Authorization error',
  ),
};

export const internalServerErrorResponse = {
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
    createProblemSchemaWithExample(HttpStatusName.INTERNAL_SERVER_ERROR, '/'),
    'Internal server error',
  ),
};
