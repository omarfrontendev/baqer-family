import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export const useApi = (endpoint, method, body) => {
  const [loading, setLoading] = useState(method === "get" ? true : false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const onRequest = async (data, onSuccess) => {
    setLoading(true);
    try {
      const res = await api[method](endpoint, data || body);
      setData(res);
      setLoading(false);
      // eslint-disable-next-line no-unused-expressions
      method === "get"
        ? null
        : toast.success(res?.message || "تمت العملية بنجاح!");
      onSuccess && onSuccess();
      return res;
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
      setLoading(false);
      return error;
    }
  };

  return { loading, error, data, onRequest };
};
