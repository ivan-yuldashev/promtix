import { testClient } from 'hono/testing';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { createTestApp } from 'tests/helpers/create-test-app';
import { beforeAll, describe, expect, expectTypeOf, it } from 'vitest';

import { env } from '@/infrastructure/config/env';
import { authRouter } from '@/modules/auth/auth.index';

const client = testClient(createTestApp(authRouter));

describe('auth routes', () => {
  const existingEmail = 'auth-user@test.ru';
  const existingPassword = 'password123';

  beforeAll(async () => {
    await client.register.$post({
      json: {
        email: existingEmail,
        password: existingPassword,
      },
    });
  });

  describe('post /register:', () => {
    it('should register a new user successfully', async () => {
      const email = 'newuser@test.ru';
      const password = 'password123';

      const response = await client.register.$post({
        json: {
          email,
          password,
        },
      });

      expect(response.status).toBe(HttpStatusCodes.CREATED);

      if (response.status === HttpStatusCodes.CREATED) {
        const json = await response.json();

        expect(json.user.email).toBe(email);
        expect(json.user).not.toHaveProperty('password');
        expect(json.user).not.toHaveProperty('hash');

        expectTypeOf(json.accessToken).toBeString();
      }

      const cookies = response.headers.getSetCookie();
      expect(cookies).toHaveLength(1);

      const tokenCookie = cookies[0];
      expect(tokenCookie).toContain(`${env.COOKIE_NAME}=`);
      expect(tokenCookie).toContain('HttpOnly');
      expect(tokenCookie).toContain('Path=/');
    });

    it('should fail if the email is already taken', async () => {
      const response = await client.register.$post({
        json: {
          email: existingEmail,
          password: existingPassword,
        },
      });

      expect(response.status).toBe(HttpStatusCodes.CONFLICT);
    });

    it('should fail if the password is too short', async () => {
      const response = await client.register.$post({
        json: {
          email: 'shortpass@test.ru',
          password: '123',
        },
      });

      expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);

      if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
        const json = await response.json();

        expect(json.errors[0]?.source).toHaveProperty('pointer');

        if (json.errors[0] && 'pointer' in json.errors[0].source) {
          expect(json.errors[0].source.pointer).toBe('/body/password');
        }
      }
    });

    it('should fail if the email format is invalid', async () => {
      const response = await client.register.$post({
        json: {
          email: 'not-an-email',
          password: 'password123',
        },
      });

      expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);

      if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
        const json = await response.json();

        expect(json.errors[0]?.source).toHaveProperty('pointer');

        if (json.errors[0] && 'pointer' in json.errors[0].source) {
          expect(json.errors[0].source.pointer).toBe('/body/email');
        }
      }
    });
  });

  describe('post /login:', () => {
    it('should log in successfully and set a secure cookie', async () => {
      const response = await client.login.$post({
        json: {
          email: existingEmail,
          password: existingPassword,
        },
      });

      expect(response.status).toBe(HttpStatusCodes.OK);

      if (response.status === HttpStatusCodes.OK) {
        const json = await response.json();

        expect(json.user.email).toBe(existingEmail);
        expect(json.user).not.toHaveProperty('password');
        expect(json.user).not.toHaveProperty('hash');

        expectTypeOf(json.accessToken).toBeString();
      }

      const cookies = response.headers.getSetCookie();
      expect(cookies).toHaveLength(1);

      const tokenCookie = cookies[0];
      expect(tokenCookie).toContain(`${env.COOKIE_NAME}=`);
      expect(tokenCookie).toContain('HttpOnly');
      expect(tokenCookie).toContain('Path=/');
    });

    it('should fail with an incorrect password', async () => {
      const response = await client.login.$post({
        json: {
          email: existingEmail,
          password: 'wrongpassword',
        },
      });

      expect(response.status).toBe(HttpStatusCodes.UNAUTHORIZED);
    });

    it('should fail if the user does not exist', async () => {
      const response = await client.login.$post({
        json: {
          email: 'nosuchuser@test.ru',
          password: 'password123',
        },
      });

      expect(response.status).toBe(HttpStatusCodes.UNAUTHORIZED);
    });
  });

  describe('post /refresh-token:', () => {
    it('should rotate tokens successfully', async () => {
      const loginResponse = await client.login.$post({
        json: { email: existingEmail, password: existingPassword },
      });

      expect(loginResponse.status).toBe(HttpStatusCodes.OK);

      if (loginResponse.status === HttpStatusCodes.OK) {
        const { accessToken: initialAccessToken } = await loginResponse.json();
        expectTypeOf(initialAccessToken).toBeString();

        const initialRefreshCookies = loginResponse.headers.getSetCookie();
        expect(initialRefreshCookies).toHaveLength(1);

        const initialRefreshCookie = initialRefreshCookies[0]!;
        const initialRefreshToken = initialRefreshCookie.split(';')[0];

        const refreshResponse = await client['refresh-token'].$post(
          {},
          {
            headers: { Cookie: initialRefreshCookie },
          },
        );

        expect(refreshResponse.status).toBe(HttpStatusCodes.OK);

        if (refreshResponse.status === HttpStatusCodes.OK) {
          const { accessToken } = await refreshResponse.json();
          expectTypeOf(accessToken).toBeString();
          expect(accessToken).not.toBe(initialAccessToken);

          const refreshCookies = refreshResponse.headers.getSetCookie();
          expect(refreshCookies).toHaveLength(1);

          const refreshCookie = refreshCookies[0]!;
          const newRefreshtoken = refreshCookie.split(';')[0];
          expect(newRefreshtoken).not.toBe(initialRefreshToken);
        }
      }
    });

    it('should detect token reuse and revoke all sessions', async () => {
      const loginResponse = await client.login.$post({
        json: { email: existingEmail, password: existingPassword },
      });

      const loginCookies = loginResponse.headers.getSetCookie();
      expect(loginCookies).toHaveLength(1);
      const tokenA = loginCookies[0]!;

      const refreshResponse = await client['refresh-token'].$post({}, { headers: { Cookie: tokenA } });

      expect(refreshResponse.status).toBe(HttpStatusCodes.OK);

      const refreshCookies = refreshResponse.headers.getSetCookie();
      expect(refreshCookies).toHaveLength(1);
      const tokenB = refreshCookies[0]!;

      const reuseResponse = await client['refresh-token'].$post({}, { headers: { Cookie: tokenA } });

      expect(reuseResponse.status).toBe(HttpStatusCodes.UNAUTHORIZED);

      const legitimateUserResponse = await client['refresh-token'].$post({}, { headers: { Cookie: tokenB } });

      expect(legitimateUserResponse.status).toBe(HttpStatusCodes.UNAUTHORIZED);
    });

    it('should fail if no cookie provided', async () => {
      const response = await client['refresh-token'].$post();
      expect(response.status).toBe(HttpStatusCodes.UNAUTHORIZED);
    });
  });

  describe('post /logout:', () => {
    it('should logout successfully', async () => {
      const loginResponse = await client.login.$post({
        json: {
          email: existingEmail,
          password: existingPassword,
        },
      });

      const loginCookies = loginResponse.headers.getSetCookie();
      expect(loginCookies).toHaveLength(1);
      const loginCookie = loginCookies[0]!;

      const response = await client.logout.$post(
        {},
        {
          headers: {
            Cookie: loginCookie,
          },
        },
      );

      expect(response.status).toBe(HttpStatusCodes.NO_CONTENT);

      const logoutCookies = response.headers.getSetCookie();
      expect(logoutCookies).toHaveLength(1);

      const logoutCookie = logoutCookies[0];
      expect(logoutCookie).toContain(`${env.COOKIE_NAME}=`);
      expect(logoutCookie).toMatch(/Max-Age=0|Expires=Thu, 01 Jan 1970/);
    });

    it('should return 204 even if no cookie provided', async () => {
      const response = await client.logout.$post();

      expect(response.status).toBe(HttpStatusCodes.NO_CONTENT);
    });
  });
});
