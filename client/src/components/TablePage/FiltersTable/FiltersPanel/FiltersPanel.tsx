import React, { useState, useMemo } from "react";
import cn from "classnames";

import { TFilterColumn, TFilterCondition } from "../../../../types";
import { COLUMN_OPTINS, CONDITIONS_OPTIONS } from "./optios";
import styles from "./FiltersPanel.module.css";

const getIsVisible = (
  columnName: TFilterColumn,
  filterName: TFilterCondition
) => {
  if (columnName === "name") {
    if (filterName === "eq") return true;
    else if (filterName === "contain") return true;
  } else {
    if (filterName === "eq") return true;
    else if (filterName === "gt") return true;
    else if (filterName === "lt") return true;
  }
};

interface IProps {
  selectedColumn: TFilterColumn;
  setSelectedColumn: React.Dispatch<React.SetStateAction<TFilterColumn>>;
  selectedCondition: TFilterCondition;
  setSelectedCondition: React.Dispatch<React.SetStateAction<TFilterCondition>>;
  filtrValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenFiltersPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersPanel = ({
  selectedColumn,
  setSelectedColumn,
  selectedCondition,
  setSelectedCondition,
  filtrValue,
  setFilterValue,
  setIsOpenFiltersPanel,
}: IProps) => {
  const [isOpenFilterColumn, setIsOpenFilterColumn] = useState(false);
  const [isOpenFilterCondition, setIsOpenFilterCondition] = useState(false);

  const [column, setColumn] = useState(selectedColumn);
  const [condition, setCondition] = useState(selectedCondition);
  const [value, setValue] = useState(filtrValue);

  const isDisable = useMemo(
    () => !(column && condition && value),
    [column, condition, value]
  );

  const handleClickFilterColumn = () =>
    setIsOpenFilterColumn((state) => !state);

  const handleClickFilterCondition = () =>
    setIsOpenFilterCondition((state) => !state);

  const handleSelectFilterColumn = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { id } = e.currentTarget;

    const typedId = id as TFilterColumn;
    setColumn(typedId);
  };

  const handleSelectFilterCondition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { id } = e.currentTarget;

    const typedId = id as TFilterCondition;
    setCondition(typedId);
  };

  const handleChangeFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setValue(value);
  };

  const handleSaveFilters = () => {
    setSelectedColumn(column);
    setSelectedCondition(condition);
    setFilterValue(value);
    setIsOpenFiltersPanel(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.filter} onClick={handleClickFilterColumn}>
        Колонка
      </div>
      {isOpenFilterColumn &&
        COLUMN_OPTINS.map((item) => {
          const { id, name, title } = item;
          const isSelected = name === column;

          return (
            <div
              className={cn(
                styles.item,
                isSelected ? styles.item__selected : ""
              )}
              key={id}
              id={name}
              onClick={handleSelectFilterColumn}
            >
              {title}
            </div>
          );
        })}

      <div className={styles.filter} onClick={handleClickFilterCondition}>
        Условие
      </div>
      {isOpenFilterCondition &&
        CONDITIONS_OPTIONS.map((item) => {
          const { id, name, title } = item;
          const isSelected = name === condition;

          const typedName = name as TFilterCondition;
          const isVisible = getIsVisible(column, typedName);

          return (
            isVisible && (
              <div
                className={cn(
                  styles.item,
                  isSelected ? styles.item__selected : ""
                )}
                key={id}
                id={name}
                onClick={handleSelectFilterCondition}
              >
                {title}
              </div>
            )
          );
        })}

      <input
        className={styles.input}
        placeholder="Введите значение"
        value={value}
        onChange={handleChangeFilterValue}
      />
      <button
        className={styles.button}
        disabled={isDisable}
        onClick={handleSaveFilters}
      >
        Найти
      </button>
    </div>
  );
};

export default FiltersPanel;
