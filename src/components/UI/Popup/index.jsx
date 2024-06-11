import React, { useContext } from 'react';
import styles from './.module.scss';
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from '../../../context/ModalContext';


const Popup = ({ children }) => {

    const { setIdModal } = useContext(ModalContext)

  return (
    <div className={styles.popup}>
      <div className={styles.overlay}></div>
      <div className={styles.popup__content}>
        <button onClick={() => setIdModal("")} className={styles.close__btn}>
          <IoCloseSharp />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup