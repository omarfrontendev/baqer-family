
import React from "react";
import AddWifeForm from "./AddWifeForm";
import WifeBox from "./WifeBox";
import styles from './.module.scss';

const WifesSection = ({ control, formData, gender }) => {

  return (
    <>
      <AddWifeForm
        register={() => {}}
        errors={null}
        control={control}
        gender={gender}
      />
      {formData?.marry?.length ? (
        <div className={styles.list}>
          {formData?.marry?.map((item, i) => (
            <WifeBox
              key={item?.id}
              item={{ ...item }}
              control={control}
              i={i}
              gender={gender}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WifesSection;