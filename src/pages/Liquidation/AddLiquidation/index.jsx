import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import LiquidationForm from "../LiquidationForm";
import { useApi } from "../../../hooks/useApi";

const AddLiquidation = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    owner: yup.string("").required(t("errors.required")),
    type: yup
      .string()
      .required(t("errors.required")),
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
    stock: yup
      .string()
      .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
      .required(t("errors.required")),
    images: yup.array().min(1, "at least 1 item").required("image is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // Add product
  const { onRequest: onAddProduct } = useApi("/api/addProduct", "post");

  const onSubmit = async (e) => {
    setSubmitting(true);

    // Base-info
    const body = {
      name: e?.name,
      quantity: e?.stock,
      description: e?.description,
      proccess_type: e?.type,
      owner_phone: e?.phone_number,
      lat: e?.location?.lat,
      long: e?.location?.lng,
    };

    // images
    const formdata = new FormData();
    formdata.append("images", e?.images);
    formdata.append("category_type", "diwan");
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    try {
      const res = await onAddProduct(body);
      res?.success && await fetch(`/api/uploadMultipleImage`, requestOptions);
      res?.success && reset();
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={t("AddNewLiquidation")} />
      <LiquidationForm
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

export default AddLiquidation;
