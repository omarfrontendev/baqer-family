import React, { useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { DatePicker, ErrorMessage, MainButton, MainGoogleMap, MainInput, UploadImages } from '../../components';
import { useTranslation } from 'react-i18next';
import Select from "react-select";
import { FaTrashAlt } from "react-icons/fa";
import styles from './AddNewDiwaniya/.module.scss';

const DiwaniyaForm = ({
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
  const [diwaniyaTime, setDiwaniyaTime] = useState({
    hour: 0,
  });
  const [hourError, setHourError] = useState(null);
  const [minuteError, setMinuteError] = useState(null);

  const options = [
    {
      value: "Sat",
      label: t("Sat"),
    },
    {
      value: "Sun",
      label: t("Sun"),
    },
    {
      value: "Mon",
      label: t("Mon"),
    },
    {
      value: "Tue",
      label: t("Tue"),
    },
    {
      value: "Wed",
      label: t("Wed"),
    },
    {
      value: "Thu",
      label: t("Thu"),
    },
    {
      value: "Fri",
      label: t("Fri"),
    },
  ];

  const validateHour = (value) => {
    if (Number.isNaN(value) || value < 0 || value > 23) {
      setHourError("Hours must be between 0 and 23");
    } else {
      setHourError("");
    }
  };

  const validateMinute = (value) => {
    if (Number.isNaN(value) || value < 0 || value > 59) {
      setMinuteError("Minutes must be between 0 and 59");
    } else {
      setMinuteError("");
    }
  };

  const handleChangeHour = (event) => {
    const value = event.target.value;
    const number = Number(value);

    const formattedNumber = String(number).padStart(2, "0");

    setDiwaniyaTime({
      ...diwaniyaTime,
      hour: formattedNumber,
    });
    validateHour(value);
  };

  const handleChangeMinute = (event) => {
    const value = event.target.value;
    const number = Number(value);

    const formattedNumber = String(number).padStart(2, "0");

    setDiwaniyaTime({
      ...diwaniyaTime,
      minute: formattedNumber,
    });
    validateMinute(value);
  };

  // handle add days & time
  const { append, remove } = useFieldArray({
    name: "diwanWorkDays",
    control,
  });

  const onHandleDaysAndTimes = (type, time) => {
    if (type === "ADD") {
      append({
        day: time?.day,
        time: `${time?.hour}:${time?.minute}`,
      });
    } else if (type === "DELETE") {
      remove(time);
    }
    setDiwaniyaTime(null);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* Name */}
      <div className={styles.dividing}>
        <span className={styles.text}>المعلومات الأساسية</span>
      </div>
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
        defaultDate
      />

      <div className={styles.days__container}>
        <h5 className={styles.days__title}>أضف يوم و وقت الديوان</h5>
        <div style={{ position: "relative" }}>
          <Select
            value={
              options?.find((item) => item?.value === diwaniyaTime?.day) || null
            }
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
            onChange={(e) => {
              console.log(e);
              setDiwaniyaTime({
                ...diwaniyaTime,
                day: e?.value,
              });
            }}
            placeholder={t("اختر اليوم")}
          />
        </div>
        <div className={styles.days__inputs}>
          <div
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <MainInput
              placeholder={"الساعة"}
              type="number"
              name="diwaniya-hours"
              label={"الساعة"}
              value={diwaniyaTime?.hour}
              normal
              onChange={handleChangeHour}
            />
            {hourError && <ErrorMessage msg={hourError} />}
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <MainInput
              placeholder={"الدقيقة"}
              type="number"
              name="diwaniya-hours"
              label={"الدقيقة"}
              value={diwaniyaTime?.minute}
              normal
              onChange={handleChangeMinute}
            />
            {minuteError && <ErrorMessage msg={minuteError} />}
          </div>
        </div>
        <MainButton
          onClick={() => onHandleDaysAndTimes("ADD", diwaniyaTime)}
          disabled={
            hourError ||
            minuteError ||
            !diwaniyaTime?.day ||
            !diwaniyaTime?.hour ||
            !diwaniyaTime?.minute
          }
          style={{ width: "fit-content", marginRight: "auto" }}
          type="button"
        >
          أضف
        </MainButton>
        <div className={styles.diwanWorkDaysList}>
          {formData?.diwanWorkDays
            ? formData?.diwanWorkDays?.map((item, i) => (
                <div className={styles.diwanWorkDay} key={i}>
                  <div>
                    <div>يوم الديوان: {t(`${item?.day}`)}</div>
                    <div>وقت الديوان: {item?.time}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onHandleDaysAndTimes("DELETE", i)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            : ""}
        </div>
        {errors?.diwanWorkDays?.message && (
          <ErrorMessage msg={"عليك أن تضيف اليوم والوقت للديوانية"} />
        )}
      </div>

      <div className={styles.dividing}>
        <span className={styles.text}>موقع الديوان</span>
      </div>

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

      {/* Diwaniya image */}
      <UploadImages
        images={formData?.images || []}
        error={errors?.images?.message}
        control={control}
        name="images"
      />

      <MainButton loading={submitting} disabled={submitting} type="submit">
        {t(edit ? "edit" : "add")}
      </MainButton>
    </form>
  );
};

export default DiwaniyaForm