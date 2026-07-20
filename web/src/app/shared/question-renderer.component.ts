import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Question } from '../core/models/platform.models';
import { LanguageService } from '../core/services/language.service';

@Component({
  selector: 'app-question-renderer',
  standalone: true,
  imports: [MatCardModule, MatRadioModule, MatCheckboxModule],
  template: `
    <mat-card class="rounded-3xl shadow-sm">
      <mat-card-content class="space-y-4 p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-brand-700">{{ question.type }}</p>
            <h3 class="mt-2 text-lg font-semibold text-slate-900">{{ localizedText(question.text) }}</h3>
          </div>
          <div class="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
            {{ question.marks }} marks
          </div>
        </div>

        @if (question.type === 'Msq') {
          <div class="space-y-3">
            @for (option of question.options; track option.id) {
              <mat-checkbox disabled>{{ localizedText(option.text) }}</mat-checkbox>
            }
          </div>
        } @else {
          <mat-radio-group class="flex flex-col gap-3">
            @for (option of question.options; track option.id) {
              <mat-radio-button [value]="option.id" disabled>{{ localizedText(option.text) }}</mat-radio-button>
            }
          </mat-radio-group>
        }
      </mat-card-content>
    </mat-card>
  `
})
export class QuestionRendererComponent {
  @Input({ required: true }) question!: Question;

  constructor(private readonly languageService: LanguageService) {}

  localizedText(text: Record<string, string>): string {
    return text[this.languageService.current] ?? text['en'] ?? Object.values(text)[0] ?? '';
  }
}
