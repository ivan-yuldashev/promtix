import { HttpStatusName } from '@/shared/constants/http-status-name';

export const InfoStatusCodes = {
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1
   */
  [HttpStatusName.CONTINUE]: 100,
  /**
   * Official Documentation @ https://www.rfc-editor.org/rfc/rfc8297#page-3
   */
  [HttpStatusName.EARLY_HINTS]: 103,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.1
   */
  [HttpStatusName.PROCESSING]: 102,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.2
   */
  [HttpStatusName.SWITCHING_PROTOCOLS]: 101,
} as const;

export const SuccessStatusCodes = {
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3
   */
  [HttpStatusName.ACCEPTED]: 202,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc5842#section-7.1
   */
  [HttpStatusName.ALREADY_REPORTED]: 208,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2
   */
  [HttpStatusName.CREATED]: 201,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc3229#section-10.4.1
   */
  [HttpStatusName.IM_USED]: 226,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.2
   */
  [HttpStatusName.MULTI_STATUS]: 207,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5
   */
  [HttpStatusName.NO_CONTENT]: 204,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.4
   */
  [HttpStatusName.NON_AUTHORITATIVE_INFORMATION]: 203,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1
   */
  [HttpStatusName.OK]: 200,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.1
   */
  [HttpStatusName.PARTIAL_CONTENT]: 206,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.6
   */
  [HttpStatusName.RESET_CONTENT]: 205,
} as const;

export const DeprecatedStatusCodes = {
  /**
   * @deprecated
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.6
   */
  [HttpStatusName.SWITCH_PROXY]: 306,
  /**
   * @deprecated
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.6
   */
  [HttpStatusName.USE_PROXY]: 305,
} as const;

export const RedirectStatusCodes = {
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2
   */
  [HttpStatusName.MOVED_PERMANENTLY]: 301,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3
   */
  [HttpStatusName.MOVED_TEMPORARILY]: 302,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1
   */
  [HttpStatusName.MULTIPLE_CHOICES]: 300,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.1
   */
  [HttpStatusName.NOT_MODIFIED]: 304,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.4
   */
  [HttpStatusName.SEE_OTHER]: 303,
  ...DeprecatedStatusCodes,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7538#section-3
   */
  [HttpStatusName.PERMANENT_REDIRECT]: 308,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.7
   */
  [HttpStatusName.TEMPORARY_REDIRECT]: 307,
} as const;

export const ClientErrorStatusCodes = {
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1
   */
  [HttpStatusName.BAD_REQUEST]: 400,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.8
   */
  [HttpStatusName.CONFLICT]: 409,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14
   */
  [HttpStatusName.EXPECTATION_FAILED]: 417,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.5
   */
  [HttpStatusName.FAILED_DEPENDENCY]: 424,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.3
   */
  [HttpStatusName.FORBIDDEN]: 403,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.9
   */
  [HttpStatusName.GONE]: 410,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2324#section-2.3.2
   */
  [HttpStatusName.IM_A_TEAPOT]: 418,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.10
   */
  [HttpStatusName.LENGTH_REQUIRED]: 411,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.4
   */
  [HttpStatusName.LOCKED]: 423,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.5
   */
  [HttpStatusName.METHOD_NOT_ALLOWED]: 405,
  /**
   * Official Documentation @ https://datatracker.ietf.org/doc/html/rfc7540#section-9.1.2
   */
  [HttpStatusName.MISDIRECTED_REQUEST]: 421,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.6
   */
  [HttpStatusName.NOT_ACCEPTABLE]: 406,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.4
   */
  [HttpStatusName.NOT_FOUND]: 404,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.2
   */
  [HttpStatusName.PAYMENT_REQUIRED]: 402,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.2
   */
  [HttpStatusName.PRECONDITION_FAILED]: 412,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-3
   */
  [HttpStatusName.PRECONDITION_REQUIRED]: 428,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.2
   */
  [HttpStatusName.PROXY_AUTHENTICATION_REQUIRED]: 407,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-5
   */
  [HttpStatusName.REQUEST_HEADER_FIELDS_TOO_LARGE]: 431,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.7
   */
  [HttpStatusName.REQUEST_TIMEOUT]: 408,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.11
   */
  [HttpStatusName.REQUEST_TOO_LONG]: 413,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.12
   */
  [HttpStatusName.REQUEST_URI_TOO_LONG]: 414,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.4
   */
  [HttpStatusName.REQUESTED_RANGE_NOT_SATISFIABLE]: 416,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc8470#section-5.2
   */
  [HttpStatusName.TOO_EARLY]: 425,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-4
   */
  [HttpStatusName.TOO_MANY_REQUESTS]: 429,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.1
   */
  [HttpStatusName.UNAUTHORIZED]: 401,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7725
   */
  [HttpStatusName.UNAVAILABLE_FOR_LEGAL_REASONS]: 451,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.3
   */
  [HttpStatusName.UNPROCESSABLE_ENTITY]: 422,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.13
   */
  [HttpStatusName.UNSUPPORTED_MEDIA_TYPE]: 415,
  /**
   * Official Documentation @ https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.15
   */
  [HttpStatusName.UPGRADE_REQUIRED]: 426,
} as const;

export const ServerErrorStatusCodes = {
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.3
   */
  [HttpStatusName.BAD_GATEWAY]: 502,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.5
   */
  [HttpStatusName.GATEWAY_TIMEOUT]: 504,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.6
   */
  [HttpStatusName.HTTP_VERSION_NOT_SUPPORTED]: 505,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
   */
  [HttpStatusName.INSUFFICIENT_STORAGE]: 507,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1
   */
  [HttpStatusName.INTERNAL_SERVER_ERROR]: 500,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc5842#section-7.2
   */
  [HttpStatusName.LOOP_DETECTED]: 508,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-6
   */
  [HttpStatusName.NETWORK_AUTHENTICATION_REQUIRED]: 511,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2774#section-7
   */
  [HttpStatusName.NOT_EXTENDED]: 510,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2
   */
  [HttpStatusName.NOT_IMPLEMENTED]: 501,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.4
   */
  [HttpStatusName.SERVICE_UNAVAILABLE]: 503,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2295#section-8.1
   */
  [HttpStatusName.VARIANT_ALSO_NEGOTIATES]: 506,
} as const;

export const ErrorStatusCodes = { ...ClientErrorStatusCodes, ...ServerErrorStatusCodes } as const;

export const HttpStatusCodes = {
  ...InfoStatusCodes,
  ...SuccessStatusCodes,
  ...RedirectStatusCodes,
  ...ErrorStatusCodes,
} as const;
