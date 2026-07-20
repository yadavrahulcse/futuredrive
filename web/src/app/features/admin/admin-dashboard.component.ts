import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslatePipe } from '@ngx-translate/core';

import { MockPlatformService } from '../../core/services/mock-platform.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatTabsModule, TranslatePipe],
  template: `
    <section class="space-y-6 px-4 py-8 lg:px-8">
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">{{ 'admin_dashboard' | translate }}</p>
        <h1 class="mt-2 text-3xl font-bold text-slate-900">Question bank and test series operations</h1>
        <p class="mt-2 max-w-3xl text-slate-600">
          Admins can create multilingual questions, attach explanation media, compose tests, and monitor attempt analytics.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <mat-card class="rounded-3xl shadow-sm">
          <mat-card-content class="p-6"><p class="text-sm text-slate-500">Exams</p><p class="text-3xl font-bold text-slate-900">{{ overview.totalExams }}</p></mat-card-content>
        </mat-card>
        <mat-card class="rounded-3xl shadow-sm">
          <mat-card-content class="p-6"><p class="text-sm text-slate-500">Questions</p><p class="text-3xl font-bold text-slate-900">{{ overview.totalQuestions }}</p></mat-card-content>
        </mat-card>
        <mat-card class="rounded-3xl shadow-sm">
          <mat-card-content class="p-6"><p class="text-sm text-slate-500">Attempts</p><p class="text-3xl font-bold text-slate-900">{{ overview.totalAttempts }}</p></mat-card-content>
        </mat-card>
        <mat-card class="rounded-3xl shadow-sm">
          <mat-card-content class="p-6"><p class="text-sm text-slate-500">Completed</p><p class="text-3xl font-bold text-slate-900">{{ overview.completedAttempts }}</p></mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group animationDuration="0ms">
        <mat-tab label="Question Builder">
          <div class="grid gap-4 p-4 lg:grid-cols-2">
            <mat-card class="rounded-3xl shadow-sm">
              <mat-card-content class="space-y-3 p-6">
                <h2 class="text-xl font-semibold text-slate-900">Authoring checklist</h2>
                <ul class="space-y-2 text-slate-600">
                  <li>• Multilingual stem and options</li>
                  <li>• Image and audio attachment fields</li>
                  <li>• Difficulty, tags, and explanation editor</li>
                  <li>• Support for written and objective questions</li>
                </ul>
              </mat-card-content>
            </mat-card>
            <mat-card class="rounded-3xl shadow-sm">
              <mat-card-content class="space-y-3 p-6">
                <h2 class="text-xl font-semibold text-slate-900">Supported languages</h2>
                <div class="flex flex-wrap gap-2">
                  @for (language of overview.supportedLanguages; track language) {
                    <mat-chip>{{ language.toUpperCase() }}</mat-chip>
                  }
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
        <mat-tab label="Test Series Builder">
          <div class="p-4">
            <mat-card class="rounded-3xl shadow-sm">
              <mat-card-content class="space-y-3 p-6">
                <h2 class="text-xl font-semibold text-slate-900">Test composition flow</h2>
                <p class="text-slate-600">Filter questions by subject, difficulty, tags, and type, then assign them to sections with timing and marking rules.</p>
                <mat-divider></mat-divider>
                <div class="flex flex-wrap gap-3">
                  <button mat-flat-button color="primary">Create test series</button>
                  <button mat-stroked-button>Import question set</button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </section>
  `
})
export class AdminDashboardComponent {
  private readonly platform = inject(MockPlatformService);
  readonly overview = this.platform.adminOverview();
}
