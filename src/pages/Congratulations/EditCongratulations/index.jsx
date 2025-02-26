import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "../../../layout";
import CongratulationsForm from "../CongratulationsForm";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import uploadFile from "../../../utils/uploadImages";
import { useApi } from "../../../hooks/useApi";
import { toast } from "react-toastify";

const EditCongratulations = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    !state?.data && navigate("/congratulations");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data]);

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    images: yup.array().min(1, "at least 1 item").required("image is required"),
    start_date: yup
      .string()
      .required(t("errors.required"))
      .test(
        "is-smaller",
        "يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء",
        function (value) {
          const { end_date } = this.parent;
          console.log(end_date);
          console.log("run")
          return !end_date || !value || new Date(value) < new Date(end_date);
        }
      ),
    end_date: yup
      .string()
      .required(t("errors.required"))
      .test(
        "is-greater",
        "يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء",
        function (value) {
          const { start_date } = this.parent;
          return (
            !start_date || !value || new Date(value) > new Date(start_date)
          );
        }
      ),
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
      images: [state?.data?.image],
      start_date: state?.data?.start_date,
      end_date: state?.data?.end_date,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  // send congratulations
  const { onRequest: onUpdateCongratulations } = useApi(
    "/api/editCongratulate",
    "post"
  );

  const onSubmit = async (e) => {
    setSubmitting(true);
    const body = {
      title: e?.name,
      congratulate_id: state?.data?.id,
      content: e?.description,
      start_date: dayjs(e?.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(e?.end_date).format("YYYY-MM-DD"),
    };

    try {
      const res = await onUpdateCongratulations(body, "IGNOREMESSAGE");
      if(res?.success) {
        await uploadFile({
          images: e?.images,
          category_type: "congratulate",
          category_id: res?.data?.id,
        });
        toast.success("تمت العملية بنجاح");
        navigate("/congratulations");
        setSubmitting(false);
      }
    } catch (err) {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageHeader title={`${t("edit")} ${state?.data?.title}`} />
      <div className="container">
        <CongratulationsForm
          onSubmit={handleSubmit((e) => onSubmit(e))}
          control={control}
          register={register}
          formData={watch()}
          errors={errors}
          edit
          submitting={submitting}
        />
      </div>
    </>
  );
};

export default EditCongratulations;
