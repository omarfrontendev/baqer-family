import React, { useState } from 'react';
import { useApi } from '../../../hooks/useApi';

// external
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";

// internal component
import { MainButton } from '../../../components';
import BaseInfo from './BaseInfo';
import FreelanceInfo from './FreelanceInfo';
import WorkPlaceInfo from './WorkPlaceInfo';

// styles 
import styles from '../.module.scss';



const RegisterForm = () => {

  const { t } = useTranslation();

  const getPlatformRegex = (platform) => {
    const regexes = {
      instagram: /^(?:http(?:s)?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/,
      twitter: /^(?:http(?:s)?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
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
      password: yup
        .string()
        .required(t("errors.required"))
        .min(8, t("errors.min__length__8")),
      confirmPassword: yup
        .string()
        .required(t("errors.required"))
        .oneOf([yup.ref("password")], "must matched with password"),
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
              showDetails: yup.boolean(""),
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
              managerName: yup.string(),
              phone: yup
                .string()
                .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
                .required(t("errors.required")),
              whatsapp: yup
                .string()
                .matches(/^$|^\d+$/, t("errors.mustBePositiveInteger"))
                .required(t("errors.required")),
              instagram: createUrlValidation("instagram"),
              twitter: createUrlValidation("twitter"),
              facebook: createUrlValidation("facebook"),
              address: yup.string().required(t("errors.required")),
              showDetailsCompany: yup.boolean(""),
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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      workPlace: "yes",
      freelance: "yes",
      gender: "male",
      company: {
        showDetailsCompany: true
      },
      work: {
        workType: "main",
      },
    },
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  const isFreelance = watch("freelance");
  const isWork = watch("workPlace") === "yes";

  // register
  const { data, loading, error, onRequest } = useApi(
    "/api/register?",
    "post"
  );


  const onSubmit = async (data) => {
    // const res = await onRequest({
    //   first_name: "first_name",
    //   second_name: "second_name",
    //   third_name: "third_name",
    //   fourth_name: "fourth_name",
    //   gender: "male", // required
    //   phone_number: "1234567890", // required
    //   email: "test@test.test11", // required | unique
    //   civil_number: "123111", // required | unique
    //   residential_address: "1234 Main St",
    //   date_of_birth: "1990-01-01", // required | unique
    //   password: "123456789", // required | unique
    //   confirm_password: "123456789", // required | unique
    //   workplace_name: "Company Inc.",
    //   workplace_type: "electrical",
    //   workplace_service_type: "serviceType",
    //   workplace_description: "A great place to work",
    //   freelance_company_name: "Freelance Inc.",
    //   freelance_description: "Freelance services",
    //   freelance_employer_name: "Self",
    //   freelance_contact_number: "0987654321",
    //   social_media_links:
    //     '{"twitter":"@johndoe","facebook":"facebook.com/johndoe"}',
    //   company_address: "5678 Secondary St",
    //   show_workspace_name: "true", //
    //   freelance_contact_type: "رقم هاتف", // إمكانية تحديد اتصال هاتف او واتس اب او كلاهم
    //   whats_app_number: "1235355998",
    //   show_data: true, // ظهار البيانات الشخصية لصاحب العمل
    //   role: "user",
    // });

  };

  const [openMap, setOpenMap] = useState(false);

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
        <MainButton disabled={!isValid} type={"submit"}>
          {t("new__account")}
        </MainButton>
      </div>
    </form>
  );
}

export default RegisterForm