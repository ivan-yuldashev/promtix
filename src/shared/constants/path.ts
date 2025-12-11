export enum Path {
  HEALTH = '/health',

  DOC = '/doc',
  OPEN_API = '/openapi',

  // Task
  TASK = '/tasks/{id}',
  TASKS = '/tasks',

  // Auth
  LOGIN = '/login',
  LOGOUT = '/logout',
  REFRESH_TOKEN = '/refresh-token',
  REGISTER = '/register',
}
