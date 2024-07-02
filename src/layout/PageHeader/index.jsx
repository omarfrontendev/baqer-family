import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styles from './.module.scss';

const PageHeader = ({ title, backHref, backBtnStyle }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.main__header}>
      <div className={`${styles.header} container`}>
        <button
          style={{ ...backBtnStyle }}
          className={styles.back__btn}
          onClick={() => navigate(backHref || -1)}
        >
          <MdArrowForwardIos />
        </button>
        {title && <h3 className={styles.title}>{title}</h3>}
      </div>
    </div>
  );
};

export default PageHeader