import Parser from "./parser.mjs";
import DatabaseError from "./database-error.mjs";

export default class Database {
  parser = new Parser();
  tables = {};

  select(parsedStatement) {
    const [, strColumnWhere, tableName, strValueWhere] = parsedStatement;
    const columnWhere = strColumnWhere
      .split(",")
      .map((column) => column.trim());
    const valueWhere = strValueWhere
      ? strValueWhere.split("and").map((where) => {
          const [column, value] = where.split("=");
          return {
            column: column.trim(),
            value: value.trim(),
          };
        })
      : [];

    const result = this.tables[tableName].data
      .filter(
        (row) =>
          valueWhere.length === 0 ||
          valueWhere.every(
            ({ column, value: columnValue }) => row[column] === columnValue
          )
      )
      .map((row) =>
        Object.fromEntries(columnWhere.map((column) => [column, row[column]]))
      );

    return result;
  }

  createTable(parsedStatement) {
    const [, tableName, strColumns] = parsedStatement;
    const columns = strColumns.split(",").map((column) => column.trim());

    this.tables[tableName] = {
      columns: Object.fromEntries(columns.map((column) => column.split(" "))),
      data: [],
    };
  }

  insert(parsedStatement) {
    const [, tableName, strColumns, strValues] = parsedStatement;
    const columns = strColumns.split(",").map((column) => column.trim());
    const values = strValues.split(",").map((value) => value.trim());

    const row = {};
    for (let i = 0; i < columns.length; ++i) row[columns[i]] = values[i];

    this.tables[tableName].data.push(row);
  }

  delete(parsedStatement) {
    const [, tableName, strWhere] = parsedStatement;

    const where = strWhere
      ? strWhere.split("and").map((where) => {
          const [column, value] = where.split("=");
          return {
            column: column.trim(),
            value: value.trim(),
          };
        })
      : [];

    this.tables[tableName].data = this.tables[tableName].data.filter(
      (row) =>
        !(
          where.length === 0 ||
          where.every(
            ({ column, value: columnValue }) => row[column] === columnValue
          )
        )
    );
  }

  execute(statement) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { command, parsedStatement } = this.parser.parse(statement) || {};
        if (command) resolve(this[command](parsedStatement));

        reject(new DatabaseError(statement, `Syntax error: '${statement}'`));
      }, 1000);
    });
  }
}
