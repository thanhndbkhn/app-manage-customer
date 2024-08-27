import Database from 'better-sqlite3';
import path from 'path';

export type TODO = {
  id?: number;
  title: string;
  date: string;
  status: number;
};

export function connect() {
  return Database(
    path.join(__dirname, '../../../', 'release/app', 'database.db'),
    { verbose: console.log, fileMustExist: true },
  );
}

export function insertTODO(todo: TODO) {
  const db = connect();

  const stm = db.prepare(
    'INSERT INTO todos (title, date, status) VALUES (@title, @date, @status)',
  );

  stm.run(todo);
}

export function updateTODO(todo: TODO) {
  const db = connect();
  const { title, status, id } = todo;

  const stm = db.prepare(
    'UPDATE todos SET title = @title, status = @status WHERE id = @id',
  );

  stm.run({ title, status, id });
}

export function deleteTODO(id: number) {
  const db = connect();

  const stm = db.prepare('DELETE FROM todos WHERE id = @id');

  stm.run({ id });
}

export function getAllTODO() {
  const db = connect();

  const stm = db.prepare('SELECT * FROM todos');
  const data = stm.all() as TODO[];
  return stm.all() as TODO[];
}

export function getOneTODO(id: number) {
  const db = connect();

  const stm = db.prepare('SELECT * FROM todos where id = @id');

  return stm.get({ id }) as TODO;
}
