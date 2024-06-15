import React, { useEffect, useState } from "react";
import styles from './.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../layout';
import { IoMdAdd } from "react-icons/io";
import DiwaniyaBox from './_components/DiwaniyaBox';
import { useApi } from "../../../hooks/useApi";
import Skeleton from "react-loading-skeleton";
import { EmptyList, Error } from "../../../components";
import { FaLongArrowAltDown } from "react-icons/fa";

const SingleDiwaniya = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sorting, setSorting] = useState(null);

  console.log(sorting);

  useEffect(() => {
    !state?.data && navigate("/diwaniyas");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data]);

  // get diwaniyas
  const {
    data: diwaniyas,
    loading: diwaniyasLoading,
    onRequest: onGetDiwaniyas,
    error: diwaniyasError,
  } = useApi(
    `/api/viewDiwan?current_page=1&per_page=10000&category_id=${slug}&sort=${sorting}`,
    "get"
  );

  useEffect(() => {
    if (slug) onGetDiwaniyas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, sorting]);

  const handelSorting = () => {
    if (sorting === null) {
      setSorting("asc");
    } else if(sorting === "asc") {
      setSorting("desc");
    } else {
      setSorting(null);
    }
  }

  return (
    <>
      <div className={`container`}>
        <PageHeader title={state?.data || "Unknown"} />
        <div className={styles.page__header}>
          <Link to={`/diwaniyas/add/${slug}`} className={styles.header__btn}>
            {t("AddNewDiwaniya")} <IoMdAdd />
          </Link>
          <button
            onClick={handelSorting}
            className={`${styles.header__btn} ${
              sorting === null
                ? styles.off
                : sorting === "asc"
                ? styles.increase
                : styles.decrease
            }`}
          >
            <FaLongArrowAltDown />
            {t("sortingByName")}
          </button>
        </div>
        {diwaniyasError ? (
          <Error msg={diwaniyasError?.message} />
        ) : diwaniyasLoading ? (
          <div className={styles.list}>
            {Array(5)
              ?.fill("")
              ?.map((_, i) => (
                <Skeleton
                  key={i}
                  width="100%"
                  height="213px"
                  borderRadius="4px"
                />
              ))}
          </div>
        ) : !diwaniyas?.data?.length ? (
          <EmptyList text="لا يوجد أي ديوانيات في الوقت الراهن، الآن يمكنك إضافة الديوانيات" />
        ) : (
          <div className={styles.list}>
            {diwaniyas?.data?.map((diwaniya) => (
              <DiwaniyaBox
                key={diwaniya?.id}
                diwaniya={diwaniya}
                onGetList={onGetDiwaniyas}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SingleDiwaniya