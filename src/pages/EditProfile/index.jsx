import React from 'react';
// page component
import RegisterForm from './_components/RegisterForm';
// style
import styles from './.module.scss'

const EditProfile = () => {
  return (
    <div className={styles.page}>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
}

export default EditProfile;