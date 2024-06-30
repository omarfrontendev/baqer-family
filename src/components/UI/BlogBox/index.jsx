import React from 'react';
import styles from './.module.scss';
import dayjs from "dayjs";
import { ar } from "date-fns/locale";
import { Link, useNavigate } from 'react-router-dom';

const BlogBox = ({ singleNew }) => {

  const navigate = useNavigate();

  return (
    <button onClick={() => {
      navigate(`/news/${singleNew?.id}`, { state: { data: singleNew } });
    }} className={styles.box}>
      <div className={styles.image}>
        <img
          src={
            singleNew?.image ||
            "https://tse2.mm.bing.net/th?id=OIP.esZwT_Y54-RF9DGupSyLBwHaHa&pid=Api&P=0&h=220"
          }
          alt="new_image"
        />
      </div>
      <h5 className={styles.title}>{singleNew?.title}</h5>
      <div className={styles.button}>
        {dayjs(singleNew?.created_at).locale("ar").format("DD  MMMM  YYYY")}
      </div>
    </button>
  );
}

export default BlogBox