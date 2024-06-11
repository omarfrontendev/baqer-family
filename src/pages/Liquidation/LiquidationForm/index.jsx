import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  ErrorMessage,
  MainButton,
  MainGoogleMap,
  MainInput,
  UploadImages,
} from "../../../components";
import { useTranslation } from "react-i18next";
import styles from "./.module.scss";
import Select from "react-select";

const LiquidationForm = ({
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

  const options = [
    { value: "sale", label: t("forSale") },
    { value: "borrow", label: t("toBorrow") },
  ];

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* Name */}
      <MainInput
        register={register}
        placeholder={t("اسم المنتج")}
        label="اسم المنتج"
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

      {/* owner */}
      <MainInput
        register={register}
        placeholder={t("اسم المستخدم على التطبيق")}
        label="اسم مالك المنتج"
        type="text"
        name="owner"
        value={formData?.owner}
        error={errors?.owner?.message}
        required
      />

      {/* type */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="type"
        render={({ field: { onChange, onBlur } }) => (
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
              onBlur={onBlur}
              onChange={(e) => onChange(e?.value)}
              placeholder={t("المنتج للبيع / للاستعارة")}
            />
            {errors?.type?.message && (
              <ErrorMessage msg={errors?.type?.message} />
            )}
          </div>
        )}
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
      <MainInput
        register={register}
        placeholder={t("inputs.phone")}
        type="number"
        name="phone_number"
        value={formData?.phone_number}
        error={errors?.phone_number?.message}
        required
      />

      {/* Stock */}
      <MainInput
        register={register}
        placeholder={t("عدد المنتجات المتوفرة")}
        type="number"
        name="stock"
        value={formData?.stock}
        error={errors?.stock?.message}
        required
      />

      {/* Diwaniya image */}
      <UploadImages
        images={formData?.images || []}
        error={errors?.images?.message}
        control={control}
        name="images"
      />

      <MainButton loading={submitting} disabled={submitting} type="submit">
        {edit ? t("edit") : t("add")}
      </MainButton>
    </form>
  );
};

export default LiquidationForm;
