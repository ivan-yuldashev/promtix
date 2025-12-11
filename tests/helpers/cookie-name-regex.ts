import { env } from '@/infrastructure/config/env';

export const cookieNameRegex = new RegExp(`^${env.COOKIE_NAME}=`);
