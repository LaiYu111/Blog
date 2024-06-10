import {useState} from "react";
import {getRequestConfig} from '@/utils.js';
import axios from "axios";

const useGet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null); // Consider defining a more specific type based on your data

  const getData = async (url,token,contentType = "json") => {
    setLoading(true);
    try {
      const config = getRequestConfig({ token, contentType });
      const response = await axios.get(url, config)
      setData(response.data);
      return response.data
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { getData, loading, error, data };
};

export default useGet;