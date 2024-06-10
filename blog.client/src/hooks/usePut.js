import { useState } from 'react';
import axios from 'axios';
import {getRequestConfig} from '@/utils.js';

const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const putData = async (url, putData, token, contentType = 'json') => {
    setLoading(true);
    try {
      const config = getRequestConfig({ token, contentType });
      const response = await axios.put(url, putData, config);
      setData(response.data);
      return response.data;
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return { putData, loading, error, data };
};

export default usePut;
