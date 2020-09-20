export default class DatabaseError {
  constructor(statement, message) {
    Object.assign(this, { statement, message });
  }
}