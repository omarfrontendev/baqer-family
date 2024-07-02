import React, { useEffect, useState } from 'react';
// external
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import "react-datepicker/dist/react-datepicker.css";
// internal
import UploadImage from './UploadImage';
import { ErrorMessage, MainInput } from '../../../components';
import Radio from "./Radio";
// style
import styles from '../.module.scss';

import { Calendar } from "react-date-range";
import { ar } from "date-fns/locale";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from 'dayjs';




const BaseInfo = ({ register, control, errors, watch }) => {

  const { t } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const closeDropMenu = (e) => {
      if (e?.target?.id !== "date-calendar") {
        setShowCalendar(false);
      } else {
        setShowCalendar((prev) => !prev);
      }
    };
    document.body.addEventListener("click", closeDropMenu);
    return () => {
      document.body.removeEventListener("click", closeDropMenu);
    };
  }, []);


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
            <div className={styles.calendar__container}>
              <button
                id="date-calendar"
                onBlur={onBlur}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalendar((prev) => !prev);
                }}
                className={`${styles.date__box} ${
                  errors?.birthDate?.message ? styles.invalid : ""
                } ${watch()?.birthDate ? "" : styles.placeholder}
                  `}
              >
                <span
                  className={`${styles.date__input__label} 
                  ${watch()?.birthDate ? styles.focus : ""}
                  `}
                >
                  تاريخ الميلاد*
                </span>
                {watch()?.birthDate
                  ? dayjs(watch()?.birthDate).format("DD/MM/YYYY")
                  : "تاريخ الميلاد*"}
                <ErrorMessage msg={errors?.birthDate?.message} />
              </button>

              {showCalendar && (
                <div
                  id="date-calendar"
                  onClick={(e) => e.stopPropagation()}
                  style={
                    {
                      // direction: "rtl",
                      // textAlign: "right",
                    }
                  }
                  className={`${styles.picker__container} picker__container`}
                >
                  <Calendar
                    onBlur={onBlur}
                    date={watch()?.birthDate || new Date(1995, 0, 1)}
                    onChange={(e) => onChange(e)}
                    locale={ar}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date(2002, 11, 31)}
                    color="#26C0FF" // Custom color
                  />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default BaseInfo