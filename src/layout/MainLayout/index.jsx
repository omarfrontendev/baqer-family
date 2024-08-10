import React, { useState } from 'react';
import styles from './.module.scss';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={styles.layout}>
      <MainHeader onOpenMenu={() => setOpenMenu(true)} />
      <div
        className={`${styles.overlay} ${openMenu ? styles.opened : ""}`}
        onClick={() => setOpenMenu(false)}
      ></div>
      <div
        className={`${styles.sidebar__container} ${
          openMenu ? styles.opened : ""
        }`}
      >
        <MainSidebar onClose={() => setOpenMenu(false)} />
      </div>
      <div className={`${styles.content}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout