import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker, ErrorMessage, MainButton, MainGoogleMap, MainInput, UploadImages } from '../../components';
import { useTranslation } from 'react-i18next';
import Select from "react-select";
import styles from './AddNewDiwaniya/.module.scss';

const DiwaniyaForm = ({
  onSubmit,
  control,
  register,
  formData,
  errors,
  submitting,
}) => {
  const { t } = useTranslation();
  const [openMap, setOpenMap] = useState(false);

  const options = [
    {
      value: "Sat",
      label: t("Sat")
    },
    {
      value: "Sat",
      label: t("Sat")
    },
    {
      value: "Sat",
      label: t("Sat")
    },
    {
      value: "Sat",
      label: t("Sat")
    },
    {
      value: "Sat",
      label: t("Sat")
    },
    {
      value: "Sat",
      label: t("Sat")
    },
    {
      value: "Sat",
      label: t("Sat")
    },
  ]

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* Name */}
      <MainInput
        register={register}
        placeholder={t("اسم الديوان")}
        label="اسم الديوان"
        type="text"
        name="name"
        value={formData?.name}
        error={errors?.name?.message}
        required
      />

      {/* overview */}
      <MainInput
        register={register}
        placeholder={t("inputs.description")}
        type="textarea"
        name="description"
        value={formData?.description}
        error={errors?.description?.message}
        required
      />

      <div className={styles.dividing}>
        <span className={styles.text}>موعد الديوان</span>
      </div>

      {/* Date */}
      <DatePicker
        control={control}
        name="date"
        error={errors?.date?.message}
        date={formData?.date}
      />

      {/* <div className={styles.days__container}>
        <div style={{ position: "relative" }}>
          <Select
            styles={{
              control: (styles) => ({
                ...styles,
                height: "64px",
                borderRadius: "8px",
                borderColor: errors?.type?.message ? "#E92121" : "#DEDEDE",
                outline: "none !important",
                borderWidth: "1px",
              }),
              placeholder: (styles) => ({
                ...styles,
                color: errors?.type?.message ? "#E92121" : "",
              }),
            }}
            options={options}
            onChange={(e) => console.log(e?.value)}
            placeholder={t("اختر اليوم")}
          />
          {errors?.type?.message && (
            <ErrorMessage msg={errors?.type?.message} />
          )}
        </div>
      </div> */}

      {/* Address */}
      <MainInput
        register={register}
        placeholder={t("inputs.address")}
        type="text"
        name="address"
        value={formData?.address}
        error={errors?.address?.message}
        required
      />

      {/* Google Map */}
      <button
        className={`${styles.map__button} ${
          formData?.location?.lat ? styles.active : ""
        }`}
        type="button"
        onClick={() => setOpenMap(true)}
      >
        {formData?.location?.lat
          ? `lat: ${formData?.location?.lat} | lng: ${formData?.location?.lng}`
          : "موقع الديوان (لوكيشن)*"}
        <div className={styles.label}>*موقع الديوان (لوكيشن)</div>
        {errors?.location?.lat?.message && (
          <ErrorMessage msg={errors?.location?.lat?.message} />
        )}
      </button>
      {openMap && (
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="location"
          render={({ field: { onChange, onBlur } }) => (
            <MainGoogleMap
              onChange={(e) => onChange(e)}
              onCloseMap={() => {
                onBlur();
                setOpenMap(false);
              }}
              onBlur={onBlur}
              activeLocation={formData?.location}
            />
          )}
        />
      )}

      {/* Phone number */}
      {/* <MainInput
        register={register}
        placeholder={t("inputs.phone")}
        type="number"
        name="phone_number"
        value={formData?.phone_number}
        error={errors?.phone_number?.message}
        required
      /> */}

      {/* Diwaniya image */}
      <UploadImages
        images={formData?.images || []}
        error={errors?.images?.message}
        control={control}
        name="images"
      />

      <MainButton loading={submitting} disabled={submitting} type="submit">
        {t("add")}
      </MainButton>
    </form>
  );
};

export default DiwaniyaForm