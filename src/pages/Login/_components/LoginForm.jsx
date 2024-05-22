import React from 'react'

// external
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

// internal 
import { MainButton, MainInput } from '../../../components';
import { useTranslation } from 'react-i18next';

// styles 
import styles from '../.module.scss'
import { Link } from 'react-router-dom';
import api from '../../../api';

const LoginForm = () => {

  const { t } = useTranslation()

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
      try {
        const res = await api.post("/api/login", {
          email: "johndoe@example.com", // required | unique
          password: "password", // required
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }; 


  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e))}
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
        <MainButton type="submit">{t("buttons.login")}</MainButton>
      </div>
      <Link to="/forget-password" className={styles.forget__pass}>
        {t("buttons.forget__pass")}
      </Link>
    </form>
  );
}

export default LoginForm