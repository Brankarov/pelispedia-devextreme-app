import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Pelispedia Devextreme App';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
