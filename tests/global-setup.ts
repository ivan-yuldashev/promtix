import { execSync } from 'node:child_process';

import { isTest } from '@/infrastructure/config/env';

function cleanup() {
  console.info('🔻 Stopping test DB (Docker)...');

  try {
    execSync('docker compose -f docker-compose.test.yml down -v', {
      stdio: 'inherit',
    });

    console.info('👋 Cleanup finished.');
  } catch (error) {
    console.info('🔴 Error trying to stop Docker containers:', error);
  }
}

export async function setup() {
  if (!isTest) {
    throw new Error("NODE_ENV must be 'test'");
  }

  let dockerStarted = false;

  try {
    console.info('🚀 Starting test DB (Docker)...');

    execSync('docker compose -f docker-compose.test.yml up -d --wait', {
      stdio: 'inherit',
    });

    dockerStarted = true;

    console.info('🔄 Applying migrations (Drizzle)...');

    execSync('drizzle-kit push', {
      stdio: 'inherit',
    });

    console.info('✅ DB is ready for tests.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('🔴 Error during globalSetup:', error.message);
    } else {
      console.error('🔴 Unknown error during globalSetup:', error);
    }

    if (dockerStarted) {
      console.info('Attempting cleanup after failed setup...');

      cleanup();
    }

    throw error;
  }
}

export async function teardown() {
  cleanup();
}
