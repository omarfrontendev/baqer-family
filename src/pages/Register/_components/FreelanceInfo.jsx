import React, { useState } from "react";
// external
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
// internal
import UploadImage from "./UploadImage";
import { MainInput } from "../../../components";
import Radio from "./Radio";
// style
import styles from "../.module.scss";
import MainGoogleMap from "./MainGoogleMap";

const FreelanceInfo = ({ register, control, errors, watch, isFreelance }) => {
  const { t } = useTranslation();
  const [openMap, setOpenMap] = useState(false);

  return (
    <>
      <Radio
        style={{ margin: "14px auto" }}
        register={register}
        error={errors?.freelance?.message}
        name={"freelance"}
        label={t("freelance")}
        label_1={t("ThereIs")}
        val_1="yes"
        label_2={t("ThereIsNo")}
        val_2="no"
        id_1={"yes_"}
        id_2={"no_"}
      />

      {isFreelance === "yes" && (
        <>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="company.company__image"
            render={({ field: { onChange, value } }) => (
              <UploadImage
                onChange={(e) => onChange(e)}
                value={value}
                id="company__image"
                error={errors?.company?.company__image?.message}
                label={t("companyImage")}
              />
            )}
          />
          <div className="inputs__box">
            <MainInput
              register={register}
              placeholder={t("inputs.companyName")}
              type="text"
              name="company.companyName"
              value={watch()?.company?.companyName}
              error={errors?.company?.companyName?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.description")}
              type="textarea"
              name="company.description"
              value={watch()?.company?.description}
              error={errors?.company?.description?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.managerName")}
              type="text"
              name="company.managerName"
              value={watch()?.company?.managerName}
              error={errors?.company?.managerName?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.email")}
              type="email"
              name="company.email"
              value={watch()?.company?.email}
              error={errors?.company?.email?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.phone")}
              type="number"
              name="company.phone"
              value={watch()?.company?.phone}
              error={errors?.company?.phone?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.whatsapp")}
              type="number"
              name="company.whatsapp"
              value={watch()?.company?.whatsapp}
              error={errors?.company?.whatsapp?.message}
              required
            />
            <MainInput
              register={register}
              placeholder={t("inputs.instagram")}
              type="text"
              name="company.instagram"
              value={watch()?.company?.instagram}
              error={errors?.company?.instagram?.message}
            />
            <MainInput
              register={register}
              placeholder={t("inputs.twitter")}
              type="text"
              name="company.twitter"
              value={watch()?.company?.twitter}
              error={errors?.company?.twitter?.message}
            />
            <MainInput
              register={register}
              placeholder={t("inputs.facebook")}
              type="text"
              name="company.facebook"
              value={watch()?.company?.facebook}
              error={errors?.company?.facebook?.message}
            />
            <button
              className={`${styles.map__button} ${
                watch()?.location?.lat ? styles.active : ""
              }`}
              type="button"
              onClick={() => setOpenMap(true)}
              // onFocus={() => setBtnFocus(true)}
              // onBlur={() => setBtnFocus(false)}
            >
              {watch()?.company?.location?.lat
                ? `lat: ${watch()?.company?.location?.lat} | lng: ${
                    watch()?.company?.location?.lng
                  }`
                : "الموقع"}
              <div className={styles.label}>الموقع</div>
            </button>
            <MainInput
              register={register}
              placeholder={t("inputs.address")}
              type="text"
              name="company.address"
              value={watch()?.company?.address}
              error={errors?.company?.address?.message}
              required
            />
          </div>
          <div className={styles.checkbox}>
            <label htmlFor="showDetailsCompany">
              {t("showDetailsForManager")}
            </label>
            <input
              {...register(
                "company.showDetailsCompany",
                `company.showDetailsCompany is required!`
              )}
              type="checkbox"
              name="company.showDetailsCompany"
              id="showDetailsCompany"
            />
          </div>
        </>
      )}
      {openMap && (
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="company.location"
          render={({ field: { onChange } }) => (
            <MainGoogleMap
              onChange={(e) => onChange(e)}
              onCloseMap={() => setOpenMap(false)}
              watch={watch}
            />
          )}
        />
      )}
    </>
  );
};

export default FreelanceInfo;
