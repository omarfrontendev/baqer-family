import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import OccasionForm from "../OccasionForm";
import { useApi } from "../../../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import uploadFile from "../../../utils/uploadImages";
import { toast } from "react-toastify";

const AddOccasion = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    location: yup
      .object({
        lat: yup.string().required(t("errors.required")),
        lng: yup.string().required(t("errors.required")),
      })
      .required(t("errors.required")),
    phone_number: yup
      .string()
      .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
      .required(t("errors.required")),
    date: yup.string().required(t("errors.required")),
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

  // send occasion
  const { onRequest: onSendOccasion } = useApi("/api/addOccasion", "post");

  const onSubmit = async (e) => {
    setSubmitting(true);

    const body = {
      title: e?.name,
      content: e?.description,
      category_id: slug,
      lat: e?.location?.lat,
      long: e?.location?.lng,
      phone: e?.phone_number,
      date: dayjs(e?.date).format("YYYY-MM-DD")
    };

    try {
      const res = await onSendOccasion(body, "IGNOREMESSAGE");
      if(res?.success) {
        await uploadFile({
          images: e?.images,
          category_type: "occasion",
          category_id: res?.data?.id,
        });
        toast.success("تمت العملية بنجاح");
        navigate("/occasions");
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={t("AddNewOccasions")} />
      <OccasionForm
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

export default AddOccasion;
