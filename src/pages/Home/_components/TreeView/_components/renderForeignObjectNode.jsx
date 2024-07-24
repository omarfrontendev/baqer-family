import styles from "./.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  onDelete,
  isDeleting,
  deleting,
  onUpdate,
}) => {
  return (
    <g
      onClick={() => {
        if (nodeDatum?.type === "2") {
          toggleNode();
        }
      }}
    >
      <foreignObject width={100} height={150} x={-50} y={-35}>
        <div
          className={`${styles.box} ${
            nodeDatum?.type === "2" ? styles.female : styles.male
          } ${nodeDatum?.is_relict === "1" ? styles.is_relict : ""}`}
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
            >
              <FaTrashAlt />
            </button>
            <button
              className={styles.edit__btn}
              onClick={() => onUpdate(nodeDatum)}
            >
              <FaEdit />
            </button>
          </div>
          <p className={styles.name}>{nodeDatum.name}</p>
          {nodeDatum?.is_alive === "2" && <div className={styles.badge}></div>}
          {nodeDatum?.is_divorced === "1" && (
            <div className={`${styles.badge} ${styles.is_divorced}`}></div>
          )}
        </div>
      </foreignObject>
    </g>
  );
};
