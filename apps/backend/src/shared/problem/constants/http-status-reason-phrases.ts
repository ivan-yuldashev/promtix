import { HttpStatusName } from '@/shared/constants/http-status-name';

export const InfoReasonPhrases = {
  [HttpStatusName.CONTINUE]: 'Continue',
  [HttpStatusName.EARLY_HINTS]: 'Early Hints',
  [HttpStatusName.PROCESSING]: 'Processing',
  [HttpStatusName.SWITCHING_PROTOCOLS]: 'Switching Protocols',
} as const;

export const SuccessReasonPhrases = {
  [HttpStatusName.ACCEPTED]: 'Accepted',
  [HttpStatusName.ALREADY_REPORTED]: 'Already Reported',
  [HttpStatusName.CREATED]: 'Created',
  [HttpStatusName.IM_USED]: 'IM Used',
  [HttpStatusName.MULTI_STATUS]: 'Multi-Status',
  [HttpStatusName.NO_CONTENT]: 'No Content',
  [HttpStatusName.NON_AUTHORITATIVE_INFORMATION]: 'Non-Authoritative Information',
  [HttpStatusName.OK]: 'OK',
  [HttpStatusName.PARTIAL_CONTENT]: 'Partial Content',
  [HttpStatusName.RESET_CONTENT]: 'Reset Content',
} as const;

export const DeprecatedReasonPhrases = {
  [HttpStatusName.SWITCH_PROXY]: 'Switch Proxy',
  [HttpStatusName.USE_PROXY]: 'Use Proxy',
} as const;

export const RedirectReasonPhrases = {
  [HttpStatusName.MOVED_PERMANENTLY]: 'Moved Permanently',
  [HttpStatusName.MOVED_TEMPORARILY]: 'Moved Temporarily',
  [HttpStatusName.MULTIPLE_CHOICES]: 'Multiple Choices',
  [HttpStatusName.NOT_MODIFIED]: 'Not Modified',
  [HttpStatusName.SEE_OTHER]: 'See Other',
  ...DeprecatedReasonPhrases,
  [HttpStatusName.PERMANENT_REDIRECT]: 'Permanent Redirect',
  [HttpStatusName.TEMPORARY_REDIRECT]: 'Temporary Redirect',
} as const;

export const ClientErrorReasonPhrases = {
  [HttpStatusName.BAD_REQUEST]: 'Bad Request',
  [HttpStatusName.CONFLICT]: 'Conflict',
  [HttpStatusName.EXPECTATION_FAILED]: 'Expectation Failed',
  [HttpStatusName.FAILED_DEPENDENCY]: 'Failed Dependency',
  [HttpStatusName.FORBIDDEN]: 'Forbidden',
  [HttpStatusName.GONE]: 'Gone',
  [HttpStatusName.IM_A_TEAPOT]: 'I\'m a teapot',
  [HttpStatusName.LENGTH_REQUIRED]: 'Length Required',
  [HttpStatusName.LOCKED]: 'Locked',
  [HttpStatusName.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
  [HttpStatusName.MISDIRECTED_REQUEST]: 'Misdirected Request',
  [HttpStatusName.NOT_ACCEPTABLE]: 'Not Acceptable',
  [HttpStatusName.NOT_FOUND]: 'Not Found',
  [HttpStatusName.PAYMENT_REQUIRED]: 'Payment Required',
  [HttpStatusName.PRECONDITION_FAILED]: 'Precondition Failed',
  [HttpStatusName.PRECONDITION_REQUIRED]: 'Precondition Required',
  [HttpStatusName.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy Authentication Required',
  [HttpStatusName.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request Header Fields Too Large',
  [HttpStatusName.REQUEST_TIMEOUT]: 'Request Timeout',
  [HttpStatusName.REQUEST_TOO_LONG]: 'Request Entity Too Large',
  [HttpStatusName.REQUEST_URI_TOO_LONG]: 'Request-URI Too Long',
  [HttpStatusName.REQUESTED_RANGE_NOT_SATISFIABLE]: 'Requested Range Not Satisfiable',
  [HttpStatusName.TOO_EARLY]: 'Too Early',
  [HttpStatusName.TOO_MANY_REQUESTS]: 'Too Many Requests',
  [HttpStatusName.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatusName.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable For Legal Reasons',
  [HttpStatusName.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
  [HttpStatusName.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
  [HttpStatusName.UPGRADE_REQUIRED]: 'Upgrade Required',
} as const;

export const ServerErrorReasonPhrases = {
  [HttpStatusName.BAD_GATEWAY]: 'Bad Gateway',
  [HttpStatusName.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  [HttpStatusName.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP Version Not Supported',
  [HttpStatusName.INSUFFICIENT_STORAGE]: 'Insufficient Storage',
  [HttpStatusName.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HttpStatusName.LOOP_DETECTED]: 'Loop Detected',
  [HttpStatusName.NETWORK_AUTHENTICATION_REQUIRED]: 'Network Authentication Required',
  [HttpStatusName.NOT_EXTENDED]: 'Not Extended',
  [HttpStatusName.NOT_IMPLEMENTED]: 'Not Implemented',
  [HttpStatusName.SERVICE_UNAVAILABLE]: 'Service Unavailable',
  [HttpStatusName.VARIANT_ALSO_NEGOTIATES]: 'Variant Also Negotiates',
} as const;

export const ErrorReasonPhrases = {
  ...ClientErrorReasonPhrases,
  ...ServerErrorReasonPhrases,
} as const;

export const HttpStatusReasonPhrase = {
  ...InfoReasonPhrases,
  ...SuccessReasonPhrases,
  ...RedirectReasonPhrases,
  ...ErrorReasonPhrases,
} as const;
