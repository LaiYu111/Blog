import { useState } from 'react';
import axios from 'axios';
import {getRequestConfig} from '@/utils.js';

const usePost = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState(null); // Consider defining a more specific type based on your data

	const postData = async (url, postData,token, contentType = 'json') => {
		setLoading(true);
		try {
			const config = getRequestConfig({ token, contentType });
			const response = await axios.post(url, postData, config);
			setData(response.data);
			return response.data
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return { postData, loading, error, data };
};

export default usePost;
