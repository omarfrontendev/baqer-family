import React, { useContext, useEffect } from "react";
import styles from './.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../layout';
import { IoMdAdd } from "react-icons/io";
import { ArrowIcon } from '../../../icons';
import DiwaniyaBox from './_components/DiwaniyaBox';
import { useApi } from "../../../hooks/useApi";
import Skeleton from "react-loading-skeleton";
import { EmptyList, Error } from "../../../components";

const SingleDiwaniya = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();

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
  } = useApi(`/api/viewDiwan?current_page=1&per_page=10000&category_id=${slug}`, "get");

  useEffect(() => {
    if (slug) onGetDiwaniyas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <>
      <div className={`container`}>
        <PageHeader title={state?.data || "Unknown"} />
        <div className={styles.page__header}>
          <Link to={`/diwaniyas/add/${slug}`} className={styles.header__btn}>
            {t("AddNewDiwaniya")} <IoMdAdd />
          </Link>
          <button className={styles.header__btn}>
            <ArrowIcon />
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