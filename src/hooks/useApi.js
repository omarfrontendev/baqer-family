import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export const useApi = (endpoint, method, body) => {
  const [loading, setLoading] = useState(method === "get" ? true : false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const onRequest = async (data, successMsg) => {
    setLoading(true);
    try {
      const res = await api[method](endpoint, data || body);
      setData(res);
      setLoading(false);
      // eslint-disable-next-line no-unused-expressions
      method === "get"
        ? null
        : toast.success(res?.message || successMsg || "تمت العملية بنجاح!");
      return res;
    } catch (err) {
      console.log(err);
      typeof err?.response?.data?.message === "string"
        ? toast.error(err?.response?.data?.message)
        : Object.entries(err?.response?.data?.message).forEach(([key]) =>
            toast.error(err?.response?.data?.message[key][0])
          );
      setError(err);
      setLoading(false);
      return error;
    }
  };

  return { loading, error, data, onRequest };
};
