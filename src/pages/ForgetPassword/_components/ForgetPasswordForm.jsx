import React from 'react'

// external
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// internal
import { MainButton, MainInput } from '../../../components';

// styles
import styles from '../.module.scss';

const ForgetPasswordForm = () => {

    const { t } = useTranslation()

    // schema
    const registerSchema = yup
      .object({
        name: yup.string("").required(t("errors.required")),
        email: yup
          .string()
          .email(t("errors.email"))
          .required(t("errors.required")),
        civil_number: yup
          .number()
          .typeError(t("errors.must__number"))
          .integer(t("errors.mustBeInteger"))
          .required(t("errors.required")),
        type: yup.number().required(t("errors.required")),
        // title: yup.string("").required(t("errors.required")),
        description: yup.string(""),
      })
      .required();

    // useForm
    const {
    register,
    handleSubmit,
    // control,
    watch,
    formState: { errors, isValid },
    } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
    });

    const onSubmit = e => console.log(e)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.forget__form}>
      <div className="inputs__box">
        <MainInput
          register={register}
          placeholder={t("inputs.userName")}
          type="text"
          name="name"
          value={watch()?.name}
          error={errors?.name?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.email")}
          type="email"
          name="email"
          value={watch()?.email}
          error={errors?.email?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.civilNo")}
          type="number"
          name="civil_number"
          value={watch()?.civil_number}
          error={errors?.civil_number?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.address")}
          type="text"
          name="title"
          value={watch()?.title}
          error={errors?.title?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.description")}
          type="textarea"
          name="description"
          value={watch()?.description}
          error={errors?.description?.message}
        />
      </div>
      {/* submit button */}
      <div className={styles.submit__btn}>
        <MainButton disabled={!isValid} type={"submit"}>
          {t("buttons.forget__pass__btn")}
        </MainButton>
      </div>
    </form>
  );
}

export default ForgetPasswordForm