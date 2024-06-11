import React, { useEffect } from 'react'
import { useApi } from '../../../hooks/useApi';
import { EmptyList, Error, MainSlider } from '../../../components';
import { PageHeader } from '../../../layout';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import styles from './.module.scss';
import Skeleton from 'react-loading-skeleton';
import Box from '../_components/Box';

const News = () => {
  const { t } = useTranslation();

  // get news slider:=
  const {
    data: slider,
    loading: sliderLoading,
    onRequest: onGetSlider,
    error: SliderError,
  } = useApi("/api/viewNewsSlider?current_page=1&per_page=10000", "get");

  // get news
  const {
    data: news,
    error: newsError,
    loading: newsLoading,
    onRequest: onGetNews,
  } = useApi(`/api/viewNews?current_page=1&per_page=10000`, "get");

  useEffect(() => {
    onGetSlider();
    onGetNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.page} container`}>
      <PageHeader title={t("news")} />
      <Link to={`/news/add`} className={styles.add__btn}>
        {t("AddNewNews")} <IoMdAdd />
      </Link>
      {SliderError ? (
        <Error msg={SliderError?.message} />
      ) : (
        <MainSlider
          loading={sliderLoading}
          images={slider?.data?.map((item) => item?.image) || []}
        />
      )}
      {newsLoading ? (
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
      ) : newsError ? (
        <Error msg={newsLoading?.message} />
      ) : news?.data?.length ? (
        <div className={styles.list}>
          {news?.data?.map((singleNew) => (
            <Box key={singleNew?.id} diwaniya={singleNew} onGetList={onGetNews} />
          ))}
        </div>
      ) : (
        <EmptyList text="لا يوجد أي أخبار في الوقت الراهن، الآن يمكنك إضافة الأخبار" />
      )}
    </div>
  );
}

export default News