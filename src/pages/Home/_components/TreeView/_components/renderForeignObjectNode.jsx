import styles from "./.module.scss";
import { FaTrashAlt, FaEdit, FaMinus, FaPlus } from "react-icons/fa";

export const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  onDelete,
  isDeleting,
  deleting,
  onUpdate,
  onShowDetails,
}) => {
  return (
    <g>
      <foreignObject width={100} height={150} x={-50} y={-55}>
        <div
          className={`${styles.box} ${
            nodeDatum?.type === "2" ? styles.female : styles.male
          }`}
          onClick={(e) => {
            if (e.target?.id) {
              return;
            } else {
              // e.stopPropagation();
              onShowDetails(nodeDatum);
            }
          }}
        >
          {isDeleting && deleting === nodeDatum?.id ? (
            <div className={styles.overlay}></div>
          ) : (
            ""
          )}
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              margin: "3px auto 0",
              display: "block",
            }}
            src={
              nodeDatum?.photo ||
              "https://up.yimg.com/ib/th?id=OIP.IKpJatzr_kSkN7k8VHXF6wHaGQ&pid=Api&rs=1&c=1&qlt=95&w=131&h=110"
            }
            alt=""
          />
          <div className={styles.btns}>
            <button
              className={styles.delete__btn}
              onClick={() => onDelete(nodeDatum?.id)}
              id="delete__btn"
            >
              <FaTrashAlt id="delete__btn" />
            </button>
            <button
              className={styles.edit__btn}
              onClick={() => onUpdate(nodeDatum)}
              id="delete__btn"
            >
              <FaEdit id="delete__btn" />
            </button>
          </div>
          <p className={styles.name}>{nodeDatum.name}</p>
          {nodeDatum?.is_alive === "2" && <div className={styles.badge}></div>}
          {nodeDatum?.is_divorced === "1" && (
            <div className={`${styles.badge} ${styles.is_divorced}`}></div>
          )}
          {nodeDatum?.is_relict === "1" && (
            <div
              className={`${styles.badge} ${styles.is_divorced} ${styles.is_relict}`}
            ></div>
          )}
          {nodeDatum?.children?.length && nodeDatum?.type === "2" ? (
            <button
              onClick={() => toggleNode()}
              className={styles.collapsed__btn}
              id="delete__btn"
            >
              {!nodeDatum?.__rd3t?.collapsed ? (
                <FaMinus id="delete__btn" />
              ) : (
                <FaPlus id="delete__btn" />
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      </foreignObject>
    </g>
  );
};
