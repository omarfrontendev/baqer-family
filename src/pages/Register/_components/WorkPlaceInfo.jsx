import React from "react";
// external
import { useTranslation } from "react-i18next";
// internal
import {  MainInput } from "../../../components";
import Radio from "./Radio";
// style
import styles from "../.module.scss";

const WorkPlaceInfo = ({ register, isWork, errors, watch }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* work Place */}
      <Radio
        style={{ margin: "14px auto" }}
        register={register}
        error={errors?.workPlace?.message}
        name={"workPlace"}
        label={t("workPlace")}
        label_1={t("ThereIs")}
        val_1="yes"
        label_2={t("ThereIsNo")}
        val_2="no"
      />

      {isWork && (
        <>
          {/* work Type */}
          <Radio
            style={{ margin: "20px auto 36px" }}
            register={register}
            error={errors?.work?.workType?.message}
            name={"work.workType"}
            label={t("workType")}
            label_1={t("main")}
            val_1="main"
            label_2={t("notMain")}
            val_2="notMain"
          />

          <div className="inputs__box">
            <MainInput
              register={register}
              placeholder={t("inputs.workPlaceName")}
              type="text"
              name="work.workPlaceName"
              value={watch()?.work?.workPlaceName}
              error={errors?.work?.workPlaceName?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.serviceType")}
              type="text"
              name="work.serviceType"
              value={watch()?.work?.serviceType}
              error={errors?.work?.serviceType?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.description")}
              type="textarea"
              name="work.description"
              value={watch()?.work?.description}
              error={errors?.work?.description?.message}
              required
            />
          </div>

          {/* <div className={styles.checkbox}>
            <label htmlFor="showDetails">{t("showDetailsForManager")}</label>
            <input
              {...register("work.showDetails", `work.showDetails is required!`)}
              type="checkbox"
              name="work.showDetails"
              id="showDetails"
            />
          </div> */}
        </>
      )}
    </>
  );
};

export default WorkPlaceInfo;
