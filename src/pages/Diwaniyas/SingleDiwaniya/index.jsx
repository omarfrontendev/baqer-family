import React, { useContext, useEffect } from "react";
import styles from './.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../layout';
import { IoMdAdd } from "react-icons/io";
import { ArrowIcon } from '../../../icons';
import DiwaniyaBox from './_components/DiwaniyaBox';
import { useApi } from "../../../hooks/useApi";
import Skeleton from "react-loading-skeleton";
import Popup from "../../../components/UI/Popup";
import { ModalContext } from "../../../context/ModalContext";

const SingleDiwaniya = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  // get diwaniyas
  const {
    data: diwaniyas,
    loading: diwaniyasLoading,
    onRequest: onGetDiwaniyas,
  } = useApi(
    `/api/viewDiwan?current_page=1&per_page=10000`,
    "get"
  );

  useEffect(() => {
    if (slug) onGetDiwaniyas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className={`container`}>
      <PageHeader title={"ديوانية رسمية"} />
      <div className={styles.page__header}>
        <Link to={`/diwaniyas/add/${slug}`} className={styles.header__btn}>
          {t("AddNewDiwaniya")} <IoMdAdd />
        </Link>
        <button className={styles.header__btn}>
          <ArrowIcon />
          {t("sortingByName")}
        </button>
      </div>
      <div className={styles.list}>
        {diwaniyasLoading
          ? Array(4)
              ?.fill("")
              ?.map((_, i) => (
                <Skeleton
                  key={i}
                  width="100%"
                  height="213px"
                  borderRadius="4px"
                />
              ))
          : diwaniyas?.data?.map((diwaniya) => (
              <DiwaniyaBox key={diwaniya?.id} diwaniya={diwaniya} />
            ))}
      </div>
    </div>
  );
}

export default SingleDiwaniya