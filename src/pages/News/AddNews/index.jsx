import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import NewsForm from "../NewsForm";
import { useApi } from "../../../hooks/useApi";
import uploadFile from "../../../utils/uploadImages";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNews = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string(""),
    images: yup.array().min(1, "at least 1 item").required("image is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // send News
  const { onRequest: onSendNews } = useApi("/api/addNews", "post", "msg");

  const onSubmit = async (e) => {
    setSubmitting(true);
    const body = {
      title: e?.name,
      content: e?.description,
      };

    try {
      const res = await onSendNews(body, "IGNOREMESSAGE");
      if(res?.success) {
        await uploadFile({
          images: e?.images,
          category_type: "news",
          category_id: res?.data?.id,
        });
        toast.success("تمت العملية بنجاح");
        navigate("/news");
        setSubmitting(false);
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={t("AddNews")} />
      <NewsForm
        onSubmit={handleSubmit((e) => onSubmit(e))}
        control={control}
        register={register}
        formData={watch()}
        errors={errors}
        submitting={submitting}
      />
    </div>
  );
};

export default AddNews;
