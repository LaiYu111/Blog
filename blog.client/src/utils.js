export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}:${month}:${day}`;
}


export const getRequestConfig = ({ token, contentType = 'json' }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  switch (contentType) {
    case 'json':
      headers['Content-Type'] = 'application/json';
      break;
    case 'images':
      // Assuming you're sending one image as form-data
      headers['Content-Type'] = 'multipart/form-data';
      break;
    default:
      headers['Content-Type'] = 'application/json';
  }

  return { headers };
};

export const isTokenExpired = (expire) => {
  if (!expire) return true;
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  return now >= expire;
};

export const errorStatusCodeList = () => {
  return [
    400, // Bad Request
    401, // Unauthorized
    402, // Payment Required
    403, // Forbidden
    404, // Not Found
    405, // Method Not Allowed
    406, // Not Acceptable
    407, // Proxy Authentication Required
    408, // Request Timeout
    409, // Conflict
    410, // Gone
    411, // Length Required
    412, // Precondition Failed
    413, // Payload Too Large
    414, // URI Too Long
    415, // Unsupported Media Type
    416, // Range Not Satisfiable
    417, // Expectation Failed
    418, // I'm a Teapot (April Fools' joke)
    421, // Misdirected Request
    422, // Unprocessable Entity
    423, // Locked
    424, // Failed Dependency
    425, // Too Early
    426, // Upgrade Required
    428, // Precondition Required
    429, // Too Many Requests
    431, // Request Header Fields Too Large
    451, // Unavailable For Legal Reasons
    500, // Internal Server Error
    501, // Not Implemented
    502, // Bad Gateway
    503, // Service Unavailable
    504, // Gateway Timeout
    505, // HTTP Version Not Supported
    506, // Variant Also Negotiates
    507, // Insufficient Storage
    508, // Loop Detected
    510, // Not Extended
    511, // Network Authentication Required
  ];
}
