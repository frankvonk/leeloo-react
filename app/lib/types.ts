export type Task = {
  id: string;
  title: string;
  advice?: number;
  typeAdvice?: boolean;
  [key: string]: unknown;
};

export type Category = {
  id: string;
  description: string;
  displayContent?: boolean;
  tasks?: Task[];
  [key: string]: unknown;
};

export type Database = {
  categories: Category[];
  history?: Category[];
  deleted?: Category[];
  [key: string]: unknown;
};

export type Connection = {
  userName: string;
  password: string;
  DB_CONNSTRING: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
};
