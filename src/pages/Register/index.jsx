import React from 'react';
// internal
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// global component
import { Logo } from '../../components';
// page component
import RegisterForm from './_components/RegisterForm';
// style
import styles from './.module.scss'

const Register = () => {

  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div>
        <Logo />
        <RegisterForm />
      </div>
      <p className={styles.register__btn}>
        {t("alreadyHaveAccount")} <Link to="/login">{t("buttons.login")}</Link>
      </p>
    </div>
  );
}

export default Register