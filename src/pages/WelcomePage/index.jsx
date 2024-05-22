import React from 'react';
import styles from './.module.scss';
import { Logo, MainButton } from '../../components';

const WelcomePage = () => {
  return (
    <div className={`${styles.page}`}>
      <div className={styles.content}>
        <Logo />
        <p className={styles.text}>
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق
        </p>
      </div>
      <MainButton to="/login" type="link">
        تسجيل الدخول
      </MainButton>
    </div>
  );
}

export default WelcomePage