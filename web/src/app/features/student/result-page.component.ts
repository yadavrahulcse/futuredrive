import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { MockPlatformService } from '../../core/services/mock-platform.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink, TranslateModule],
  template: `
    <section class="space-y-6 px-4 py-8 lg:px-8">
      <div class="grid gap-6 lg:grid-cols-4">
        <mat-card class="rounded-3xl shadow-sm lg:col-span-2">
          <mat-card-content class="space-y-3 p-6">
            <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">{{ 'result_summary' | translate }}</p>
            <h1 class="text-4xl font-bold text-slate-900">{{ result.score }} / {{ result.totalMarks }}</h1>
            <p class="text-slate-600">Accuracy {{ result.accuracyPercentage }}% · Rank {{ result.rank }} · Percentile {{ result.percentile }}</p>
          </mat-card-content>
        </mat-card>
        <mat-card class="rounded-3xl shadow-sm">
          <mat-card-content class="p-6">
            <p class="text-sm text-slate-500">Correct</p>
            <p class="text-3xl font-bold text-emerald-600">{{ result.correctAnswers }}</p>
          </mat-card-content>
        </mat-card>
        <mat-card class="rounded-3xl shadow-sm">
          <mat-card-content class="p-6">
            <p class="text-sm text-slate-500">Incorrect</p>
            <p class="text-3xl font-bold text-rose-600">{{ result.incorrectAnswers }}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="space-y-4">
        @for (item of result.items; track item.questionId) {
          <mat-card class="rounded-3xl shadow-sm">
            <mat-card-content class="space-y-2 p-6">
              <div class="flex items-center justify-between gap-4">
                <h2 class="text-lg font-semibold text-slate-900">Question {{ $index + 1 }}</h2>
                <span class="rounded-full px-3 py-1 text-sm font-medium" [class]="item.correct ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'">
                  {{ item.correct ? 'Correct' : 'Needs review' }}
                </span>
              </div>
              <p class="text-slate-700">{{ localizedText(item.explanationText) }}</p>
            </mat-card-content>
          </mat-card>
        }
      </div>

      <a mat-flat-button color="primary" routerLink="/student">Back to catalog</a>
    </section>
  `
})
export class ResultPageComponent {
  readonly result = this.platform.activeResult();

  constructor(
    private readonly platform: MockPlatformService,
    private readonly languageService: LanguageService
  ) {}

  localizedText(text: Record<string, string>): string {
    return text[this.languageService.current] ?? text.en ?? Object.values(text)[0] ?? '';
  }
}
