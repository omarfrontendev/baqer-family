import React from 'react'

// external
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

// internal 
import { MainButton, MainInput } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../hooks/useApi';

// styles 
import styles from '../.module.scss'

const LoginForm = () => {

  const { t } = useTranslation();
  const token = Cookies.get("token");

  const { loading, onRequest: onLogin } = useApi("/api/login", "post");

  const loginSchema = yup
    .object({
      email: yup
        .string()
        .email(t("errors.email"))
        .required(t("errors.required")),
      password: yup
        .string()
        .required(t("errors.required"))
        .min(8, t("errors.min__length__8")),
    })
    .required();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (e) => {
      const res = await onLogin(e, t("loginSuccessfully"));
      if(res?.success === true) {
          Cookies.set("token", res?.data?.token)
          Cookies.set("user", JSON.stringify(res?.data?.user));
        }
  };

  
  return (
    <>
      {token && <Navigate to='/welcome' />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.login__form}
      >
        <div className={`inputs__box`}>
          <MainInput
            register={register}
            placeholder={t("inputs.email")}
            icon={<MdEmail />}
            type="text"
            name="email"
            error={errors.email?.message}
            required
          />
          <MainInput
            register={register}
            placeholder={t("inputs.password")}
            icon={<RiLockPasswordFill />}
            type="password"
            name="password"
            error={errors.password?.message}
            required
          />
        </div>
        <div className={styles.submit__btn}>
          <MainButton type="submit" loading={loading} disabled={loading}>
            {t("buttons.login")}
          </MainButton>
        </div>
        <Link to="/forget-password" className={styles.forget__pass}>
          {t("buttons.forget__pass")}
        </Link>
      </form>
    </>
  );
}

export default LoginForm