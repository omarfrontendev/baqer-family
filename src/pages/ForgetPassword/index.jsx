import React from "react";
// internal
import { useTranslation } from "react-i18next";
// global component
import { ForgetPassIcon } from "../../icons";
// page component
import ForgetPasswordForm from "./_components/ForgetPasswordForm";
// style
import styles from "./.module.scss";

const ForgetPassword = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.page__header}>
        <ForgetPassIcon />
        <h3 className={styles.title}>{t("forgetPassTitle")}</h3>
        <p className={styles.subtitle}>{t("forgetPassSubtitle")}</p>
      </div>
      <ForgetPasswordForm />
    </div>
  );
};

export default ForgetPassword;
