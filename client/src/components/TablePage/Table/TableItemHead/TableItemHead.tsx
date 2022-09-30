import React from "react";
import cn from "classnames";

import Indicator from "./Indicator";
import { TSortColumn, TSortCondition } from "../../../../types";
import styles from "./TableItemHead.module.css";

const ID_DATE = "date";

const CONDITION_DESC = "desc";
const CONDITION_ASC = "asc";

interface IProps {
  id: string;
  name: string;
  sortColumn: TSortColumn;
  setSortColumn: React.Dispatch<React.SetStateAction<TSortColumn>>;
  sortCondition: TSortCondition;
  setSortCondition: React.Dispatch<React.SetStateAction<TSortCondition>>;
}

const TableItemHead = ({
  id,
  name,
  sortColumn,
  setSortColumn,
  sortCondition,
  setSortCondition,
}: IProps) => {
  const isNotDate = id !== ID_DATE;
  const isThisColumnSelected = id === sortColumn;
  const isIndicatorDown = sortCondition === CONDITION_DESC;

  const handleSorted = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    const typedId = id as TSortColumn;

    if (isNotDate) {
      setSortColumn(typedId);

      if (!sortCondition) setSortCondition(CONDITION_DESC);
      else
        setSortCondition((state) =>
          state === CONDITION_DESC ? CONDITION_ASC : CONDITION_DESC
        );
    }
  };

  return (
    <div
      className={cn(styles.item, isNotDate ? styles.item__sorted : "")}
      id={id}
      onClick={handleSorted}
    >
      {name}
      {isThisColumnSelected && <Indicator isIndicatorDown={isIndicatorDown} />}
    </div>
  );
};

export default TableItemHead;
