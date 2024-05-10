import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private logoSubject = new Subject<string>();

  logoChange$ = this.logoSubject.asObservable();

  notifyLogoChange(newLogoUrl: string) {
    this.logoSubject.next(newLogoUrl);
  }
}