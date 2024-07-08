import React, { useContext, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import styles from './.module.scss';
import { useApi } from '../../hooks/useApi';
import { PageHeader } from '../../layout';
import { MainButton, MainInput, Popup } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';

const UserFreelanceRequest = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const freelance = state?.data;
  const navigate = useNavigate();
  const { idModal, setIdModal } = useContext(ModalContext);
  
  useEffect(() => {
    if(!freelance) {
        navigate("/free-business");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelance]);

  // ADD SCHEMA
  const schema = yup.object({
    user_phone: yup
      .number()
      .typeError(t("errors.must__number"))
      .integer(t("errors.mustBeInteger"))
      .positive(t("errors.mustPositive"))
      .required(t("errors.required")),
    user_new_phone: yup
      .number()
      .typeError(t("errors.must__number"))
      .integer(t("errors.mustBeInteger"))
      .positive(t("errors.mustPositive"))
      .nullable()
      .notRequired()
      .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value)),
      // .required(t("errors.required")),
    content: yup.string("").required(t("errors.required")),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_phone: freelance?.contact_phone,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const formData = watch();

  // send News
  const { onRequest, loading } = useApi("/api/user_freelance_request", "post");

  const onSubmit = async (e) => {
    setIdModal("service-inquiry");
  };

  const onSendInquiry = async (data) => {
    setIdModal("")
    const res = await onRequest({
      ...data,
      freelance_id: freelance?.id,
    });
    if(res?.success) {
      reset();
      navigate(`/free-business/${freelance?.id}`);
    }
  }

  return (
    <div className={`container`}>
      <PageHeader title="إرسال إستفسار" />
      <img
        className={styles.company__image}
        src={
          freelance?.company_image ||
          "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"
        }
        alt="company__image"
      />
      <h4 className={styles.title}>{freelance?.company_name}</h4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form__content}>
        {/* Name */}
        <MainInput
          register={register}
          placeholder={"رقم هاتف مسجل مسبقا"}
          label={t("inputs.phone")}
          type="number"
          name="user_phone"
          value={formData?.user_phone}
          error={errors?.user_phone?.message}
          required
        />

        <MainInput
          register={register}
          placeholder={`${t("inputs.phone")} الجديد`}
          label={t("inputs.phone")}
          type="number"
          name="user_new_phone"
          value={formData?.user_new_phone}
          error={errors?.user_new_phone?.message}
          // required
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
      {idModal === "service-inquiry" && (
        <Popup>
          <h5 className={styles.popup__title}>هل أنت راض عن الخدمة؟</h5>
          <div className={styles.btn}>
            <MainButton
              onClick={() =>
                onSendInquiry({
                  ...formData,
                  satisfied: 1,
                })
              }
            >
              راضي
            </MainButton>
            <MainButton
              style={{ background: "#E92121" }}
              onClick={() =>
                onSendInquiry({
                  ...formData,
                  satisfied: 0,
                })
              }
            >
              غير راضى
            </MainButton>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default UserFreelanceRequest