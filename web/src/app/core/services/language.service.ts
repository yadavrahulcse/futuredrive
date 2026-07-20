import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly supportedLanguages = ['en', 'hi'];

  constructor(private readonly translate: TranslateService) {
    const preferred = localStorage.getItem('preferredLanguage') || 'en';
    this.translate.addLangs(this.supportedLanguages);
    this.translate.setDefaultLang('en');
    this.translate.use(preferred);
  }

  get current(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'en';
  }

  setLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('preferredLanguage', language);
  }
}
