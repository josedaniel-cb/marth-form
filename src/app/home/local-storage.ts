class LocalStorageService {
  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  getObject<T = any>(key: string): T | null {
    const value = this.get(key);
    return value !== null ? JSON.parse(value) : null;
  }

  set(key: string, value: string | object | null): void {
    if (value !== null) {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      // console.log('A');
      // console.log(value);

      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }
}

const instance = new LocalStorageService();

export const getLocalStorageItem = instance.get;

export const getLocalStorageItemObject = instance.getObject;

export const setLocalStorageItem = instance.set;

export default instance;
