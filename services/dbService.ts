const DB_NAME = 'PortfolioDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'documents';

export interface ResumeDocument {
  id: string;
  name: string;
  pdfData: string; // Base64 string
  updatedAt: string;
}

export class PortfolioDB {
  private static db: IDBDatabase | null = null;

  static async init(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async saveResume(pdfBase64: string): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const data: ResumeDocument = {
        id: 'laksh_suthar_resume',
        name: 'Laksh_Suthar_Resume.pdf',
        pdfData: pdfBase64,
        updatedAt: new Date().toISOString(),
      };
      
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async getResume(): Promise<string | null> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('laksh_suthar_resume');
      
      request.onsuccess = () => {
        const result = request.result as ResumeDocument | undefined;
        resolve(result ? result.pdfData : null);
      };
      request.onerror = () => reject(request.error);
    });
  }
}
