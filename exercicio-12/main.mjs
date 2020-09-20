import Database from "./database.mjs";

const database = new Database();

async function exec() {
  await database
  .execute(
    "create table author (id number, name string, age number, city string, state string, country string)"
  );
  await Promise.all([
      database.execute(
        "insert into author (id, name, age) values (1, Douglas Crockford, 62)"
      ),
      database.execute(
        "insert into author (id, name, age) values (2, Linus Torvalds, 47)"
      ),
      database.execute(
        "insert into author (id, name, age) values (3, Martin Fowler, 54)"
      ),
    ])
  
  return database.execute("select name from author");
}

(async () => {
  console.time('execution time');
  try {
    const data = await exec();
    console.log(JSON.stringify(data,null,"  "));
  } catch (e) {
    console.log(e.message);
  } finally {
    console.timeEnd('execution time')
  }
})();
  
