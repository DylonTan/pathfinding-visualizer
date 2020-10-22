import React from "react";

import styles from "./Legend.module.css";

const Legend = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.legend}>
        <li className={styles.item}>
          <div
            className={styles.node}
            style={{ border: "0.5px solid gray" }}
          ></div>
          Empty Node
        </li>
        <li className={styles.item}>
          <div
            className={styles.node}
            style={{ backgroundColor: "#073b4c" }}
          ></div>
          Wall Node
        </li>
        <li className={styles.item}>
          <div
            className={styles.node}
            style={{ backgroundColor: "#f9844a" }}
          ></div>
          Unvisited Node
        </li>
        <li className={styles.item}>
          <div
            className={styles.node}
            style={{ backgroundColor: "#ffd166" }}
          ></div>
          Visited Node
        </li>
        <li className={styles.item}>
          <div
            className={styles.node}
            style={{ backgroundColor: "#06d6a0" }}
          ></div>
          Shortest Path
        </li>
        <li className={styles.item}>
          <div
            className={styles.node}
            style={{ backgroundColor: "#118ab2" }}
          ></div>
          Start Node
        </li>
        <li className={styles.item}>
          <div
            className={styles.node}
            style={{ backgroundColor: "#ef476f" }}
          ></div>
          End Node
        </li>
      </ul>
    </div>
  );
};

export default Legend;
