import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { PageHeader } from "../../layout";
import styles from "./.module.scss";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/ar"; // Import Arabic locale
import Skeleton from "react-loading-skeleton";
import InquiriesBox from "./_components/InquiriesBox";

const Inquiries = () => {
  const { t } = useTranslation();
  const { onRequest, data, loading } = useApi(
    "/api/user_freelance_requests",
    "get"
  );

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={t("Inquiries")} />
      <div className={`${styles.page} container`}>
        <div className={styles.list}>
          {loading
            ? Array(8)
                .fill("")
                .map((_, i) => <Skeleton width="100%" height="264px" key={i} />)
            : data?.data?.map((inquire) => (
                <InquiriesBox
                  // type={notification?.type}
                  key={inquire?.id}
                  content={inquire?.content}
                  name={
                    inquire?.user?.name ||
                    `${inquire?.user?.first_name} ${inquire?.user?.second_name}`
                  }
                  phoneNumber={inquire?.user_phone}
                  newPhoneNumber={inquire?.user_new_phone}
                  date={dayjs(inquire?.created_at)
                    .locale("ar")
                    .format("DD  MMMM  YYYY")}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Inquiries;
