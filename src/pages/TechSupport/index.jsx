import React from 'react';
import { PageHeader } from '../../layout';
import styles from './.module.scss';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi } from '../../hooks/useApi';
import { MainButton, MainInput } from '../../components';

const TechSupport = () => {
  const { t } = useTranslation();

  // ADD SCHEMA
  const schema = yup.object({
    title: yup.string("").required(t("errors.required")),
    content: yup.string("").required(t("errors.required")),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const formData = watch();

  // send News
  const { onRequest, loading } = useApi("/api/technicalSupport", "post");

  const onSubmit = async (e) => {
      const res = await onRequest(e);
      res?.success && reset();
  };

  return (
    <div className={`container`}>
      <PageHeader title={t("TechSupportTitle")} />
      <p className={styles.text}>يرجى إضافة عنوان ووصف للرسالة</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form__content}>
        {/* Name */}
        <MainInput
          register={register}
          placeholder={"العنوان"}
          label="العنوان"
          type="text"
          name="title"
          value={formData?.title}
          error={errors?.title?.message}
          required
        />

        {/* overview */}
        <MainInput
          register={register}
          placeholder={t("inputs.description")}
          type="textarea"
          name="content"
          value={formData?.content}
          error={errors?.content?.message}
            required
        />

        <MainButton loading={loading} disabled={loading} type="submit">
          إرسال
        </MainButton>
      </form>
    </div>
  );
}

export default TechSupport