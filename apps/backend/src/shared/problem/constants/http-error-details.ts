import { HttpStatusName } from '@/shared/constants/http-status-name';

export const HttpErrorDetails = {
  [HttpStatusName.BAD_GATEWAY]:
    'The server, while acting as a gateway or proxy, received an invalid response from an upstream server.',
  [HttpStatusName.BAD_REQUEST]: 'Your request is malformed, has invalid syntax, or is missing required fields.',
  [HttpStatusName.CONFLICT]: 'The request conflicts with the current state of the resource (e.g., an edit conflict).',
  [HttpStatusName.EXPECTATION_FAILED]:
    'An expectation indicated in an "Expect" request header could not be met by the server.',
  [HttpStatusName.FAILED_DEPENDENCY]: 'The request failed because it depended on another request that failed.',
  [HttpStatusName.FORBIDDEN]: 'You are authenticated, but you do not have permission to access this resource.',
  [HttpStatusName.GATEWAY_TIMEOUT]:
    'The server, while acting as a gateway or proxy, did not get a response in time from an upstream server.',
  [HttpStatusName.GONE]:
    'The requested resource is no longer available at the server and no forwarding address is known.',
  [HttpStatusName.HTTP_VERSION_NOT_SUPPORTED]: 'The HTTP version used in your request is not supported by the server.',
  [HttpStatusName.IM_A_TEAPOT]: 'I\'m a teapot. (A humorous error code from 1998).',
  [HttpStatusName.INSUFFICIENT_STORAGE]:
    'The server is unable to store the representation needed to complete the request (e.g., out of disk space).',
  [HttpStatusName.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred on the server while processing your request.',
  [HttpStatusName.LENGTH_REQUIRED]: 'The server requires a valid "Content-Length" header for this request.',
  [HttpStatusName.LOCKED]: 'The resource you are trying to access is locked.',
  [HttpStatusName.LOOP_DETECTED]: 'The server detected an infinite loop while processing the request.',
  [HttpStatusName.METHOD_NOT_ALLOWED]: 'The request method (e.g., GET, POST) is not allowed for this resource.',
  [HttpStatusName.MISDIRECTED_REQUEST]:
    'The request was directed at a server that is not able to produce a response (e.g., scheme/authority mismatch).',
  [HttpStatusName.NETWORK_AUTHENTICATION_REQUIRED]:
    'You must authenticate to gain network access (e.g., on a captive portal/Wi-Fi hotspot).',
  [HttpStatusName.NOT_ACCEPTABLE]:
    'The server cannot produce a response matching the list of acceptable values defined in your request\'s headers.',
  [HttpStatusName.NOT_EXTENDED]: 'Further extensions to the request are required for the server to fulfill it.',
  [HttpStatusName.NOT_FOUND]: 'The requested resource could not be found on the server.',
  [HttpStatusName.NOT_IMPLEMENTED]: 'The server does not support the functionality required to fulfill the request.',
  [HttpStatusName.PAYMENT_REQUIRED]: 'This request requires payment. This status is reserved for future use.',
  [HttpStatusName.PRECONDITION_FAILED]:
    'A precondition specified in your request headers (like "If-Match") evaluated to false.',
  [HttpStatusName.PRECONDITION_REQUIRED]:
    'This request must be conditional (e.g., using "If-Match") to prevent update conflicts.',
  [HttpStatusName.PROXY_AUTHENTICATION_REQUIRED]:
    'You must authenticate with the proxy server before this request can be fulfilled.',
  [HttpStatusName.REQUEST_HEADER_FIELDS_TOO_LARGE]:
    'The server is unwilling to process the request because its header fields are too large.',
  [HttpStatusName.REQUEST_TIMEOUT]: 'The server timed out waiting for you to send the complete request.',
  [HttpStatusName.REQUEST_TOO_LONG]:
    'The payload of your request is larger than the server is willing or able to process.',
  [HttpStatusName.REQUEST_URI_TOO_LONG]:
    'The URI (URL) you requested is longer than the server is willing to interpret.',
  [HttpStatusName.REQUESTED_RANGE_NOT_SATISFIABLE]:
    'The range specified in the "Range" header cannot be fulfilled (e.g., it\'s outside the file size).',
  [HttpStatusName.SERVICE_UNAVAILABLE]:
    'The server is not ready to handle the request. This is often due to maintenance or overload. Please try again later.',
  [HttpStatusName.TOO_EARLY]: 'The server is unwilling to process the request because it might be replayed.',
  [HttpStatusName.TOO_MANY_REQUESTS]:
    'You have sent too many requests in a given amount of time ("rate limiting"). Please try again later.',
  [HttpStatusName.UNAUTHORIZED]: 'You are not authenticated. Please provide valid credentials to access this resource.',
  [HttpStatusName.UNAVAILABLE_FOR_LEGAL_REASONS]:
    'Access to this resource is denied as a consequence of a legal demand.',
  [HttpStatusName.UNPROCESSABLE_ENTITY]:
    'Your request was well-formed, but validation failed for the request payload due to semantic errors.',
  [HttpStatusName.UNSUPPORTED_MEDIA_TYPE]:
    'The media format (e.g., "Content-Type") of your request payload is not supported by the server.',
  [HttpStatusName.UPGRADE_REQUIRED]:
    'The server refuses to perform the request using the current protocol but might be willing after you upgrade.',
  [HttpStatusName.VARIANT_ALSO_NEGOTIATES]:
    'A configuration error exists on the server: the resource is configured to engage in content negotiation itself.',
} as const;
