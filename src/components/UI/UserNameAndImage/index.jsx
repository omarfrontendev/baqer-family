import React from 'react';
import styles from './.module.scss';

const UserNameAndImage = ({ img, name }) => {
  return (
    <div className={styles.user__box}>
      <img
      className={styles.img}
        src={
          img ||
          "https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png"
        }
        alt=""
      />
      <p className={styles.name}>{name}</p>
    </div>
  );
}

export default UserNameAndImage