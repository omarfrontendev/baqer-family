import React from 'react';
import Cookies from "js-cookie";
import styles from './.module.scss';

const Profile = () => {

    const userData = JSON.parse(Cookies.get("user"));

    return (
    <div className=''></div>
    );
}

export default Profile