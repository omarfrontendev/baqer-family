import React from "react";
import styles from "../.module.scss";
import { useTranslation } from "react-i18next";
import BaseInfo from "./BaseInfo";
import WifesSection from "./WifesSection";
import { MainButton } from "../../../components";

const FamilyTreeForm = ({
  onSubmit,
  register,
  control,
  errors,
  formData,
  gender,
  isMarred,
  submitting,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* base info */}
      <div className={styles.dividing}>
        <span className={styles.text}>المعلومات الأساسية</span>
      </div>
      <BaseInfo
        register={register}
        control={control}
        errors={errors}
        formData={formData}
        gender={gender}
      />

      {isMarred ? (
        <>
          <div className={styles.dividing}>
            <span className={styles.text}>
              {t(gender === "male" ? "WifesSection" : "HusbandSection")}
            </span>
          </div>
          <div className={styles.wife__section}>
            <WifesSection
              control={control}
              formData={formData}
              gender={gender}
            />
          </div>
        </>
      ) : (
        ""
      )}
      <MainButton type="submit" disabled={submitting} loading={submitting}>
        اضافة الى شجرة العائلة
      </MainButton>
    </form>
  );
};

export default FamilyTreeForm;
