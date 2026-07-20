import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { LanguageService } from '../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field appearance="outline" class="w-28 text-sm">
      <mat-select [ngModel]="languageService.current" (ngModelChange)="languageService.setLanguage($event)">
        <mat-option value="en">EN</mat-option>
        <mat-option value="hi">हिंदी</mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class LanguageSwitcherComponent {
  constructor(public readonly languageService: LanguageService) {}
}
