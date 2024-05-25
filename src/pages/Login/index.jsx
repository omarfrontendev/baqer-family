import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// global components
import { Logo } from '../../components';

// page components
import LoginForm from './_components/LoginForm';
import styles from './.module.scss';
import axios from 'axios';
import { useApi } from '../../hooks/useApi';

const Login = () => {

  const { t } = useTranslation();

    // const onTest = async () => {
    //   const res = await axios.get(
    //     "https://fasterlink.me/public/aaaaaa/test.json"
    //   );
    //   console.log(res);
    // };

    // useEffect(() => {
    //   onTest();
    // }, []);

    const { onRequest } = useApi("/public/aaaaaa/test.json", "get");

    useEffect(() => {
      onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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