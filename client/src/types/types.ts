export type TTableData = {
  id: number;
  data: string;
  name: string;
  count: number;
  distance: number;
}[];

export type TFilterColumn = "name" | "count" | "distance" | null;

export type TFilterCondition = "eq" | "contain" | "gt" | "lt" | null;

export type TSortColumn = "name" | "count" | "distance" | null;

export type TSortCondition = "desc" | "asc" | null;
