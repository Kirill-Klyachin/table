import React, { useMemo } from "react";
import cn from "classnames";

import styles from "./PaginationPanel.module.css";

const FIRST_PAGE = 1;
const STEP = 1;

interface IProps {
  countPage: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationPanel = ({ countPage, pageNumber, setPageNumber }: IProps) => {
  const isFirstPage = pageNumber === FIRST_PAGE;
  const isLastPage = pageNumber === countPage;

  const arrayPageNumbers = useMemo(
    () => Array.from({ length: countPage }, (v, index) => index + STEP),
    [countPage]
  );

  const handleSelectedPage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { id } = e.currentTarget;
    const numberId = +id;

    setPageNumber(numberId);
  };

  const handleBackPage = () => setPageNumber((number) => number - STEP);
  const handleNextPage = () => setPageNumber((number) => number + STEP);

  return (
    <div className={styles.panel}>
      <button
        className={styles.button}
        disabled={isFirstPage}
        onClick={handleBackPage}
      >
        Назад
      </button>

      <div className={styles.panelContent}>
        {arrayPageNumbers.map((item) => (
          <div
            className={cn(
              styles.item,
              item === pageNumber ? styles.item__active : ""
            )}
            key={item}
            id={`${item}`}
            onClick={handleSelectedPage}
          >
            {item}
          </div>
        ))}
      </div>

      <button
        className={styles.button}
        disabled={isLastPage}
        onClick={handleNextPage}
      >
        Вперед
      </button>
    </div>
  );
};

export default PaginationPanel;
