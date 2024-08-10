import React from "react";
import dayjs from "dayjs";
import 'dayjs/locale/ar'; // import the Arabic locale
import styles from "./.module.scss";
import downloadFileImage from "../../../../assets/download_file.jpg";
import  linkImage from "../../../../assets/external-link_8526778.png";
import { ConstructionOutlined } from "@mui/icons-material";


const FileBox = ({
  type,
  description,
  url,
  created_at,
  userImage,
  userName,
  file
}) => {

  // type === 1 || 2 || 3 

  return (
    <div className={styles.box}>
      <div className={styles.right__col}>
        {/* image */}
        <div className={styles.image__box}>
          {type === "1" ? (
            // image
            <img src={url} alt="preview__image" className={styles.image} />
          ) : type === "2" ? (
            // file
            <img
              src={downloadFileImage}
              alt="file__download"
              className={styles.image}
            />
          ) : (
            <img src={linkImage} alt="preview__link" className={styles.image} />
          )}
        </div>
        {/* ==== Details ===== */}
        {/* button */}
        <div className={styles.details}>
          <div>
            <p className={styles.description}>{description}</p>
            <span className={styles.date}>
              {dayjs(created_at).locale("ar").format("DD-MMM-YYYY hh:mmA")}
            </span>
          </div>
          {type === "1" ? (
            <button className={styles.button}>عرض الصورة"</button>
          ) : type === "2" ? (
            <a className={styles.button} href={file} download >تحميل الملف</a>
          ) : (
            <a className={styles.button} href={url} target="_blank" rel="noreferrer">
              زيارة الرابط"
            </a>
          )}
        </div>
      </div>
      {/* ===== User Card ====== */}
      <div className={styles.user__card}>
        <img src={userImage} alt="" className={styles.user__image} />
        <h5 className={styles.user__name}>{userName}</h5>
      </div>
    </div>
  );
};

export default FileBox;
