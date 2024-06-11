import React, { useEffect } from 'react';
import { PageHeader } from '../../layout';
import { useTranslation } from 'react-i18next';
import { Error, MainSlider } from '../../components';
import styles from './.module.scss';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import Skeleton from 'react-loading-skeleton';

const Diwaniyas = () => {

  const { t } = useTranslation();

  // get diwaniya slider:=
  const { data: slider, loading: sliderLoading, onRequest: onGetSlider, error: SliderError } = useApi("/api/viewDiwanSlider", "get");

  // get diwaniyas categories
  const {
    data: categories,
    loading: categoriesLoading,
    onRequest: onGetCategories,
    error: categoryError
  } = useApi("/api/viewDiwanCategory?current_page=1&per_page=10000", "get");

  useEffect(() => {
    onGetSlider();
    onGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.page} container`}>
      <PageHeader title={t("Diwaniyas")} />
      {SliderError ? (
        <Error msg={SliderError?.message} />
      ) : (
        <MainSlider
          loading={sliderLoading}
          images={slider?.data?.map((item) => item?.image)}
        />
      )}
      <div className={styles.list}>
        {categoriesLoading ? (
          Array(4)
            .fill("")
            .map((_, i) => (
              <Skeleton width="100%" height="87px" borderRadius="8px" key={i} />
            ))
        ) : categoryError ? (
          <Error msg={categoryError?.message} />
        ) : (
          categories?.data?.map((diwaniya, i) => (
            <Link
              to={`${diwaniya?.id}`}
              className={styles.box}
              key={i}
              style={{
                backgroundColor: diwaniya?.color,
              }}
            >
              {diwaniya?.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Diwaniyas