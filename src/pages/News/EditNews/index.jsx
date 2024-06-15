import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import NewsForm from "../NewsForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import uploadFile from "../../../utils/uploadImages";

const EditNews = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    !state?.data && navigate("/news");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data]);

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
    defaultValues: {
      name: state?.data?.title,
      description: state?.data?.content,
      images: [state?.data?.image],
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  // update News
  const { onRequest: onUpdateNews } = useApi("/api/editNews", "post");

  const onSubmit = async (e) => {
    setSubmitting(true);
    const body = {
      title: e?.name,
      content: e?.description,
      news_id: state?.data?.id,
    };

    try {
      const res = await onUpdateNews(body);
      if(res?.success) {
        await uploadFile({
          images: e?.images,
          category_type: "news",
          category_id: res?.data?.id,
        });
        navigate('/news')
        setSubmitting(false)
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={`${t("edit")} ${state?.data?.title}`} />
      <NewsForm
        onSubmit={handleSubmit((e) => onSubmit(e))}
        control={control}
        register={register}
        formData={watch()}
        errors={errors}
        submitting={submitting}
        edit
      />
    </div>
  );
};

export default EditNews;
