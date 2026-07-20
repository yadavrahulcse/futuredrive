import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MockPlatformService } from '../../core/services/mock-platform.service';
import { LanguageService } from '../../core/services/language.service';
import { QuestionRendererComponent } from '../../shared/question-renderer.component';

@Component({
  selector: 'app-exam-attempt',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    RouterLink,
    TranslatePipe,
    QuestionRendererComponent
  ],
  template: `
    <section class="grid gap-6 px-4 py-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
      <mat-card class="order-2 rounded-3xl shadow-sm lg:order-1">
        <mat-card-content class="space-y-4 p-5">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-900">Question palette</h2>
            <span class="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">{{ answeredCount() }}/{{ attempt.questions.length }}</span>
          </div>
          <mat-progress-bar mode="determinate" [value]="(answeredCount() / attempt.questions.length) * 100"></mat-progress-bar>
          <mat-nav-list>
            @for (attemptQuestion of attempt.questions; track attemptQuestion.questionId) {
              <a mat-list-item (click)="selectedIndex.set($index)" class="cursor-pointer">
                <span matListItemTitle>{{ attemptQuestion.section }}</span>
                <span matListItemLine>Question {{ attemptQuestion.orderNumber }}</span>
              </a>
            }
          </mat-nav-list>
          <div class="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            Tab switches detected: {{ attempt.switchedTabs }}
          </div>
        </mat-card-content>
      </mat-card>

      <div class="order-1 space-y-6 lg:order-2">
        <div class="grid gap-4 md:grid-cols-[1fr_auto]">
          <div class="rounded-3xl bg-white p-6 shadow-sm">
            <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">Live attempt</p>
            <h1 class="mt-2 text-3xl font-bold text-slate-900">UPSC GS Test 01</h1>
            <p class="mt-2 text-slate-600">Touch-friendly attempt layout with multilingual question rendering, auto-save hooks, and timer sync point.</p>
          </div>
          <div class="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
            <p class="text-sm text-slate-300">Timer</p>
            <p class="mt-2 text-4xl font-bold">01:34:22</p>
            <p class="mt-3 text-sm text-slate-300">Auto-submit on timeout</p>
          </div>
        </div>

        <app-question-renderer [question]="currentQuestion().question"></app-question-renderer>

        @if (currentQuestion().question.type === 'Integer' || currentQuestion().question.type === 'FillBlank') {
          <mat-card class="rounded-3xl shadow-sm">
            <mat-card-content class="p-6">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Written / numeric answer</mat-label>
                <input matInput [(ngModel)]="textAnswer">
              </mat-form-field>
            </mat-card-content>
          </mat-card>
        }

        <div class="flex flex-wrap gap-3">
          <button mat-stroked-button>{{ 'mark_for_review' | translate }}</button>
          <button mat-flat-button color="primary">Save answer</button>
          <a mat-flat-button color="accent" routerLink="/student/results/attempt-1">{{ 'submit_exam' | translate }}</a>
        </div>
      </div>
    </section>
  `
})
export class ExamAttemptComponent {
  private readonly platform = inject(MockPlatformService);
  readonly languageService = inject(LanguageService);
  readonly attempt = this.platform.activeAttempt();
  readonly selectedIndex = signal(0);
  readonly answeredCount = computed(() => 1);
  textAnswer = '';

  currentQuestion() {
    return this.attempt.questions[this.selectedIndex()];
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this.platform.incrementTabSwitch();
    }
  }
}
