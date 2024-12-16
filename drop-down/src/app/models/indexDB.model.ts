import { DBSchema } from 'idb';
import { Category } from './dropDown.model';

interface DropDownDB extends DBSchema {
  selectionStore: {
    key: number;
    value: { categories: Category[]; isSelectedAll: boolean };
  };
}

export type { DropDownDB };