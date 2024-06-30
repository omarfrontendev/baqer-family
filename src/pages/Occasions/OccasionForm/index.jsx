import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  DatePicker,
  ErrorMessage,
  MainButton,
  MainGoogleMap,
  MainInput,
  MyEditor,
  UploadImages,
} from "../../../components";
import { useTranslation } from "react-i18next";
import styles from "./.module.scss";

const OccasionForm = ({
  onSubmit,
  control,
  register,
  formData,
  errors,
  submitting,
  edit,
}) => {
  const { t } = useTranslation();
  const [openMap, setOpenMap] = useState(false);

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* Name */}
      <MainInput
        register={register}
        placeholder={t("اسم المناسبة")}
        label="اسم المناسبة"
        type="text"
        name="name"
        value={formData?.name}
        error={errors?.name?.message}
        required
      />

      {/* overview */}
      <MyEditor
        control={control}
        name="description"
        error={errors?.description?.message}
        value={formData?.description || ""}
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
          : "موقع المناسبة (لوكيشن)*"}
        <div className={styles.label}>*موقع المناسبة (لوكيشن)</div>
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
      <MainInput
        register={register}
        placeholder={t("inputs.phone")}
        type="number"
        name="phone_number"
        value={formData?.phone_number}
        error={errors?.phone_number?.message}
        required
      />

      {/* Date */}
      <DatePicker
        control={control}
        name="date"
        error={errors?.date?.message}
        date={formData?.date}
        defaultDate
        type="المناسبة"
      />

      {/* Diwaniya image */}
      <UploadImages
        images={formData?.images || []}
        error={errors?.images?.message}
        control={control}
        name="images"
        single
      />

      <MainButton loading={submitting} disabled={submitting} type="submit">
        {edit ? t("edit") : t("add")}
      </MainButton>
    </form>
  );
};

export default OccasionForm;
