import React, { useContext } from 'react';
import styles from './.module.scss';
import DefaultCover from "../../../../../assets/DefaultCover.png";
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../../../icons';
import { Popup } from '../../../../../components';
import { ModalContext } from '../../../../../context/ModalContext';

const DiwaniyaBox = ({ diwaniya }) => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          // navigate(`${diwaniya?.id}`, { state: { data: diwaniya } });
        }}
        className={styles.box}
      >
        <div className={styles.image__box}>
          <img
            src={diwaniya?.image || DefaultCover}
            alt={"Diwaniya_image"}
            className={styles.img}
          />
        </div>
        <h4 className={styles.title}>{diwaniya?.name}</h4>
        <div className={styles.btns}>
          <button
            style={{ display: "flex" }}
            onClick={() => {
              navigate(`/diwaniyas/edit/10`, { state: { data: diwaniya } });
            }}
          >
            <EditIcon />
          </button>
          <button
            onClick={() => setIdModal("delete-diwaniya")}
            type="button"
            className={styles.delete__btn}
          >
            <DeleteIcon />
          </button>
        </div>
      </button>
      {idModal === "delete-diwaniya" && (
        <Popup>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          voluptate temporibus, dolorum, unde placeat eligendi repellat et
          dolores laudantium enim voluptates. Vitae sunt minima praesentium
          placeat! Soluta sequi obcaecati a!
        </Popup>
      )}
    </>
  );
};

export default DiwaniyaBox