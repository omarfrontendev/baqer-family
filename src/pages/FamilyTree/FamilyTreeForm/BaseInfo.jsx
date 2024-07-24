import React, { useEffect, useState } from "react";
// external
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "react-select";

// internal
import { ErrorMessage, MainInput } from "../../../components";
import Radio from "../../Register/_components/Radio";
import UploadImage from "../../Register/_components/UploadImage";

// style
import styles from "../.module.scss";
import { useApi } from "../../../hooks/useApi";

const BaseInfo = ({ register, control, errors, formData, gender }) => {
  const { t } = useTranslation();

  // get all parents:=
  const {
    data: parents,
    loading: parentsLoading,
    onRequest: onGetParents,
  } = useApi("/api/viewTreeNodes", "get");

  useEffect(() => {
    onGetParents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          />
        )}
      />

      {/* user name */}
      <div className={styles.user__name__inputs}>
        <MainInput
          register={register}
          placeholder={t("name")}
          type="text"
          name="name"
          value={formData?.name}
          error={errors?.name?.message}
          required
        />
      </div>

      {/* user gender */}
      <Radio
        register={register}
        error={errors?.type?.message}
        name={"type"}
        label={t("gender")}
        label_1={t("male")}
        val_1="1"
        id_1={`gender__male`}
        id_2={`gender__female`}
        label_2={t("female")}
        val_2="2"
      />

      <Radio
        register={register}
        error={errors?.marry_type?.message}
        name={"marry_type"}
        id_1={`marry_type__male`}
        id_2={`marry_type__female`}
        label={t("maritalStatus")}
        label_1={gender === "male" ? "متزوج" : "متزوجة"}
        val_1={formData.type === "1" ? "1" : "2"}
        label_2={"أعزب"}
        val_2="0"
      />

      <Radio
        register={register}
        error={errors?.is_divorced?.message}
        name={"is_divorced"}
        label={t("تم الانفصال ")}
        label_1={t("yes")}
        val_1="1"
        label_2={t("no")}
        val_2="2"
        id_1={"is_divorced__1"}
        id_2={"is_divorced__2"}
      />

      <Radio
        register={register}
        error={errors?.is_relict?.message}
        name={"is_relict"}
        label={t(formData?.type === "1" ? "ارمل" : "ارملة")}
        label_1={t("yes")}
        val_1={"1"}
        label_2={t("no")}
        val_2="2"
        id_1="is_relict_1"
        id_2="is_relict_2"
      />

      <Radio
        register={register}
        error={errors?.is_alive?.message}
        name={"is_alive"}
        label={t("على قيد الحياة")}
        label_1={t("yes")}
        val_1="1"
        label_2={t("no")}
        val_2="2"
        id_1={`is_alive__male`}
        id_2={`is_alive__female`}
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="follower_to"
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
              options={parents?.data?.map((father) => {
                return {
                  label: father?.name,
                  value: father?.id,
                };
              })}
              isLoading={parentsLoading}
              onBlur={onBlur}
              onChange={(e) => onChange(e?.value)}
              placeholder={t("chooseParent")}
            />
            {errors?.type?.message && (
              <ErrorMessage msg={errors?.type?.message} />
            )}
          </div>
        )}
      />
    </>
  );
};

export default BaseInfo;
