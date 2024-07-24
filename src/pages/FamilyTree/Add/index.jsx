import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PageHeader } from "../../../layout";
import FamilyTreeForm from "../FamilyTreeForm";
import { useApi } from "../../../hooks/useApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UploadFamilyImages from "../../../utils/UploadFamilyImages";

const AddToFamilyTree = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const schema = yup
    .object({
      photo: yup.mixed("").required(t("errors.required")),
      name: yup.string("").required(t("errors.required")),
      type: yup.string("").required(t("errors.required")),
      follower_to: yup.string("").required(t("errors.required")),
      is_alive: yup.string("").required(t("errors.required")),
      is_divorced: yup.string("").required(t("errors.required")),
      is_relict: yup.string("").required(t("errors.required")),
      marry_type: yup.string("").required(t("errors.required")),
      marry: yup.array().when(["marry_type"], {
        is: (val) => val === "1" || val === "2",
        then: () =>
          yup.array().min(1, "at least 1 wife").required("errors.required"),
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "1",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  console.log(watch()?.marry)

  // get add branch:=
  const { onRequest: onSendData } = useApi("/api/addTreeBranch", "post");

  const onSubmit = async (e) => {
    setSubmitting(true);

    const body = {
      name: e?.name,
      type: +e?.type,
      marry_type: +e?.marry_type,
      follower_to: +e?.follower_to,
      is_alive: +e?.is_alive,
      is_divorced: +e?.is_divorced,
      is_relict: +e?.is_relict,
      marry: e?.marry || [],
    };

    // Base-info

    try {
      const res = await onSendData(body, "IGNOREMESSAGEEVER");
      if (res?.success) {
        console.log(res);
        await UploadFamilyImages({
          images: [e?.photo],
          user_id: res?.data[0]?.id,
        });
        toast.success("تمت العملية بنجاح");
        navigate(`/`);
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const gender = watch()?.type === "1" ? "male" : "female";
  const isMarred = watch()?.marry_type === "1" || watch()?.marry_type === "2";

  useEffect(() => {
    if (watch()?.marry_type) {
      setValue("marry_type", watch()?.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()?.type]);


  return (
    <>
      <PageHeader title={t("addNewDiwaniya")} />
      <div className="container">
        <FamilyTreeForm
          onSubmit={handleSubmit((e) => onSubmit(e))}
          control={control}
          register={register}
          formData={watch()}
          errors={errors}
          submitting={submitting}
          gender={gender}
          isMarred={isMarred}
        />
      </div>
    </>
  );
};

export default AddToFamilyTree;
