import React from "react";

import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
      Clearing Grid...
    </div>
  );
};

export default Spinner;
