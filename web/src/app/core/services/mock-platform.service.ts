import { Injectable, signal } from '@angular/core';

import { AdminOverview, Attempt, ExamSummary, Result } from '../models/platform.models';

@Injectable({ providedIn: 'root' })
export class MockPlatformService {
  readonly categories = [
    { id: 'cat-upsc', code: 'UPSC', name: 'UPSC' },
    { id: 'cat-ssc', code: 'SSC', name: 'SSC' },
    { id: 'cat-jee', code: 'JEE', name: 'JEE' }
  ];

  readonly exams = [
    {
      id: 'exam-upsc',
      title: 'UPSC Prelims Mock Pack',
      description: 'Bilingual general studies test series with image and explanation support.',
      durationMinutes: 120,
      totalMarks: 200,
      categoryName: 'UPSC',
      languages: ['English', 'Hindi']
    },
    {
      id: 'exam-ssc',
      title: 'SSC CGL Smart Practice',
      description: 'Mobile-friendly sectional practice with timer and review palette.',
      durationMinutes: 60,
      totalMarks: 100,
      categoryName: 'SSC',
      languages: ['English', 'Hindi']
    }
  ] satisfies ExamSummary[];

  readonly activeAttempt = signal<Attempt>({
    id: 'attempt-1',
    studentId: 'student-1',
    testSeriesId: 'series-upsc-1',
    status: 'InProgress',
    score: 0,
    switchedTabs: 0,
    questions: [
      {
        questionId: 'q1',
        section: 'General Studies',
        orderNumber: 1,
        question: {
          id: 'q1',
          type: 'Mcq',
          marks: 2,
          negativeMarks: 0.66,
          text: {
            en: 'Which Article of the Indian Constitution deals with equality before law?',
            hi: 'भारतीय संविधान का कौन-सा अनुच्छेद विधि के समक्ष समानता से संबंधित है?'
          },
          explanationText: {
            en: 'Article 14 guarantees equality before law.',
            hi: 'अनुच्छेद 14 विधि के समक्ष समानता की गारंटी देता है।'
          },
          options: [
            { id: 'q1-o1', text: { en: 'Article 14', hi: 'अनुच्छेद 14' }, isCorrect: true },
            { id: 'q1-o2', text: { en: 'Article 19', hi: 'अनुच्छेद 19' } },
            { id: 'q1-o3', text: { en: 'Article 21', hi: 'अनुच्छेद 21' } },
            { id: 'q1-o4', text: { en: 'Article 32', hi: 'अनुच्छेद 32' } }
          ]
        }
      },
      {
        questionId: 'q2',
        section: 'General Studies',
        orderNumber: 2,
        question: {
          id: 'q2',
          type: 'TrueFalse',
          marks: 1,
          negativeMarks: 0.25,
          text: {
            en: 'The President of India can declare a National Emergency under Article 352.',
            hi: 'भारत के राष्ट्रपति अनुच्छेद 352 के अंतर्गत राष्ट्रीय आपातकाल घोषित कर सकते हैं।'
          },
          explanationText: {
            en: 'This statement is true.',
            hi: 'यह कथन सही है।'
          },
          options: [
            { id: 'q2-o1', text: { en: 'True', hi: 'सही' }, isCorrect: true },
            { id: 'q2-o2', text: { en: 'False', hi: 'गलत' } }
          ]
        }
      }
    ]
  });

  readonly activeResult = signal<Result>({
    attemptId: 'attempt-1',
    score: 3,
    totalMarks: 3,
    correctAnswers: 2,
    incorrectAnswers: 0,
    accuracyPercentage: 100,
    rank: 12,
    percentile: 96.4,
    items: [
      {
        questionId: 'q1',
        correct: true,
        marksAwarded: 2,
        explanationText: {
          en: 'Article 14 guarantees equality before law.',
          hi: 'अनुच्छेद 14 विधि के समक्ष समानता की गारंटी देता है।'
        }
      },
      {
        questionId: 'q2',
        correct: true,
        marksAwarded: 1,
        explanationText: {
          en: 'This statement is true.',
          hi: 'यह कथन सही है।'
        }
      }
    ]
  });

  readonly adminOverview = signal<AdminOverview>({
    totalExams: 8,
    totalQuestions: 1240,
    totalAttempts: 518,
    completedAttempts: 489,
    supportedLanguages: ['en', 'hi', 'ta', 'te', 'mr', 'bn']
  });

  incrementTabSwitch(): void {
    this.activeAttempt.update((attempt) => ({
      ...attempt,
      switchedTabs: attempt.switchedTabs + 1
    }));
  }
}
