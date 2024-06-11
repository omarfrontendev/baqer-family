import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DiwaniyaForm from '../DiwaniyaForm';
import { PageHeader } from '../../../layout';
import { useApi } from '../../../hooks/useApi';
import { useParams } from 'react-router-dom';

const AddNewDiwaniya = () => {

  const { t } = useTranslation();
  const { slug } = useParams();
  const [submitting, setSubmitting] = useState(false);

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
    // diwanWorkDays: yup.array().min(1, "at least 1 item").required("days is Required!"),
    // phone_number: yup
    //   .string()
    //   .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
    //   .required(t("errors.required")),
    images: yup
      .array()
      .min(1, "at least 1 item")
      .required("image is required"),
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

  // send diwaniya base-info
  const { onRequest: onSendBaseInfo } = useApi("/api/addDiwan", "post");


  const onSubmit = async e => {
    setSubmitting(true);

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
    }catch(err) {
      console.log(err);
      setSubmitting(false);
      }
    setSubmitting(false);
  }

  return (
    <div className="container">
      <PageHeader title={t("addNewDiwaniya")} />
      <DiwaniyaForm
        onSubmit={handleSubmit((e) => onSubmit(e))}
        control={control}
        register={register}
        formData={watch()}
        errors={errors}
        submitting={submitting}
      />
    </div>
  );
}

export default AddNewDiwaniya