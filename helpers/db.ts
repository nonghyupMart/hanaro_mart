import * as SQLite from "expo-sqlite";
import * as Util from "../utils";
import * as Updates from "expo-updates";

const db = SQLite.openDatabase(Util.storagePrefix + "HanaroPlus.db");

export const initSQLite = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS memo (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, isChecked INTEGER NOT NULL DEFAULT 0);",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err): boolean => {
          resolve([]);
          Util.error(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const insertMemo = (title, isChecked) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO memo (title, isChecked) VALUES (?, ?);`,
        [title, !!Number(isChecked) ? 1 : 0],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          resolve([]);
          Util.error(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const deleteMemo = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM memo WHERE id=?;`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          resolve([]);
          Util.error(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const updateMemo = (id, title, isChecked) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE  memo SET title=?, isChecked=? WHERE id=?;`,
        [title, !!Number(isChecked) ? 1 : 0, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          resolve([]);
          Util.error(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const fetchMemo = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM memo",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          resolve([]);
          Util.error(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const dropTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE memo",
      [],
      function (db, results) {
        Util.log("Successfully Dropped");
      },
      function (db, error) {
        Util.error("Could not delete");
      }
    );
  });
};
