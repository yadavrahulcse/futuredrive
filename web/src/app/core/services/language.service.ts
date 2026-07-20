import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly supportedLanguages = ['en', 'hi'];

  constructor(private readonly translate: TranslateService) {
    const preferred = localStorage.getItem('preferredLanguage') || 'en';
    this.translate.addLangs(this.supportedLanguages);
    this.translate.setFallbackLang('en').subscribe();
    this.translate.use(preferred).subscribe();
  }

  get current(): string {
    return this.translate.currentLang() ?? 'en';
  }

  setLanguage(language: string): void {
    this.translate.use(language).subscribe();
    localStorage.setItem('preferredLanguage', language);
  }
}
