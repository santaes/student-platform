import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="landing-container">
      <header class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Навчальна платформа</h1>
          <p class="hero-subtitle">
            Вивчайте нові мови з інтерактивними уроками, домашніми завданнями та персоналізованим навчальним планом
          </p>
          <div class="hero-actions">
            <button mat-raised-button color="primary" size="large" (click)="navigateToRegister()">
              Почати навчання
            </button>
            <button mat-stroked-button size="large" (click)="navigateToLogin()">
              Увійти
            </button>
          </div>
        </div>
      </header>

      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Чому обирають нашу платформу</h2>
          <div class="features-grid">
            <mat-card class="feature-card">
              <mat-card-content>
                <mat-icon class="feature-icon">timeline</mat-icon>
                <h3>Персоналізований план</h3>
                <p>Створюємо індивідуальний навчальний план на основі ваших цілей та рівня знань</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card">
              <mat-card-content>
                <mat-icon class="feature-icon">assignment</mat-icon>
                <h3>Практичні завдання</h3>
                <p>Закріплюйте знання за допомогою домашніх завдань та інтерактивних вправ</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card">
              <mat-card-content>
                <mat-icon class="feature-icon">school</mat-icon>
                <h3>Кваліфіковані викладачі</h3>
                <p>Навчайтесь у досвідчених викладачів, які люблять свою справу</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card">
              <mat-card-content>
                <mat-icon class="feature-icon">folder</mat-icon>
                <h3>Багато ресурсів</h3>
                <p>Доступ до навчальних матеріалів, відеоуроків та додаткових ресурсів</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <section class="languages-section">
        <div class="container">
          <h2 class="section-title">Популярні мови для вивчення</h2>
          <div class="languages-grid">
            <div class="language-item">
              <h3>Українська</h3>
              <p>Для початківців та продовжуючих</p>
            </div>
            <div class="language-item">
              <h3>Російська</h3>
              <p>Базовий та просунутий рівні</p>
            </div>
            <div class="language-item">
              <h3>Іспанська</h3>
              <p>Від алфавіту до розмовної мови</p>
            </div>
            <div class="language-item">
              <h3>Англійська</h3>
              <p>Міжнародні стандарти навчання</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>Почніть вивчати нову мову сьогодні</h2>
          <p>Приєднуйтесь до тисяч студентів, які вже досягли успіху</p>
          <button mat-raised-button color="primary" size="large" (click)="navigateToRegister()">
            Зареєструватись безкоштовно
          </button>
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <p>&copy; 2024 Навчальна платформа. Всі права захищено.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .landing-container {
      min-height: 100vh;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
      opacity: 0.9;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 3rem;
      color: #333;
    }

    .features-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      height: 100%;
      transition: transform 0.2s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
    }

    .feature-card mat-card-content {
      text-align: center;
      padding: 2rem;
    }

    .feature-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #667eea;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    .languages-section {
      padding: 4rem 0;
    }

    .languages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .language-item {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s ease;
    }

    .language-item:hover {
      transform: translateY(-2px);
    }

    .language-item h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .language-item p {
      color: #666;
    }

    .cta-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .footer {
      background: #333;
      color: white;
      padding: 2rem;
      text-align: center;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .features-grid,
      .languages-grid {
        grid-template-columns: 1fr;
      }

      .cta-section h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class LandingComponent {
  private router = inject(Router);

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
