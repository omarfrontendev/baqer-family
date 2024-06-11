import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../hooks/useApi';
import { PageHeader } from '../../../layout';
import styles from './.module.scss';
import { EmptyList, Error, MainSlider } from '../../../components';
import Box from '../_components/Box';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';

const Congratulations = () => {
  const { t } = useTranslation();

  // get Congratulations slider:=
  const {
    data: slider,
    loading: sliderLoading,
    onRequest: onGetSlider,
    error: SliderError,
  } = useApi("api/viewCongratulateSlider?current_page=1&per_page=10000", "get");

  // get Congratulations
  const {
    data: congratulations,
    loading: congratulationsLoading,
    onRequest: onGetCongratulations,
  } = useApi(`/api/viewCongratulate?current_page=1&per_page=10000`, "get");

  useEffect(() => {
    onGetSlider();
    onGetCongratulations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.page} container`}>
      <PageHeader title={t("التهاني")} />
      <Link to={`/congratulations/add`} className={styles.add__btn}>
        {t("AddNewCongratulation")} <IoMdAdd />
      </Link>
      {SliderError ? (
        <Error msg={SliderError?.message} />
      ) : (
        <MainSlider
          loading={sliderLoading}
          images={slider?.data?.map((item) => item?.image) || []}
        />
      )}

      {/* List */}
      {congratulationsLoading ? (
        <div className={styles.list}>
          {Array(4)
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
      ) : congratulations?.data?.length ? (
        <div className={styles.list}>
          {congratulations?.data?.map((diwaniya) => (
            <Box
              key={diwaniya?.id}
              diwaniya={diwaniya}
              onGetList={onGetCongratulations}
            />
          ))}
        </div>
      ) : (
        <EmptyList text="لا يوجد أي تهنئة، الآن يمكنك إضافة تهنئتك" />
      )}
    </div>
  );
}

export default Congratulations