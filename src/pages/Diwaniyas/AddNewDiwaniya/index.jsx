import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DiwaniyaForm from '../DiwaniyaForm';
import { PageHeader } from '../../../layout';
import { useApi } from '../../../hooks/useApi';
import { useNavigate, useParams } from 'react-router-dom';
import uploadFile from '../../../utils/uploadImages';
import { toast } from 'react-toastify';

const AddNewDiwaniya = () => {

  const { t } = useTranslation();
  const { slug } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
    description: yup.string("").required(t("errors.required")),
    date: yup.string().required(t("errors.required")),
    address: yup.string().required(t("errors.required")),
    location: yup
    .object({
      lat: yup.string().required(t("errors.required")),
      lng: yup.string().required(t("errors.required")),
      })
      .required(t("errors.required")),
    diwanWorkDays: yup.array().min(1, "at least 1 item").required("days is Required!"),
    images: yup
      .array()
      .min(1, "at least 1 item")
      .required("image is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // send diwaniya base-info
  const { onRequest: onSendBaseInfo } = useApi("/api/addDiwan", "post");
  const { onRequest: onAddDiwanWorkDays } = useApi(
    "/api/addDiwanWorkDays",
    "post"
  );


  const onSubmit = async e => {
    setSubmitting(true);

    // Base-info
    const body = {
      name: e?.name,
      address: e?.address,
      description: e?.description,
      category_id: slug,
      lat: e?.location?.lat,
      long: e?.location?.lng,
    };

    try {
      const res = await onSendBaseInfo(body, "IGNOREMESSAGEEVER");
      if(res?.success) {
        await onAddDiwanWorkDays(
          {
            date: e?.diwanWorkDays,
            diwan_id: res?.data?.id,
          },
          "IGNOREMESSAGE"
        );
        await uploadFile({
          images: e?.images,
          category_type: "diwan",
          category_id: res?.data?.id,
        });
        toast.success("تمت العملية بنجاح");
        navigate(`/diwaniyas/${slug}`);
      }
        // res?.success
    }catch(err) {
      console.log(err);
      setSubmitting(false);
    }
    setSubmitting(false);
  }

  return (
    <>
      <PageHeader title={t("addNewDiwaniya")} />
      <div className="container">
        <DiwaniyaForm
          onSubmit={handleSubmit((e) => onSubmit(e))}
          control={control}
          register={register}
          formData={watch()}
          errors={errors}
          submitting={submitting}
        />
      </div>
    </>
  );
}

export default AddNewDiwaniya