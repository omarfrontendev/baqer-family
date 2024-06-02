import React, { useEffect } from 'react';
import styles from './.module.scss';
import { Loading, Logo, MainButton } from '../../components';
import { useApi } from '../../hooks/useApi';
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import parse from "html-react-parser";

const WelcomePage = () => {

  const { data, loading, onRequest } = useApi("/api/settings", "get");
  const firstTimeLogin = Cookies.get("firstTime") === "true";

  useEffect(() => {
    firstTimeLogin && onRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTimeLogin]);

  if (!firstTimeLogin) return (
    <>
      <Navigate to="/" />
    </>
  );

    if (loading && firstTimeLogin) return <Loading style={{ height: "100vh" }} />;

  return (
    <div className={`${styles.page}`}>
      <div className={styles.content}>
        <Logo />
        {parse(
          `<p className={styles.text}>
              ${data?.data?.welcome_message}
          </p>`
        )}
      </div>
      <MainButton to="/" type="link">
        الصفحة الرئيسية
      </MainButton>
    </div>
  );
}

export default WelcomePage