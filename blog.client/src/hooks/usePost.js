import { useState } from 'react';
import axios from 'axios';
import {getRequestConfig} from '@/utils.js';

const usePost = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState(null);
	const [progress, setProgress] = useState(0);

	const postData = async (url, postData, token, contentType = 'json') => {
		setLoading(true);
		try {
			const config = getRequestConfig({ token, contentType });

			// 配置 axios 的onUploadProgress (获取图片上传进度)
			if (contentType === 'images') {
				config.onUploadProgress = (progressEvent) => {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					setProgress(percentCompleted); // 更新进度条状态
				};
			}

			const response = await axios.post(url, postData, config);
			setData(response.data);
			return response.data;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
			setProgress(0); // 重置进度条状态
		}
	};


	return { postData, loading, error, data, progress };
};

export default usePost;
