import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import styles from './.module.scss';
import ErrorMessage from '../../UI/ErrorMessage';
import { Calendar } from 'react-date-range';
import dayjs from 'dayjs';
import { ar } from 'date-fns/locale';
import { useLocation } from 'react-router-dom';

const DatePicker = ({
  control,
  name = "date",
  error,
  date,
  type = "الديوان",
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const { pathname } = useLocation();

  const addPage = pathname.includes('add');

  // CLOSE DATE PICKER
  useEffect(() => {
    const closeDropMenu = (e) => {
      if (e?.target?.id !== "date-calendar") {
        setShowCalendar(false);
      } else {
        setShowCalendar((prev) => !prev);
      }
    };
    document.body.addEventListener("click", closeDropMenu);
    return () => {
      document.body.removeEventListener("click", closeDropMenu);
    };
  }, []);

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      name={name}
      render={({ field: { onChange, onBlur } }) => (
        <div className={styles.calendar__container}>
          <button
            id="date-calendar"
            onBlur={onBlur}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowCalendar((prev) => !prev);
            }}
            className={`${styles.date__box} ${error ? styles.invalid : ""} ${
              date ? "" : styles.placeholder
            }
                  `}
          >
            <span
              className={`${styles.date__input__label} 
                  ${date ? styles.focus : ""}
                  `}
            >
              تاريخ {type}*
            </span>
            {date ? dayjs(date).format("DD/MM/YYYY") : `تاريخ ${type}*`}
            <ErrorMessage msg={error} />
          </button>

          {showCalendar && (
            <div
              id="date-calendar"
              onClick={(e) => e.stopPropagation()}
              className={`${styles.picker__container} picker__container`}
            >
              <Calendar
                onBlur={onBlur}
                date={date || new Date() || new Date(1995, 0, 1)}
                onChange={(e) => onChange(e)}
                locale={ar}
                color="#26C0FF" // Custom color
                disabledDay={(date) =>
                  addPage && date < new Date().setDate(new Date().getDate() - 1)
                }
              />
            </div>
          )}
        </div>
      )}
    />
  );
};

export default DatePicker