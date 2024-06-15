import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import LiquidationForm from "../LiquidationForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import uploadFile from "../../../utils/uploadImages";

const EditLiquidation = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { state } = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    owner: yup.string("").required(t("errors.required")),
    type: yup.string().required(t("errors.required")),
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: state?.data?.images,
      stock: state?.data?.quantity,
      phone_number: state?.data?.owner_phone,
      location: {
        lng: state?.data?.lat,
        lat: state?.data?.long,
      },
      type: state?.data?.proccess_type,
      description: state?.data?.description,
      name: state?.data?.name,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  // updates product
  const { onRequest: onUpdateProduct } = useApi("/api/editProduct", "post");

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
      product_id: slug,
    };

    try {
      const res = await onUpdateProduct(body);
      if(res?.success) {
          await uploadFile({
            images: e?.images,
            category_type: "products",
            category_id: res?.data[0]?.id,
          });
          navigate("/liquidation");
        }
      } catch (err) {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <PageHeader title={t("Edit")} />
      <LiquidationForm
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

export default EditLiquidation;
