import type { Buffer } from 'node:buffer';
import type { z } from 'zod';

import { jwtVerify } from 'jose';

export async function verifyToken<S extends z.ZodSchema>(token: string, secret: Buffer<ArrayBuffer>, schema: S) {
  try {
    const { payload } = await jwtVerify(token, secret);
    const result = schema.safeParse(payload);

    if (result.error) {
      return null;
    }

    return result.data;
  }
  catch (_error) {
    return null;
  }
}
