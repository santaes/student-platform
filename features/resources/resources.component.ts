import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { Resource } from '../../shared/models/index';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="resources-container">
      <div class="resources-header">
        <h1>Навчальні матеріали</h1>
        <p>Завантажуйте корисні ресурси для навчання</p>
      </div>

      <div class="search-section">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Пошук ресурсів</mat-label>
          <input matInput 
                 placeholder="Введіть назву або категорію..." 
                 [formControl]="searchControl"
                 (input)="onSearchChange($event)">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      @if (isLoading()) {
        <app-loading-spinner message="Завантаження ресурсів..." />
      } @else if (filteredResources().length > 0) {
        <div class="resources-grid">
          @for (resource of filteredResources(); track resource.id) {
            <mat-card class="resource-card">
              <mat-card-header>
                <mat-card-title class="resource-title">
                  <mat-icon class="resource-icon">{{ getResourceIcon(resource.category) }}</mat-icon>
                  {{ resource.title }}
                </mat-card-title>
                <mat-chip class="category-chip">{{ resource.category }}</mat-chip>
              </mat-card-header>
              
              <mat-card-content>
                <p class="resource-description">{{ resource.description }}</p>
                
                <div class="resource-meta">
                  <div class="file-info">
                    <mat-icon>insert_drive_file</mat-icon>
                    <span>{{ resource.originalName || resource.fileName }}</span>
                  </div>
                  
                  <div class="file-size">
                    <mat-icon>storage</mat-icon>
                    <span>{{ formatFileSize(resource.fileSize) }}</span>
                  </div>
                  
                  <div class="download-count">
                    <mat-icon>download</mat-icon>
                    <span>{{ resource.downloadCount || 0 }} завантажень</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions align="end">
                <button mat-stroked-button (click)="previewResource(resource)">
                  <mat-icon>visibility</mat-icon>
                  Переглянути
                </button>
                <button mat-raised-button color="primary" (click)="downloadResource(resource)">
                  <mat-icon>download</mat-icon>
                  Завантажити
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      } @else {
        <app-empty-state 
          icon="folder"
          title="Немає ресурсів"
          description="Наразі немає доступних навчальних матеріалів"
          actionText="Оновити"
          [actionCallback]="() => loadResources()" />
      }
    </div>
  `,
  styles: [`
    .resources-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .resources-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .resources-header h1 {
      font-size: 2.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .resources-header p {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .search-section {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .search-field {
      min-width: 400px;
      max-width: 600px;
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .resource-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .resource-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .resource-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .resource-icon {
      font-size: 1.5rem;
      color: #666;
    }

    .category-chip {
      background: #e3f2fd;
      color: #1976d2;
    }

    .resource-description {
      margin-bottom: 1rem;
      color: #666;
      line-height: 1.5;
    }

    .resource-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .file-info,
    .file-size,
    .download-count {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .resources-container {
        padding: 1rem;
      }

      .resources-grid {
        grid-template-columns: 1fr;
      }

      .resources-header h1 {
        font-size: 2rem;
      }

      .search-section {
        flex-direction: column;
        align-items: center;
      }

      .search-field {
        width: 100%;
        max-width: none;
      }
    }
  `]
})
export class ResourcesComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  resources = signal<Resource[]>([]);
  searchControl = new FormControl('');
  isLoading = signal(true);

  currentUser = computed(() => this.authService.getCurrentUser());

  filteredResources = computed(() => {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    const allResources = this.resources();
    
    if (!searchTerm) {
      return allResources;
    }
    
    return allResources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm)
    );
  });

  constructor() {
    this.loadResources();
  }

  loadResources(): void {
    this.isLoading.set(true);
    
    this.apiService.getResources().subscribe({
      next: (resources) => {
        this.resources.set(resources);
        this.isLoading.set(false);
      },
      error: () => {
        console.error('Failed to load resources');
        this.isLoading.set(false);
      }
    });
  }

  onSearchChange(event: any): void {
    // The form control will automatically update the computed property
  }

  getResourceIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'video':
        return 'videocam';
      case 'audio':
        return 'audio_file';
      case 'document':
        return 'description';
      case 'image':
        return 'image';
      case 'ukrainian':
        return 'flag';
      case 'spanish':
        return 'language';
      case 'словарники':
        return 'book';
      default:
        return 'folder';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  downloadResource(resource: Resource): void {
    console.log('Download resource:', resource.title);
    
    // Use the ApiService to make an authenticated request
    const fileName = resource.fileName || resource.originalName || resource.title || 'unknown-file';
    this.apiService.downloadFile(fileName).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resource.originalName || resource.title;
        link.target = '_blank';
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
        
        // Increment download count locally
        const updatedResources = this.resources().map(r =>
          r.id === resource.id
            ? { ...r, downloadCount: (r.downloadCount || 0) + 1 }
            : r
        );
        this.resources.set(updatedResources);
      },
      error: (error: any) => {
        console.error('Error downloading resource:', error);
        // Fallback to direct link if API call fails
        const fallbackUrl = resource.fileUrl || resource.downloadUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        const link = document.createElement('a');
        link.href = fallbackUrl;
        link.download = resource.originalName || resource.title;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Still increment download count on fallback
        const updatedResources = this.resources().map(r =>
          r.id === resource.id
            ? { ...r, downloadCount: (r.downloadCount || 0) + 1 }
            : r
        );
        this.resources.set(updatedResources);
      }
    });
  }

  previewResource(resource: Resource): void {
    console.log('Preview resource:', resource.title);
    // In a real app, this would open a preview modal or navigate to a preview page
    // For now, we'll just open the file if it's a previewable type
    if (resource.fileType === 'pdf' || resource.fileType === 'image') {
      window.open(resource.downloadUrl, '_blank');
    }
  }
}
