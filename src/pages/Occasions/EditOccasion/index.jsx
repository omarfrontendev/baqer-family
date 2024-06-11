import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import OccasionForm from "../OccasionForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import dayjs from "dayjs";
import uploadFile from "../../../utils/uploadImages";

const EditOccasion = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if(!state?.data) {
      navigate('/occasions');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data])

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
    defaultValues: {
      name: state?.data?.title,
      description: state?.data?.content,
      location: {
        lat: state?.data?.lat,
        lng: state?.data?.long,
      },
      phone_number: state?.data?.phone,
      date: state?.data?.date,
      images: state?.data?.images
    },
    resolver: yupResolver(schema),
    mode: "all",
  });
  

  const { onRequest: onSendOccasion } = useApi("/api/editOccasion", "post");

  const onSubmit = async (e) => {
    setSubmitting(true);

    const body = {
      title: e?.name,
      content: e?.description,
      category_id: slug,
      occasion_id: state?.data?.id,
      lat: e?.location?.lat,
      long: e?.location?.lng,
      phone: e?.phone_number,
      date: dayjs(e?.date).format("YYYY-MM-DD"),
    };

    try {
      const res = await onSendOccasion(body);
      res?.success &&
        (await uploadFile({
          images: e?.images,
          category_type: "occasion",
          category_id: res?.data?.id,
        }));    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={`${t("edit")} ${state?.data?.title}`} />
      <OccasionForm
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

export default EditOccasion;
