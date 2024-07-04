import React, { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi';

// external
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import Cookies from 'js-cookie';

// internal component
import { MainButton } from '../../../components';
import BaseInfo from './BaseInfo';
import FreelanceInfo from './FreelanceInfo';
import WorkPlaceInfo from './WorkPlaceInfo';

// styles 
import styles from '../.module.scss';
import dayjs from 'dayjs';

const RegisterForm = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const userData = JSON.parse(Cookies.get("user"));

  const getPlatformRegex = (platform) => {
    const regexes = {
      instagram: /^(?:http(?:s)?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/,
      twitter: /^(?:http(?:s)?:\/\/)?(?:www\.)?x\.com\/([a-zA-Z0-9_]+)/,
      facebook: /^(?:http(?:s)?:\/\/)?(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/,
    };

    return regexes[platform];
  };

  const createUrlValidation = (platform) => {
    return yup
      .string()
      .test(
        "is-url-valid",
        `${t(`errors.Invalid${platform}URLformat`)}`,
        function (value) {
          if (!value) {
            return true; // Allow empty values, use required() if mandatory
          }

          const regex = getPlatformRegex(platform);
          return regex.test(value);
        }
      );
  };


  const registerSchema = yup
    .object({
      photo: yup.mixed("").required(t("errors.required")),
      firstName: yup.string("").required(t("errors.required")),
      secondName: yup.string("").required(t("errors.required")),
      thirdName: yup.string("").required(t("errors.required")),
      fourthName: yup.string("").required(t("errors.required")),
      gender: yup.string("").required(t("errors.required")),
      civilNo: yup
        .number()
        .typeError(t("errors.must__number"))
        .integer(t("errors.mustBeInteger"))
        .positive(t("errors.mustPositive"))
        .required(t("errors.required")),
      phone: yup
        .number()
        .typeError(t("errors.must__number"))
        .integer(t("errors.mustBeInteger"))
        .positive(t("errors.mustPositive"))
        .required(t("errors.required")),
      address: yup.string().required(t("errors.required")),
      email: yup
        .string()
        .email(t("errors.email"))
        .required(t("errors.required")),
      birthDate: yup.string().required(t("errors.required")),
      workPlace: yup.string("").required(t("errors.required")),
      work: yup.object({}).when(["workPlace"], {
        is: "yes",
        then: () =>
          yup
            .object({
              workType: yup.string("").required(t("errors.required")),
              workPlaceName: yup.string("").required(t("errors.required")),
              serviceType: yup.string("").required(t("errors.required")),
              description: yup.string("").required(t("errors.required")),
            })
            .required(t("errors.required")),
      }),
      freelance: yup.string().required(t("errors.required")),
      company: yup.object().when(["freelance"], {
        is: "yes",
        then: () =>
          yup
            .object({
              company__image: yup.mixed("").required(t("errors.required")),
              companyName: yup.string().required(t("errors.required")),
              description: yup.string().required(t("errors.required")),
              managerName: yup.string().required(t("errors.required")),
              phone: yup
                .string()
                .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
                .required(t("errors.required")),
              email: yup
                .string()
                .email(t("errors.email"))
                .required(t("errors.required")),
              whatsapp: yup
                .string()
                .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
                .required(t("errors.required")),
              instagram: createUrlValidation("instagram"),
              twitter: createUrlValidation("twitter"),
              facebook: createUrlValidation("facebook"),
              address: yup.string().required(t("errors.required")),
              // showDetailsCompany: yup.boolean(""),
              location: yup
                .object({
                  lat: yup.string().required(t("errors.required")),
                  lng: yup.string().required(t("errors.required")),
                })
                .required(t("errors.required")),
            })
            .required(t("errors.required")),
        otherwise: () => yup.object().nullable(),
      }),
    })
    .required();


  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      photo: userData?.profile_picture,
      firstName: userData?.first_name,
      secondName: userData?.second_name,
      thirdName: userData?.third_name,
      fourthName: userData?.fourth_name,
      gender: userData?.gender,
      civilNo: userData?.civil_number,
      phone: userData?.phone_number,
      address: userData?.residential_address,
      email: userData?.email,
      birthDate: userData?.date_of_birth,
      workPlace: userData?.workplace_name ? "yes" : "no",
      work: {
        workPlaceName: userData?.workplace_name,
        serviceType: userData?.workplace_service_type,
        description: userData?.workplace_description,
      },
      freelance: userData?.freelance_company_name ? "yes" : "no",
      company: {
        company__image: userData?.company_picture,
        companyName: userData?.freelance_company_name,
        description: userData?.freelance_description,
        managerName: userData?.freelance_employer_name,
        email: userData?.freelance_email,
        phone: userData?.freelance_contact_number,
        whatsapp: userData?.whats_app_number,
        instagram: userData?.instagram,
        twitter: userData?.twitter,
        facebook: userData?.facebook,
        location: {
          lat: userData?.lat,
          lng: userData?.long,
        },
        address: userData?.company_address,
      },
    },
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  const isFreelance = watch("freelance");
  const isWork = watch("workPlace") === "yes";

  // register
  const { onRequest: onRegister } = useApi("/api/updateProfile", "post");
  
  useEffect(() => {
    if (!isWork) setValue("work", {});
  }, [isWork, setValue]);

  useEffect(() => {
    if (isFreelance === "no") setValue("company", {});
  }, [isFreelance, setValue]);

  const onSubmit = async (data) => {
    // console.log(data)
    // console.log(data?.company?.companyName);
    // return;
    setSubmitting(true);
    const body = {
      first_name: data?.firstName,
      second_name: data?.secondName,
      third_name: data?.secondName,
      fourth_name: data?.fourthName,
      gender: data?.gender,
      phone_number: data?.phone.toString(),
      email: data?.email,
      civil_number: data?.civilNo.toString(),
      residential_address: data?.address,
      date_of_birth: dayjs(data?.birthDate).format("YYYY-MM-DD"),
      password: "",
      confirm_password: "",
      workplace_name: data?.work?.workPlaceName,
      workplace_type: data?.work?.workType,
      workplace_service_type: data?.work?.serviceType,
      workplace_description: data?.work?.description,
      freelance_company_name: data?.company?.companyName,
      freelance_description: data?.company?.description,
      freelance_employer_name: data?.company?.managerName,
      freelance_contact_number: data?.company?.phone,
      free_lance_email: data?.company?.email,
      company_address: data?.company?.address,
      whats_app_number: data?.company?.whatsapp,
      instagram: data?.company?.instagram,
      twitter: data?.company?.twitter,
      facebook: data?.company?.facebook,
      lat: data?.company?.location?.lat,
      long: data?.company?.location?.lng,
      role: "user",
      user_id: userData?.id
    };

    try {
      if(typeof(data?.photo) !== "string") {
        const formdata = new FormData();
        formdata.append("image", data?.photo);
        formdata.append("type", "profile");
        formdata.append("user_id", userData?.id);
        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        await fetch(
          `https://fasterlink.me/api/upload-image?user_id=${userData?.id}`,
          requestOptions
        );
        if (data?.company?.company__image && typeof data?.company?.company__image !== "string") {
          const formdata2 = new FormData();
          formdata2.append("image", data?.company?.company__image);
          formdata2.append("type", "company");
          formdata2.append("user_id", userData?.id);
          const requestOptions2 = {
            method: "POST",
            body: formdata2,
            redirect: "follow",
          };
          await fetch(
            `https://fasterlink.me/api/upload-image?user_id=${userData?.id}`,
            requestOptions2
          );
        }
      }
      const res = await onRegister(body, t("registerSuccessfully"));
      setSubmitting(false);
      res?.success && Cookies.set("user", JSON.stringify(res?.data));
      res?.success && navigate("/profile");
    } catch (err) {
      console.log(err)
      setSubmitting(false);
    }
    setSubmitting(false);
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.register__form}>
      {/* base info */}
      <h3 className={styles.section__title}>{t("baseInfo")}</h3>
      <BaseInfo
        register={register}
        control={control}
        errors={errors}
        watch={watch}
      />

      {/* work place info */}
      <h3 className={styles.section__title}>{t("workPlaceInfo")}</h3>
      <WorkPlaceInfo
        register={register}
        isWork={isWork}
        errors={errors}
        watch={watch}
      />

      {/* freelance */}
      <h3 className={styles.section__title}>{t("freelanceInfo")}</h3>
      <FreelanceInfo
        register={register}
        isFreelance={isFreelance}
        control={control}
        errors={errors}
        watch={watch}
      />

      {/* submit button */}
      <div className={styles.submit__btn}>
        <MainButton type={"submit"} loading={submitting} disabled={submitting}>
          حفظ البيانات
        </MainButton>
      </div>
    </form>
  );
}

export default RegisterForm