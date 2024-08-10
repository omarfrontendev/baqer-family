import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../layout";
import ArchiveForm from "../_components/ArchiveForm";
import { useApi } from "../../../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import uploadArchiveFile from "../../../utils/uploadArchiveFile";

const AddArchive = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ADD SCHEMA
  const schema = yup.object({
    type: yup.number().required(t("errors.required")),
    url: yup.string().when("type", {
      is: (type) => type === 3,
      then: () => yup.string().required(t("errors.required")),
      otherwise: () => yup.object().nullable(),
    }),
    file: yup.mixed().when("type", {
      is: (type) => type === 2,
      then: () => yup.mixed().required(t("errors.required")),
      otherwise: () => yup.mixed().nullable(),
    }),
    image: yup.array().when("type", {
      is: (type) => type === 1,
      then: () =>
        yup.array().min(1, "at least 1 item").required(t("errors.required")),
      otherwise: () => yup.array().nullable(),
    }),
    description: yup.string().required(t("errors.required")),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 1,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const { onRequest: onAddArchive } = useApi("/api/addArchive", "post");

  const onSubmit = async (e) => {
    setSubmitting(true);
    let body;
    if (e?.type === 3) {
      body = {
        url: e.url,
      };
    }

    try {
      const res = await onAddArchive(
        {
          ...body,
          type: e?.type,
          category_id: +slug,
          description: e?.description,
        },
        "IGNOREMESSAGEEVER"
      );
      if (res?.success) {
        await uploadArchiveFile({
          type: e.type,
          archive_id: res?.data?.id,
          file: e?.file || e?.image,
          url: e?.url,
        });
        toast.success("تمت المهمة بنجاح");
        navigate(`/archives`);
      } 
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };
  return (
    <>
      <PageHeader title={t("addNewArchive")} />
      <div className="container">
        <ArchiveForm
          onSubmit={handleSubmit((e) => onSubmit(e))}
          control={control}
          register={register}
          formData={watch()}
          errors={errors}
          submitting={submitting}
          setValue={setValue}
          resetField={resetField}
        />
      </div>
    </>
  );
};

export default AddArchive;
