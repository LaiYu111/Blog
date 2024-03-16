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