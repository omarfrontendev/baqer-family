import React from 'react'

// external
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Select from "react-select";

// internal
import { ErrorMessage, MainButton, MainInput } from '../../../components';

// styles
import styles from '../.module.scss';
import { useApi } from '../../../hooks/useApi';

const ForgetPasswordForm = () => {

    const { t } = useTranslation();

    const options = [
      { value: 1, label: t("inputs.password") },
      { value: 2, label: t("inputs.email") },
    ];

    // schema
    const registerSchema = yup
      .object({
        name: yup.string("").required(t("errors.required")),
        type: yup
          .number()
          .typeError(t("errors.must__number"))
          .required(t("errors.required")),
        email: yup.string().when("type", {
          is: 1,
          then: () =>
            yup
              .string()
              .email(t("errors.email"))
              .required(t("errors.required")),
        }),
        civil_number: yup
          .number()
          .typeError(t("errors.must__number"))
          .integer(t("errors.mustBeInteger"))
          .required(t("errors.required")),
        description: yup.string(""),
        title: yup.string("").required(t("errors.required")),
      })
      .required();

    // useForm
    const {
      register,
      handleSubmit,
      control,
      watch,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(registerSchema),
      mode: "all",
    });


    const { loading, onRequest } = useApi("/api/forget-request", "post");

    const onSubmit = e => {
      const body = {
        ...e,
        civil_number: e.civil_number.toString(),
      };

      onRequest(body, "تم طلب إعادة تعيين كلمة المرور بنجاح");
    };

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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="type"
          render={({ field: { onChange, onBlur } }) => (
            <div style={{ position: "relative" }}>
              <Select
                styles={{
                  control: (styles) => ({
                    ...styles,
                    height: "64px",
                    borderRadius: "8px",
                    borderColor: errors?.type?.message ? "#E92121" : "#DEDEDE",
                    outline: "none !important",
                    borderWidth: "1px",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: errors?.type?.message ? "#E92121" : "",
                  }),
                }}
                options={options}
                onBlur={onBlur}
                onChange={(e) => onChange(e?.value)}
                placeholder={t("chooseServiceType")}
              />
              {errors?.type?.message && (
                <ErrorMessage msg={errors?.type?.message} />
              )}
            </div>
          )}
        />
        {watch()?.type === 1 && (
          <MainInput
            register={register}
            placeholder={t("inputs.email")}
            type="email"
            name="email"
            value={watch()?.email}
            error={errors?.email?.message}
            required
          />
        )}
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
        <MainButton type={"submit"} loading={loading} disabled={loading}>
          {watch()?.type === 2
            ? t("buttons.forget__email__btn")
            : t("buttons.forget__pass__btn")}
        </MainButton>
      </div>
    </form>
  );
}

export default ForgetPasswordForm