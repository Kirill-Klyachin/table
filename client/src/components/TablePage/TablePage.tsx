import React, { useMemo, useState } from "react";

import FiltersTable from "./FiltersTable";
import Table from "./Table";
import PaginationPanel from "./PaginationPanel";
import { useGetTableData } from "../../api";
import {
  TFilterColumn,
  TFilterCondition,
  TSortColumn,
  TSortCondition,
} from "../../types";

const START_PAGE = 1;

const TablePage = () => {
  const [pageNumber, setPageNumber] = useState(START_PAGE); //номер страницы

  const [selectedColumn, setSelectedColumn] = useState<TFilterColumn>(null); // выбранная кололнка фильтрации
  const [selectedCondition, setSelectedCondition] =
    useState<TFilterCondition>(null); // выбранное условие
  const [filtrValue, setFilterValue] = useState(""); // введенное значение

  const [sortColumn, setSortColumn] = useState<TSortColumn>(null); // выбранная кололнка сортировки
  const [sortCondition, setSortCondition] = useState<TSortCondition>(null); // условие сортировки

  const params = useMemo(
    () => ({
      page: pageNumber,
      column: selectedColumn,
      condition: selectedCondition,
      filtrValue: filtrValue,
      sortColumn: sortColumn,
      sortCondition: sortCondition,
    }),
    [
      pageNumber,
      selectedColumn,
      selectedCondition,
      filtrValue,
      sortColumn,
      sortCondition,
    ]
  );

  const { tableData, countPage } = useGetTableData(params);

  return (
    <>
      <FiltersTable
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        selectedCondition={selectedCondition}
        setSelectedCondition={setSelectedCondition}
        filtrValue={filtrValue}
        setFilterValue={setFilterValue}
      />
      <Table
        tableData={tableData}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        sortCondition={sortCondition}
        setSortCondition={setSortCondition}
      />
      {countPage ? (
        <PaginationPanel
          countPage={countPage}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      ) : null}
    </>
  );
};

export default TablePage;
