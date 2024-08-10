import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../layout";
import { EmptyList, Error } from "../../components";
import styles from "./.module.scss";
import Skeleton from "react-loading-skeleton";
import FileBox from "./_components/FileBox";

const Archives = () => {
  const { slug } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    !state?.data && navigate("/diwaniyas");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data]);

  // get archives
  const {
    data: archives,
    loading: archivesLoading,
    onRequest: onGetArchives,
    error: archivesError,
  } = useApi(
    `/api/viewArchive?current_page=1&per_page=10000&category_id=${slug}`,
    "get"
  );

  useEffect(() => {
    if (slug) onGetArchives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  console.log(archives);

  return (
    <div className={`container`}>
      <PageHeader title={state?.data || "Unknown"} backHref={"/archives"} />
      {archivesError ? (
        <Error msg={archivesError?.message} />
      ) : archivesLoading ? (
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
      ) : !archives?.data?.length ? (
        <EmptyList text="لا يوجد أي ديوانيات في الوقت الراهن، الآن يمكنك إضافة الديوانيات" />
      ) : (
        <div className={styles.list}>
          {archives?.data?.map((archive) => (
            <FileBox
              key={archive?.id}
              description={archive?.description}
              type={archive?.type}
              url={archive?.url}
              created_at={archive?.created_at}
              userImage={archive?.user?.profile_picture}
              userName={
                archive?.user?.name ||
                `${archive?.user?.first_name}`
              }
              file={archive?.file}
              onGetList={onGetArchives}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Archives;
