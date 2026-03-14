import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  template: `
    <div class="about-container">
      <div class="about-header">
        <h1>Про Платформу</h1>
        <p class="subtitle">Інтерактивна платформа для вивчення мов</p>
      </div>

      <div class="about-content">
        <section class="mission-section">
          <mat-card class="mission-card">
            <mat-card-content>
              <h2>Наша Місія</h2>
              <p>Створити найкращу платформу для вивчення мов з інтерактивними уроками та персоналізованим підходом</p>
            </mat-card-content>
          </mat-card>
        </section>

        <section class="features-section">
          <h2>Особливості</h2>
          <div class="features-grid">
            <mat-card class="feature-item">
              <mat-card-content>
                <h3>Персоналізоване навчання</h3>
                <p>Адаптивні уроки, що відповідають вашому рівню та темпу навчання</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-item">
              <mat-card-content>
                <h3>Інтерактивні вправи</h3>
                <p>Практичні завдання та тести для закріплення знань</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-item">
              <mat-card-content>
                <h3>Відстеження прогресу</h3>
                <p>Детальна статистика вашого навчання та досягнень</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-item">
              <mat-card-content>
                <h3>Спільнота</h3>
                <p>Спілнота з іншими студентами та викладачами</p>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

        <section class="languages-section">
          <h2>Мови</h2>
          <p>Вивчайте різні мови з нашими спеціалізованими курсами</p>
          <div class="languages-list">
            <div class="language-item">
              <h3>🇺🇦 Українська</h3>
              <p>Комплексний курс української мови від основ до просунутого рівня</p>
            </div>
            <div class="language-item">
              <h3>🇷🇺 Російська</h3>
              <p>Курс російської мови з акцентом на граматиці та розмовній практиці</p>
            </div>
            <div class="language-item">
              <h3>🇪🇸 Іспанська</h3>
              <p>Інтенсивний курс іспанської мови для початківців та просунутих студентів</p>
            </div>
          </div>
        </section>

        <section class="cta-section">
          <button mat-raised-button color="primary" routerLink="/register">
            Почати навчання
          </button>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .about-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .about-header h1 {
      font-size: 3rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    .mission-card {
      margin-bottom: 3rem;
    }

    .mission-card h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .mission-card p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
    }

    .features-section h2,
    .languages-section h2 {
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .feature-item {
      height: 100%;
    }

    .feature-item h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .feature-item p {
      color: #666;
      line-height: 1.5;
    }

    .languages-section p {
      text-align: center;
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .languages-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .language-item {
      text-align: center;
    }

    .language-item h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .language-item p {
      color: #666;
      line-height: 1.5;
    }

    .cta-section {
      text-align: center;
      margin-top: 3rem;
    }

    .cta-section button {
      padding: 1rem 3rem;
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .about-container {
        padding: 1rem;
      }

      .about-header h1 {
        font-size: 2rem;
      }

      .features-section h2,
      .languages-section h2 {
        font-size: 2rem;
      }

      .features-grid,
      .languages-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent { }
