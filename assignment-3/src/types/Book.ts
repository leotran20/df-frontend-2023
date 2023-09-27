export enum BookType {
  Programming = 'Programming',
  DevOps = 'DevOps',
  Database = 'Database',
}

export interface Book {
  name: string;
  author: string;
  topic: BookType;
}
