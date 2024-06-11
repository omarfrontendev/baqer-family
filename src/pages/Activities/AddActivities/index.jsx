import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
// import CongratulationsForm from "../CongratulationsForm";
import ActivitiesForm from "../ActivitiesForm";

const AddActivities = () => {
  const { t } = useTranslation();

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
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

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <div className="container">
      <PageHeader title={t("AddActivities")} />
      <ActivitiesForm
        onSubmit={handleSubmit((e) => onSubmit(e))}
        control={control}
        register={register}
        formData={watch()}
        errors={errors}
      />
    </div>
  );
};

export default AddActivities;
