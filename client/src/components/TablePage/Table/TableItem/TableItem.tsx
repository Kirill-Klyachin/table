import React from "react";

import styles from "./TableItem.module.css";

interface IProps {
  data: string;
  name: string;
  count: number;
  distance: number;
}

const TableItem = ({ data, name, count, distance }: IProps) => {
  const constructedData = new Date(data);
  const formatedData = constructedData.toDateString();

  return (
    <div className={styles.row}>
      <div className={styles.item}>{formatedData}</div>
      <div className={styles.item}>{name}</div>
      <div className={styles.item}>{count}</div>
      <div className={styles.item}>{distance}</div>
    </div>
  );
};

export default TableItem;
