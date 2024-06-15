import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import slideImage from '../../assets/business@2x.png';
import MainSlider from '../../components/UI/MainSlider';
import { Loading, MainBox } from '../../components';
import { useApi } from '../../hooks/useApi';
import { PageHeader } from '../../layout';
import styles from './.module.scss';

const FreeBusiness = () => {

  const { t } = useTranslation();

  // get freeBusiness
  const { data, loading, onRequest } = useApi(
    "/api/freelanceJob",
    "get"
  );

  useEffect(() => {
      onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={`${styles.page} container`}>
      <PageHeader title={t("FreeBusiness")} />
      <MainSlider images={[slideImage]} />
      {loading ? (
        <Loading />
      ) : (
        <div className={`${styles.list} list`}>
          {data?.data?.map((company, i) => (
            <MainBox
              key={i}
              title={company?.company_name}
              image={
                company?.company_image ||
                "https://www.gam.com.br/wp-content/uploads/2017/10/default-logo.png"
              }
              href={`/free-business/${company.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FreeBusiness