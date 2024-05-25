import React, { useEffect } from 'react';
import styles from './.module.scss';
import { Loading, Logo, MainButton } from '../../components';
import { useApi } from '../../hooks/useApi';

const WelcomePage = () => {

  const { data, loading, onRequest } = useApi("/api/settings", "get");

  useEffect(() => {
    onRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if(loading) return <Loading style={{ height: "100vh" }} />

  return (
    <div className={`${styles.page}`}>
      <div className={styles.content}>
        <Logo />
        <p className={styles.text}>
          {data?.data?.welcome_message}
        </p>
      </div>
      <MainButton to="/" type="link">
        الصفحة الرئيسية
      </MainButton>
    </div>
  );
}

export default WelcomePage