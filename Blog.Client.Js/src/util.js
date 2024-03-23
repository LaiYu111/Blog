import messages_en from './i18n/messages_en.json';
import messages_zh from './i18n/messages_zh.json';
export class Device {
	static mobile = "mobile"
	static tablet = 'tablet'
	static desktop = 'desktop'
}


export class ContentType {
	static json = "json"
	static images = "images"
}

export class Languages{
	static EN = "en" // English
	static ZH = "zh" // Chinese
}

export const messages = {
	en: messages_en,
	zh: messages_zh,
};

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