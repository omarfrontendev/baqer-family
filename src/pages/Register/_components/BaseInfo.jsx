import React from 'react';
// external
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// internal
import UploadImage from './UploadImage';
import { ErrorMessage, MainInput } from '../../../components';
import Radio from "./Radio";
// style
import styles from '../.module.scss';

const BaseInfo = ({ register, control, errors, watch }) => {

  const { t } = useTranslation()

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="photo"
        render={({ field: { onChange, value } }) => (
          <UploadImage
            onChange={(e) => onChange(e)}
            value={value}
            error={errors?.photo?.message}
            id="user__photo"
            label={t("userImage")}
          />
        )}
      />

      {/* user name */}
      <div className={styles.user__name__inputs}>
        <MainInput
          register={register}
          placeholder={t("inputs.firstName")}
          type="text"
          name="firstName"
          value={watch()?.firstName}
          error={errors?.firstName?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.secondName")}
          type="text"
          name="secondName"
          value={watch()?.secondName}
          error={errors?.secondName?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.thirdName")}
          type="text"
          name="thirdName"
          value={watch()?.thirdName}
          error={errors?.thirdName?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.fourthName")}
          type="text"
          name="fourthName"
          value={watch()?.fourthName}
          error={errors?.fourthName?.message}
          required
        />
      </div>

      {/* user gender */}
      <Radio
        register={register}
        error={errors?.gender?.message}
        name={"gender"}
        label={t("gender")}
        label_1={t("male")}
        val_1="male"
        label_2={t("female")}
        val_2="female"
      />

      {/* more info */}
      <div className="inputs__box">
        <MainInput
          register={register}
          placeholder={t("inputs.civilNo")}
          type="number"
          name="civilNo"
          value={watch()?.civilNo}
          error={errors?.civilNo?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.phone")}
          type="number"
          name="phone"
          value={watch()?.phone}
          error={errors?.phone?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.address")}
          type="text"
          name="address"
          value={watch()?.address}
          error={errors?.address?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.email")}
          type="email"
          name="email"
          value={watch()?.email}
          error={errors?.email?.message}
          required
        />
        {/* ========================= */}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="birthDate"
          render={({ field: { onChange, onBlur } }) => (
            <div
              className={`${styles.date__box} ${
                errors?.birthDate?.message ? styles.invalid : ""
              }`}
            >
              <DatePicker
                onBlur={onBlur}
                selected={watch()?.birthDate}
                onChange={(date) => onChange(date)}
                placeholderText="تاريخ الميلاد*"
                className={`${styles.date__input}`}
              />
              <span
                className={`${styles.date__input__label} ${
                  watch()?.birthDate ? styles.focus : ""
                }`}
              >
                تاريخ الميلاد*
              </span>
              <ErrorMessage msg={errors?.birthDate?.message} />
            </div>
          )}
        />

        {/* ========================= */}
        <MainInput
          register={register}
          placeholder={t("inputs.password")}
          type="password"
          name="password"
          value={watch()?.password}
          error={errors?.password?.message}
          required
        />
        <MainInput
          register={register}
          placeholder={t("inputs.confirmPassword")}
          type="password"
          name="confirmPassword"
          value={watch()?.confirmPassword}
          error={errors?.confirmPassword?.message}
          required
        />
      </div>
    </>
  );
};

export default BaseInfo