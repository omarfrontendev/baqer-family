import Tree from "react-d3-tree";
import styles from "./.module.scss";

export const renderForeignObjectNodeTest = ({ nodeDatum }) => {

//   console.log("nodeDatum: ", nodeDatum);

  return (
    <g>
      <foreignObject width={100} height={150} x={-50} y={-25}>
        <div className={styles.box}>
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              margin: "3px auto 0",
              display: "block",
            }}
            src="https://up.yimg.com/ib/th?id=OIP.IKpJatzr_kSkN7k8VHXF6wHaGQ&pid=Api&rs=1&c=1&qlt=95&w=131&h=110"
            alt=""
          />
          <p className={styles.name}>{nodeDatum.name || "Name"}</p>
          {/* <p className={styles.name}>{nodeDatum.marry?.length ? nodeDatum.marry[0]?.name : ""}</p> */}
          {nodeDatum?.is_alive !== "1" && <div className={styles.badge}></div>}
        </div>
      </foreignObject>
    </g>
  );
};
