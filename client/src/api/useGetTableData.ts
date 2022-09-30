import { useEffect, useState } from "react";

import instance from "./instance";
import {
  TTableData,
  TFilterColumn,
  TFilterCondition,
  TSortColumn,
  TSortCondition,
} from "../types";

interface IParams {
  page: number;
  column: TFilterColumn;
  condition: TFilterCondition;
  filtrValue: string;
  sortColumn: TSortColumn;
  sortCondition: TSortCondition;
}

const getTableData = (params: IParams) => {
  const { page, column, condition, filtrValue, sortColumn, sortCondition } =
    params;

  return instance.get(
    `/api/table?page=${page}&filterBy=${column}&filter=${condition}&filtrValue=${filtrValue}&orderBy=${sortColumn}&order=${sortCondition}`
  );
};

export const useGetTableData = (params: IParams) => {
  const [tableData, setTableData] = useState<TTableData | null>(null);
  const [countPage, setCountPage] = useState(0);

  const { page, column, condition, filtrValue, sortColumn, sortCondition } =
    params;

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const res = await getTableData(params);
        const { data: tableData, countPage } = res.data;

        const typedTableData = tableData as TTableData;
        const typesCountPage = countPage as number;

        setTableData(typedTableData);
        setCountPage(typesCountPage);
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [page, column, condition, filtrValue, sortColumn, sortCondition]);

  return { tableData, countPage };
};
