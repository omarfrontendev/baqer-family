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
        method === "get" ||
        successMsg === "IGNOREMESSAGE" ||
        successMsg === "IGNOREMESSAGEEVER"
          ? null
          : toast.success(res?.message || successMsg || "تمت العملية بنجاح!");
        return res;
    } catch (err) {
      typeof err?.response?.data?.message === "string"
        ? toast.error(err?.response?.data?.message)
        : typeof err?.response?.data?.message === "object"
        ? Object?.entries(err?.response?.data?.message).forEach(([key]) =>
            toast.error(err?.response?.data?.message[key][0])
          )
        : toast.error("حدث خطأ ما! أعد المحاولة من فضلك");
        setError(err?.response?.data);
      setLoading(false);
      return error;
    }
  };

  return { loading, error, data, onRequest };
};
