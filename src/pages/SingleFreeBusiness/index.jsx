import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from './.module.scss';
import { PageHeader } from '../../layout';
import { useApi } from '../../hooks/useApi';
import { Loading } from '../../components';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import DetailsBox from './_components/DetailsBox';
import { FacebookIcon, InstagramIcon, TwitterIcon, WhatsappIcon } from '../../icons';

const SingleFreeBusiness = () => {

    const { slug } = useParams();
    const { t } = useTranslation()

    const { data, loading, onRequest } = useApi(`/api/freelanceJob/${slug}`, "get");

    useEffect(() => {
        if(slug) {
            onRequest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (loading) return (
      <div style={{height: "100vh", display: "flex", alignItems: "center", width: "100%", justifyContent: "center"}}>
        <Loading />
      </div>
    );
      return (
        <div className={`${styles.page} container`}>
          <PageHeader />
          {/* {loading ? <Loading /> : ""} */}
          <img
            className={styles.company__image}
            src={
              data?.data?.company_image ||
              "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"
            }
            alt="company__image"
          />
          <h4 className={styles.title}>
            {data?.data?.company_name || "شركة الخطيب للبرمجيات"}
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <DetailsBox title={t("department")} value="شركة الخطيب للبرمجيات" />
            <DetailsBox
              title={t("description")}
              value="شركة الخطيب تقوم بتصميم وبرمجة المواقع والتطبيقات على هواتف"
            />
            <DetailsBox title={t("yearFounded")} value="2017" />
            <DetailsBox title={t("inputs.address")} value="رميثية ق 3 ج3" />
          </div>
          <div className={styles.contact__section}>
            <a href={`tel:0321132132`} className={styles.contact__box}>
              {t("inputs.phone")}
              <span>
                <FaPhone />
              </span>
            </a>
            <a href={`mailto:asdasdasdasd`} className={styles.contact__box}>
              {t("inputs.email")}
              <span>
                <MdEmail />
              </span>
            </a>
          </div>
          <div className={styles.social__section}>
            <a href="#" target="_blank">
              <FacebookIcon />
            </a>
            <a href="#" target="_blank">
              <InstagramIcon />
            </a>
            <a href="#" target="_blank">
              <TwitterIcon />
            </a>
            <a href="#" target="_blank">
              <WhatsappIcon />
            </a>
          </div>
          <div className={styles.footer__btn}>
            <Link to='/' className={styles.btn__orange}>استفسار</Link>
            <Link to='/' className={styles.btn__blue}>الموقع</Link>
          </div>
        </div>
      ); 
}

export default SingleFreeBusiness