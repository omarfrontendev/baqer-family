import React, { useContext, useEffect, useState } from "react";
import {
  ErrorMessage,
  MainButton,
  MainInput,
  Popup,
} from "../../../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import styles from "./.module.scss";
import Select from "react-select";
import Radio from "../../../../Register/_components/Radio";
import { useApi } from "../../../../../hooks/useApi";
import { toast } from "react-toastify";
import { ModalContext } from "../../../../../context/ModalContext";

const UpdateForm = ({ branch, onGetTree }) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const { setIdModal } = useContext(ModalContext);

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

  const schema = yup
    .object({
      name: yup.string("").required(t("errors.required")),
      type: yup.string("").required(t("errors.required")),
      follower_to: yup.string("").required(t("errors.required")),
      is_alive: yup.string("").required(t("errors.required")),
      is_divorced: yup.string("").required(t("errors.required")),
      marry_type: yup.string("").required(t("errors.required")),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: branch,
    resolver: yupResolver(schema),
    mode: "all",
  });

  // update branch:=
  const { onRequest: onUpdateData } = useApi("/api/editTreeBranch", "post");

  const onSubmit = async (e) => {
    setSubmitting(true);

    const body = {
      branch_id: branch?.id,
      name: e?.name,
      type: +e?.type,
      marry_type: +e?.marry_type,
      follower_to: +e?.follower_to,
      is_alive: +e?.is_alive,
      is_divorced: +e?.is_divorced,
      is_relict: +e?.is_relict,
      marry: e?.marry || null,
    };

    // Base-info

    try {
      const res = await onUpdateData(body, "IGNOREMESSAGEEVER");
      if (res?.success) {
        // await uploadFile({
        //   images: e?.images,
        //   category_type: "diwan",
        //   category_id: res?.data?.id,
        // });
        toast.success("تمت العملية بنجاح");
        onGetTree();
        setIdModal("");
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <Popup>
      <form
        onSubmit={handleSubmit((e) => onSubmit(e))}
        className={styles.form__content}
      >
        {/* user name */}
        <div className={styles.user__name__inputs}>
          <MainInput
            register={register}
            placeholder={t("name")}
            type="text"
            name="name"
            value={watch()?.name}
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
          //   label_1={gender === "male" ? "متزوج" : "متزوجة"}
          label_1={"متزوج"}
          val_1={watch().type === "1" ? "1" : "2"}
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
          label={t(watch()?.type === "1" ? "ارمل" : "ارملة")}
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

        {!parentsLoading && (
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
                      borderColor: errors?.type?.message
                        ? "#E92121"
                        : "#DEDEDE",
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
                  defaultValue={() => {
                    const defaultChoose = parents?.data?.find(
                      (item) => +item?.id === +branch?.follower_to
                    );
                    if (!defaultChoose) return null;
                    return {
                      label: defaultChoose?.name,
                      value: defaultChoose?.id,
                    };
                  }}
                />
                {errors?.type?.message && (
                  <ErrorMessage msg={errors?.type?.message} />
                )}
              </div>
            )}
          />
        )}
        <MainButton
          type="submit"
          disabled={submitting}
          loading={submitting}
          style={{ margin: "24px auto 0" }}
        >
          حفظ التعديلات
        </MainButton>
      </form>
    </Popup>
  );
};

export default UpdateForm;
