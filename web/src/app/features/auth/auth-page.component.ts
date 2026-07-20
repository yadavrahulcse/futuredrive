import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, RouterLink, TranslateModule],
  template: `
    <section class="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div class="rounded-3xl bg-brand-700 p-8 text-white shadow-xl">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">PWA + multilingual</p>
        <h1 class="mt-4 text-4xl font-bold leading-tight">{{ 'app_title' | translate }}</h1>
        <p class="mt-4 max-w-2xl text-brand-50">
          Conduct competitive exams with image-based questions, written answers, explanations, responsive layouts,
          and admin-friendly test creation for Indian learners.
        </p>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl bg-white/10 p-4">
            <p class="text-2xl font-bold">9+</p>
            <p class="text-sm text-brand-100">Question types</p>
          </div>
          <div class="rounded-2xl bg-white/10 p-4">
            <p class="text-2xl font-bold">2</p>
            <p class="text-sm text-brand-100">MVP languages</p>
          </div>
          <div class="rounded-2xl bg-white/10 p-4">
            <p class="text-2xl font-bold">PWA</p>
            <p class="text-sm text-brand-100">Installable on mobile</p>
          </div>
        </div>
      </div>

      <mat-card class="rounded-3xl shadow-lg">
        <mat-card-content class="space-y-4 p-8">
          <h2 class="text-2xl font-semibold text-slate-900">{{ 'login' | translate }}</h2>
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>{{ 'mobile_number' | translate }}</mat-label>
            <input matInput [(ngModel)]="mobileNumber" placeholder="+91 98765 43210">
          </mat-form-field>
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>OTP</mat-label>
            <input matInput [(ngModel)]="otp" placeholder="123456">
          </mat-form-field>
          <div class="flex flex-wrap gap-3">
            <button mat-flat-button color="primary">{{ 'send_otp' | translate }}</button>
            <a mat-stroked-button routerLink="/student">Student demo</a>
            <a mat-stroked-button routerLink="/admin">Admin demo</a>
          </div>
          <p class="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
            Scaffold note: use OTP <strong>123456</strong> with any mobile number when connecting to the API.
          </p>
        </mat-card-content>
      </mat-card>
    </section>
  `
})
export class AuthPageComponent {
  mobileNumber = '';
  otp = '123456';
}
