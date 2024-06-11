import React, { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../layout';
import DiwaniyaForm from '../DiwaniyaForm';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
    
const EditDiwaniya = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const location = useLocation();
  const diwaniya = location?.state?.data;
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!diwaniya) navigate("/diwaniyas");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diwaniya]);

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    date: yup.string().required(t("errors.required")),
    address: yup.string().required(t("errors.required")),
    location: yup
      .object({
        lat: yup.string().required(t("errors.required")),
        lng: yup.string().required(t("errors.required")),
      })
      .required(t("errors.required")),
    // phone_number: yup
    //   .string()
    //   .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
    //   .required(t("errors.required")),
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
      images: diwaniya?.images,
      // phone_number: "12321321319",
      location: {
        lat: diwaniya?.lat,
        lng: diwaniya?.long,
      },
      address: diwaniya?.address,
      date: diwaniya?.created_at,
      description: diwaniya?.description,
      name: diwaniya?.name,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  // send diwaniya base-info
  const { onRequest: onSendBaseInfo } = useApi("/api/addDiwan", "post");

  console.log(errors)

  const onSubmit = async (e) => {
    setSubmitting(true);
    console.log(e)

    // Base-info
    const body = {
      name: e?.name,
      address: e?.address,
      description: e?.description,
      category_id: slug,
      lat: e?.location?.lat,
      long: e?.location?.lng,
    };

    // images
    const formdata = new FormData();
    formdata.append("images", e?.images);
    formdata.append("category_type", "diwan");
    formdata.append("category_id", slug);
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      await onSendBaseInfo(body);
      await fetch(`/api/uploadMultipleImage`, requestOptions);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={t("تعديل ديوان ملا باقر")} />
      <DiwaniyaForm
        onSubmit={handleSubmit((e) => onSubmit(e))}
        control={control}
        register={register}
        formData={watch()}
        errors={errors}
        submitting={submitting}
        update
      />
    </div>
  );
};

export default EditDiwaniya;