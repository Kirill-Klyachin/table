const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

function readFile(path, data) {
  return new Promise((resolve, reject) =>
    fs.readFile(path, data, (err, usersRaw) => {
      if (err) reject(err);
      resolve(usersRaw);
    })
  );
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const PORT = 4000;

const PAGE_LIMIT = 10;

const COLUMN_NAME = "name";
const COLUMN_COUNT = "count";
const COLUMN_DISTANCE = "distance";

const CONDITION_DESC = "desc";
const CONDITION_ASC = "asc";

const CONDITION_EQ = "eq";
const CONDITION_CONTAIN = "contain";
const CONDITION_GT = "gt";
const CONDITION_LT = "lt";

const getStartAndEndIndex = (page) => {
  const startIndex = (page - 1) * PAGE_LIMIT;
  const endIndex = startIndex + PAGE_LIMIT;

  return { startIndex, endIndex };
};

const getCountPages = (totalCount) => {
  const countPage = Math.ceil(totalCount / 10);

  return countPage;
};

app.get("/api/table/", async function (request, response) {
  const json = await readFile("data.json", "utf8");
  const obj = JSON.parse(json);
  const { data: tableData } = obj;

  const { page, filterBy, filter, filtrValue, orderBy, order } = request.query;
  const numberFiltrValue = +filtrValue;

  const pageNumber = +page;
  const { startIndex, endIndex } = getStartAndEndIndex(pageNumber);

  let filtredDataTable = tableData.filter((item) => {
    if (filterBy === COLUMN_NAME) {
      if (filter === CONDITION_EQ)
        return item.name.toLowerCase() === filtrValue.toLowerCase();
      else if (filter === CONDITION_CONTAIN)
        return item.name.toLowerCase().indexOf(filtrValue.toLowerCase()) > -1;
    } else if (filterBy === COLUMN_COUNT || filterBy === COLUMN_DISTANCE) {
      if (filter === CONDITION_EQ) return item[filterBy] === numberFiltrValue;
      if (filter === CONDITION_GT) return item[filterBy] > numberFiltrValue;
      if (filter === CONDITION_LT) return item[filterBy] < numberFiltrValue;
    }
    return tableData;
  });

  filtredDataTable.sort((item1, item2) => {
    const isCortedDesc = order === CONDITION_DESC;

    if (orderBy === COLUMN_NAME)
      return isCortedDesc
        ? item2.name.localeCompare(item1.name)
        : item1.name.localeCompare(item2.name);
    else
      return isCortedDesc
        ? item2[orderBy] - item1[orderBy]
        : item1[orderBy] - item2[orderBy];
  });

  const countPage = getCountPages(filtredDataTable.length);

  const pageDataTable = filtredDataTable.slice(startIndex, endIndex);

  const dataResponse = {
    data: pageDataTable,
    countPage: countPage,
  };

  response.send(dataResponse).status(200);
});

app.listen(PORT, () => console.log(`Ready on http://localhost:${PORT}`));
