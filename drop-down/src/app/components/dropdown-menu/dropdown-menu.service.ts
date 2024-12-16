import { openDB, IDBPDatabase } from 'idb';
import { DropDownDB, IndexedDbData } from '../../models/IndexedDB.model';
import { Category } from '../../models/dropDown.model';

export class IndexedDbService {
  private dbName = 'dropDownDB';

  private async openDb(): Promise<IDBPDatabase<DropDownDB>> {
    return openDB<DropDownDB>(this.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('selectionStore')) {
          db.createObjectStore('selectionStore', { keyPath: 'key' });
        }
      },
    });
  }

  async saveData(data: {
    categories: Category[];
    isSelectedAll: boolean;
  }): Promise<void> {
    const db = await this.openDb();
    const indexedDbData: IndexedDbData = {
      key: 1,
      categories: data.categories,
      isSelectedAll: data.isSelectedAll,
    };
    await db.put(
      'selectionStore',
      indexedDbData
    );
  }

  async loadData() {
    const db = await this.openDb();
    return db.get('selectionStore', 1);
  }
}
