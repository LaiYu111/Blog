import { useState } from 'react';
import axios from 'axios';
import {getRequestConfig} from "../util.ts";

const usePost = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | Error | unknown>('');
	const [data, setData] = useState<any>(null); // Consider defining a more specific type based on your data

	const postData = async (url: string, postData: any, contentType: 'json' | 'images' = 'json', token?: string) => {
		setLoading(true);
		try {
			const config = getRequestConfig({ token, contentType });
			const response = await axios.post(url, postData, config);
			setData(response.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return { postData, loading, error, data };
};

export default usePost;
