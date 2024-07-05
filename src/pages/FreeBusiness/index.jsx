import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainSlider from '../../components/UI/MainSlider';
import { Error, Loading, MainBox } from '../../components';
import { useApi } from '../../hooks/useApi';
import { PageHeader } from '../../layout';
import styles from './.module.scss';

const FreeBusiness = () => {
  const { t } = useTranslation();

  // get freeBusiness
  const { data, loading, onRequest } = useApi("/api/freelanceJob", "get");

  // get Occasion slider:=
  const {
    data: slider,
    loading: sliderLoading,
    onRequest: onGetSlider,
    error: SliderError,
  } = useApi("/api/viewSlider", "get");

  useEffect(() => {
    onRequest();
    onGetSlider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetSliderImages = (data) => {
    return data?.map((item) => {
      return {
        image: item?.company_image,
        id: item?.id,
      };
    });
  };

  // console.log(slider?.data?.map(item => item?.images));

  return (
    <div className={`${styles.page} container`}>
      <PageHeader title={t("FreeBusiness")} backHref="/" />
      {SliderError ? (
        <Error msg={SliderError?.message} />
      ) : (
        <MainSlider
          loading={sliderLoading}
          images={onGetSliderImages(slider?.data)}
          type="free-business"
        />
      )}

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