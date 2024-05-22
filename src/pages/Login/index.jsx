import React from 'react';
import { Link } from 'react-router-dom';
// global components
import { Logo } from '../../components';
// page components
import LoginForm from './_components/LoginForm';
import styles from './.module.scss';
import { useTranslation } from 'react-i18next';
import api from '../../api';

const Login = () => {

  const { t } = useTranslation()

  return (
    <div className={`${styles.page}`}>
      <div>
        <Logo />
        <LoginForm />
      </div>
      <p className={styles.register__btn}>
        {t("don'tHaveAccount?")} <Link to="/register">{t("new__account")}</Link>
      </p>
    </div>
  );
}

export default Login