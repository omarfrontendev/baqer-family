import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './.module.scss';
import { PageHeader } from '../../layout';
import { useApi } from '../../hooks/useApi';
import { Loading } from '../../components';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import DetailsBox from './_components/DetailsBox';
import { FacebookIcon, InstagramIcon, TwitterIcon, WhatsappIcon } from '../../icons';
// import dayjs from 'dayjs';

const SingleFreeBusiness = () => {

    const { slug } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();

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
          <img
            className={styles.company__image}
            src={
              data?.data?.company_image ||
              "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"
            }
            alt="company__image"
          />
          <h4 className={styles.title}>
            {data?.data?.company_name || data?.data}
          </h4>
          <p className={styles.points}>النقاط: {data?.data?.satisfied} </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <DetailsBox title={t("department")} value={data?.data?.user_name} />
            <DetailsBox
              title={t("inputs.managerName")}
              value={data?.data?.owner_name}
            />
            <DetailsBox
              title={t("description")}
              value={data?.data?.description}
            />
            <DetailsBox
              title={t("inputs.address")}
              value={data?.data?.company_address}
            />
          </div>
          <div className={styles.contact__section}>
            <a
              href={`tel:${data?.data?.contact_phone}`}
              className={styles.contact__box}
            >
              {data?.data?.contact_phone}
              {/* {t("inputs.phone")} */}
              <span>
                <FaPhone />
              </span>
            </a>
            <a
              href={`mailto:${data?.data?.freelance_email}`}
              className={styles.contact__box}
            >
              {data?.data?.freelance_email}
              {/* {t("inputs.email")} */}
              <span>
                <MdEmail />
              </span>
            </a>
          </div>
          <div className={styles.social__section}>
            <a href={data?.data?.facebook} target="_blank" rel="noreferrer">
              <FacebookIcon />
            </a>
            <a href={data?.data?.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon />
            </a>
            <a href={data?.data?.twitter} target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
            <a
              href={`https://wa.me/${data?.data?.contact_whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappIcon />
            </a>
          </div>
          <div className={styles.footer__btn}>
            <button
              onClick={() => {
                navigate("request", { state: { data: data?.data } });
              }}
              to="request"
              className={styles.btn__orange}
            >
              استفسار
            </button>
            <a
              target="_blank"
              className={styles.btn__blue}
              href={`http://maps.google.com/?q=${data?.data?.lat},${data?.data?.long}`}
              rel="noreferrer"
            >
              الموقع
            </a>
          </div>
        </div>
      ); 
}

export default SingleFreeBusiness