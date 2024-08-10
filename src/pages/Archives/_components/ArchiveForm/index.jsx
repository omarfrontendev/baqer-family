import React from "react";
import styles from "./.module.scss";
import { FaLink } from "react-icons/fa";
import { FaFileCirclePlus, FaImage } from "react-icons/fa6";
import { MainButton, MainInput, UploadImages } from "../../../../components";
import { useTranslation } from "react-i18next";
import UploadFile from "../../../../components/Forms/UploadFile";

const ArchiveForm = ({
  onSubmit,
  control,
  register,
  formData,
  errors,
  submitting,
  setValue,
  edit,
}) => {
  const { t } = useTranslation();

  const handleTypeChange = (type) => {
    setValue("type", type);
    if (type === 1) {
      setValue("file", null);
      setValue("url", null);
    }
    if (type === 2) {
      setValue("image", null);
      setValue("url", null);
    }
    if (type === 3) {
      setValue("image", null);
      setValue("file", null);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* select your file type */}
      <div className={styles.type__file}>
        <div className={styles.options}>
          <button
            className={`${styles.btn} ${
              formData?.type === 1 ? styles.active : ""
            }`}
            type="button"
            onClick={() => handleTypeChange(1)}
          >
            <FaImage />
            صورة
          </button>
          <button
            className={`${styles.btn} ${
              formData?.type === 2 ? styles.active : ""
            }`}
            type="button"
            onClick={() => handleTypeChange(2)}
          >
            <FaFileCirclePlus />
            ملف
          </button>
          <button
            className={`${styles.btn} ${
              formData?.type === 3 ? styles.active : ""
            }`}
            type="button"
            onClick={() => handleTypeChange(3)}
          >
            <FaLink />
            لينك
          </button>
        </div>
        <div>
          {formData?.type === 1 ? (
            <UploadImages
              images={formData?.image || []}
              error={errors?.image?.message}
              control={control}
              name="image"
              single
            />
          ) : formData?.type === 2 ? (
            <UploadFile
              file={formData?.file}
              error={errors?.file?.message}
              control={control}
              setValue={setValue}
              name="file"
            />
          ) : (
            <MainInput
              register={register}
              placeholder={t("لينك")}
              label="لينك"
              type="text"
              name="url"
              value={formData?.url}
              error={errors?.url?.message}
              required
            />
          )}
        </div>
        {/* overview */}
      </div>
      <MainInput
        register={register}
        placeholder={t("inputs.description")}
        type="textarea"
        name="description"
        value={formData?.description}
        error={errors?.description?.message}
        required
      />
      <MainButton loading={submitting} disabled={submitting} type="submit">
        {t(edit ? "edit" : "add")}
      </MainButton>
    </form>
  );
};

export default ArchiveForm;
