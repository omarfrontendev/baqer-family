import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import LiquidationForm from "../LiquidationForm";
import { useApi } from "../../../hooks/useApi";
import uploadFile from "../../../utils/uploadImages";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddLiquidation = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    // owner: yup.string("").required(t("errors.required")),
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
    
    try {
      const res = await onAddProduct(body, "IGNOREMESSAGE");
      if (res?.success) {
        await uploadFile({
          images: e?.images,
          category_type: "products",
          category_id: res?.data[0]?.id,
        });
        reset();
        toast.success("تمت العملية بنجاح");
        navigate("/liquidation");
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageHeader title={t("AddNewLiquidation")} />
      <div className="container">
        <LiquidationForm
          onSubmit={handleSubmit((e) => onSubmit(e))}
          control={control}
          register={register}
          formData={watch()}
          errors={errors}
          submitting={submitting}
        />
      </div>
    </>
  );
};

export default AddLiquidation;
