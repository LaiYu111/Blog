import {AxiosRequestHeaders} from "axios";

export class Device {
	static mobile = "mobile"
	static tablet = 'tablet'
	static desktop = 'desktop'
}

export interface Token {
	token? : string
}

export interface ContentType{
	contentType? : 'json' | "images"
}

export interface ConfigOptions extends Token, ContentType {}

export const getRequestConfig = ({ token, contentType = 'json' }: ConfigOptions): { headers: AxiosRequestHeaders } => {
	const headers: any = {
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