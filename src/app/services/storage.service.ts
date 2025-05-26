import { inject, Injectable } from '@angular/core';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly _encryptService: EncryptService = inject(EncryptService);

  constructor() { }

  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      const encryptedValue = this._encryptService.encrypt(serializedValue);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (encryptedValue === null) {
        return null;
      }
      const decryptedValue = this._encryptService.decrypt<string>(encryptedValue);
      if (!decryptedValue) {
        return null;
      }
      if (typeof decryptedValue !== 'string') {
        return decryptedValue as T;
      } else {
        return JSON.parse(decryptedValue) as T;
      }
    } catch (error) {
      console.error('Error al obtener del localStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar del localStorage:', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar el localStorage:', error);
    }
  }
}
