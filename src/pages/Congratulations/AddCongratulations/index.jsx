import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import CongratulationsForm from "../CongratulationsForm";
import { useApi } from "../../../hooks/useApi";
import dayjs from "dayjs";
import uploadFile from "../../../utils/uploadImages";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCongratulations = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    images: yup.array().min(1, "at least 1 item").required("image is required"),
    start_date: yup.string().required(t("errors.required")),
    end_date: yup.string().required(t("errors.required")),
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

  // send congratulations
  const { onRequest: onSendCongratulations } = useApi(
    "/api/addCongratulate",
    "post"
  );

  const onSubmit = async (e) => {
    setSubmitting(true);
    const body = {
      title: e?.name,
      content: e?.description,
      start_date: dayjs(e?.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(e?.end_date).format("YYYY-MM-DD"),
    };

    try {
      const res = await onSendCongratulations(body, "IGNOREMESSAGE");
      if(res?.success) {
        await uploadFile({
          images: e?.images,
          category_type: "congratulate",
          category_id: res?.data?.id,
        });
        toast.success("تمت العملية بنجاح");
        setSubmitting(false);
        navigate("/congratulations");
      }
      } catch (err) {
        console.log(err);
        setSubmitting(false);
      }
      setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={t("AddNewCongratulation")} />
      <CongratulationsForm
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

export default AddCongratulations;
