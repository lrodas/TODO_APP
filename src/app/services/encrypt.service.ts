import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { SECURITY_IV, SECURITY_KEY } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  private readonly key = SECURITY_KEY;
  private readonly iv = CryptoJS.enc.Utf8.parse(SECURITY_IV);

  constructor() { }

  public encrypt(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  public decrypt<T>(data: string): T {
    const decrypted = CryptoJS.AES.decrypt(data, this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decryptedString) as T;
    } catch (error) {
      console.error('Error al parsear JSON:', error);
      return decryptedString as any;
    }
  }
}
