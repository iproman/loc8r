import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../classes/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(name: string, token: string): void {
    this.storage.setItem(name, token);
  }

  removeItem(name: string): void {
    this.storage.removeItem(name);
  }
}
