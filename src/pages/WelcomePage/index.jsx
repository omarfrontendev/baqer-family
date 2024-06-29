import React, { useContext, useEffect } from 'react';
import styles from './.module.scss';
import { Loading, Logo, MainButton } from '../../components';
import { useApi } from '../../hooks/useApi';
import parse from "html-react-parser";
import { ModalContext } from '../../context/ModalContext';
import ChooseLayoutPopup from './_components/ChooseLayoutPopup';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const WelcomePage = () => {

  const { setIdModal, idModal } = useContext(ModalContext);
  const { data, loading, onRequest } = useApi("/api/settings", "get");
  const { default_page } = JSON.parse(Cookies.get("user"));

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if(default_page === 0) return <Navigate to="/login" />;
  if(default_page === 1) return <Navigate to="/" />;
  if(default_page === 2) return <Navigate to="/" />;

  if(loading) return <Loading style={{ height: "100vh" }} />;

  return (
    <>
      <div className={`${styles.page}`}>
        <div className={styles.content}>
          <Logo />
          {parse(
            `<p className={styles.text}>
                ${data?.data?.welcome_message}
            </p>`
          )}
        </div>
        <MainButton onClick={() => setIdModal("choose-layout")}>
          الصفحة الرئيسية
        </MainButton>
      </div>
      {idModal === "choose-layout" && (
        <ChooseLayoutPopup />
      )}
    </>
  );
}

export default WelcomePage