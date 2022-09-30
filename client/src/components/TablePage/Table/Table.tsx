import React from "react";

import TableItemHead from "./TableItemHead";
import TableItem from "./TableItem";
import { OPYIONS_TEBLE_HEAD } from "./opions";
import { TTableData, TSortColumn, TSortCondition } from "../../../types";
import styles from "./Table.module.css";

interface IProps {
  tableData: TTableData | null;
  sortColumn: TSortColumn;
  setSortColumn: React.Dispatch<React.SetStateAction<TSortColumn>>;
  sortCondition: TSortCondition;
  setSortCondition: React.Dispatch<React.SetStateAction<TSortCondition>>;
}

const Table = ({
  tableData,
  sortColumn,
  setSortColumn,
  sortCondition,
  setSortCondition,
}: IProps) => {
  return (
    <div className={styles.table}>
      <div className={styles.head}>
        {OPYIONS_TEBLE_HEAD.map((item) => {
          const { id, name } = item;

          return (
            <TableItemHead
              key={id}
              id={id}
              name={name}
              sortColumn={sortColumn}
              setSortColumn={setSortColumn}
              sortCondition={sortCondition}
              setSortCondition={setSortCondition}
            />
          );
        })}
      </div>

      {tableData?.map((item) => {
        const { id, data, name, count, distance } = item;

        return (
          <TableItem
            key={id}
            data={data}
            name={name}
            count={count}
            distance={distance}
          />
        );
      })}
    </div>
  );
};

export default Table;
