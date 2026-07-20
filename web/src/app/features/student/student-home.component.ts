import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MockPlatformService } from '../../core/services/mock-platform.service';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, RouterLink, TranslatePipe],
  template: `
    <section class="space-y-8 px-4 py-8 lg:px-8">
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">Student dashboard</p>
        <h1 class="mt-2 text-3xl font-bold text-slate-900">{{ 'competitive_exams' | translate }}</h1>
        <p class="mt-2 max-w-3xl text-slate-600">
          Browse Indian competitive exam categories, switch languages, and start tests on phone, tablet, or desktop.
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          @for (category of platform.categories; track category.id) {
            <mat-chip>{{ category.name }}</mat-chip>
          }
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        @for (exam of filteredExams(); track exam.id) {
          <mat-card class="rounded-3xl shadow-sm">
            <mat-card-content class="space-y-4 p-6">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-brand-700">{{ exam.categoryName }}</p>
                  <h2 class="mt-1 text-2xl font-semibold text-slate-900">{{ exam.title }}</h2>
                </div>
                <div class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{{ exam.durationMinutes }} mins</div>
              </div>
              <p class="text-slate-600">{{ exam.description }}</p>
              <div class="flex flex-wrap gap-2 text-sm text-slate-500">
                <span class="rounded-full bg-brand-50 px-3 py-1">{{ exam.totalMarks }} marks</span>
                @for (language of exam.languages; track language) {
                  <span class="rounded-full bg-slate-100 px-3 py-1">{{ language }}</span>
                }
              </div>
              <div class="flex flex-wrap gap-3">
                <a mat-flat-button color="primary" routerLink="/student/attempt/attempt-1">{{ 'attempt_exam' | translate }}</a>
                <a mat-stroked-button routerLink="/student/results/attempt-1">{{ 'result_summary' | translate }}</a>
              </div>
            </mat-card-content>
          </mat-card>
        }
      </div>
    </section>
  `
})
export class StudentHomeComponent {
  readonly selectedCategory = signal<string | null>(null);
  readonly filteredExams = computed(() => {
    const category = this.selectedCategory();
    return category ? this.platform.exams.filter((exam) => exam.categoryName === category) : this.platform.exams;
  });

  constructor(public readonly platform: MockPlatformService) {}
}
