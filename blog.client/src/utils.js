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