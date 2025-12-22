import { isDevelopment } from '@/infrastructure/config/env';
import { V1Path } from '@/shared/constants/paths';

export const REFRESH_COOKIE_CONFIG = {
  httpOnly: true,
  path: V1Path.REFRESH_TOKEN,
  sameSite: 'Strict' as const,
  secure: !isDevelopment,
};
