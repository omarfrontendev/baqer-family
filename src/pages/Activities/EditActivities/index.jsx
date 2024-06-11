import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
// import CongratulationsForm from "../CongratulationsForm";
import ActivitiesForm from "../ActivitiesForm";

const EditActivities = () => {
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
    defaultValues: {
      name: "new",
      description: "new",
      images: [
        "https://up.yimg.com/ib/th?id=OIP.wwxK07x0Umfnh0l-nrjxjgHaDg&pid=Api&rs=1&c=1&qlt=95&w=253&h=119",
        "https://up.yimg.com/ib/th?id=OIP.YAXlTjvtEKchdMVc5laZhwHaE8&pid=Api&rs=1&c=1&qlt=95&w=179&h=119",
      ],
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <div className="container">
      <PageHeader title={t("Edit")} />
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

export default EditActivities;
