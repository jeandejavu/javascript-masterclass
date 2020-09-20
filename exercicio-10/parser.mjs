export default class Parser {
  commands = new Map();
  constructor() {
    this.commands.set("select", /select (.*) from ([\w]+){1,1}(?: where (.+))?/);
    this.commands.set("createTable", /create table (.*) \(([^)]+)\)/);
    this.commands.set("insert", /insert into (.*) \(([^)]+)\) values \(([^)]+)\)/);
    this.commands.set("delete", /delete from ([\w]+){1,1}(?: where (.+))?/);
  }

  parse(statement) {
    for (let [command, regex] of this.commands) {
      if (regex.test(statement))
        return {
          command,
          parsedStatement: statement.match(regex),
        };
    }
  }
}