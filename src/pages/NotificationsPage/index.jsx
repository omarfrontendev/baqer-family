import React, { useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { PageHeader } from '../../layout';
import styles from './.module.scss';
import { useTranslation } from 'react-i18next';
import NotificationBox from './_components/NotificationBox';
import dayjs from "dayjs";
import 'dayjs/locale/ar'; // Import Arabic locale
import Skeleton from 'react-loading-skeleton';

const Notifications = () => {

  const { t } = useTranslation();
  const { onRequest, data, loading } = useApi("/api/notifications", "get");


  useEffect(() => {
      onRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  return (
    <div className={`${styles.page} container`}>
      <PageHeader title={t("Notifications")} />
      <div className={styles.list}>
        {loading ? (
          Array(8).fill("").map((_,i) => (
            <Skeleton width="100%" height="114px" key={i} />
          ))
        ) : (
          data?.data?.map((notification) => (
            <NotificationBox
              type={notification?.type}
              key={notification?.id}
              title={notification?.title}
              content={notification?.content}
              date={dayjs(notification?.created_at)
                .locale("ar")
                .format("DD  MMMM  YYYY")}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications