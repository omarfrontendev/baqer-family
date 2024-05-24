import React from 'react';
import styles from './.module.scss';

const BlogBox = () => {
  return (
    <div className={styles.box}>
      <div className={styles.image}>
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.esZwT_Y54-RF9DGupSyLBwHaHa&pid=Api&P=0&h=220"
          alt=""
        />
      </div>
      <h5 className={styles.title}>أفراح آل الخطيب بارك الله لهما</h5>
      <button className={styles.button}>05 نوفمبر 2022</button>
    </div>
  );
}

export default BlogBox