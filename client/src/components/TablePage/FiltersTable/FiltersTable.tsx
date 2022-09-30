import React, { useMemo, useState } from "react";

import FiltersPanel from "./FiltersPanel";
import { TFilterColumn, TFilterCondition } from "../../../types";
import styles from "./FiltersTable.module.css";

interface IProps {
  selectedColumn: TFilterColumn;
  setSelectedColumn: React.Dispatch<React.SetStateAction<TFilterColumn>>;
  selectedCondition: TFilterCondition;
  setSelectedCondition: React.Dispatch<React.SetStateAction<TFilterCondition>>;
  filtrValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersTable = ({
  selectedColumn,
  setSelectedColumn,
  selectedCondition,
  setSelectedCondition,
  filtrValue,
  setFilterValue,
}: IProps) => {
  const [isOpenFiltersPanel, setIsOpenFiltersPanel] = useState(false);

  const isDisabled = useMemo(
    () =>
      !(
        selectedColumn &&
        selectedCondition &&
        filtrValue &&
        !isOpenFiltersPanel
      ),
    [selectedColumn, selectedCondition, filtrValue, isOpenFiltersPanel]
  );

  const handleOpenFilterPanel = () => setIsOpenFiltersPanel(true);

  const deleteFilters = () => {
    setSelectedColumn(null);
    setSelectedCondition(null);
    setFilterValue("");
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleOpenFilterPanel}>
        Фильтры
      </button>
      <button
        className={styles.button}
        onClick={deleteFilters}
        disabled={isDisabled}
      >
        Очистить
      </button>
      {isOpenFiltersPanel && (
        <FiltersPanel
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          filtrValue={filtrValue}
          setFilterValue={setFilterValue}
          setIsOpenFiltersPanel={setIsOpenFiltersPanel}
        />
      )}
    </div>
  );
};

export default FiltersTable;
