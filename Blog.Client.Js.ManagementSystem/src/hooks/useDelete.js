import {useState} from "react";
import {getRequestConfig} from "../util.js";
import axios from "axios";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null); // Consider defining a more specific type based on your data

  const deleteData = async (url, ids=[] ,contentType = "json", token) => {
    setLoading(true);
    try {
      const idsQuery = ids.map(id => `ids=${id}`).join('&');
      const config = getRequestConfig({ token, contentType });
      const response = await axios.delete(`${url}?${idsQuery}`, config);
      setData(response.data);
      return response.data
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error, data };
};

export default useDelete;