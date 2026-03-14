export interface User {
  id: string;
  email: string;
  fullName: string;
  password: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile {
  id: string;
  userId: string;
  enrolledTrack: string;
  currentLevel: number;
  progressPercentage: number;
  upcomingTasks: string[];
  bio?: string;
  avatarUrl?: string;
  updatedAt: Date;
}

export interface Roadmap {
  id: string;
  studentId: string;
  title: string;
  description: string;
  modules: RoadmapModule[];
  overallProgress: number;
  estimatedCompletionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  status: RoadmapItemStatus;
  estimatedCompletionDate: Date;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  status: RoadmapItemStatus;
  estimatedCompletionDate: Date;
  content?: string;
  resources?: Resource[];
  estimatedHours?: number;
}

export enum RoadmapItemStatus {
  Locked = 'locked',
  Available = 'available',
  InProgress = 'in_progress',
  Completed = 'completed'
}

export interface Homework {
  id: string;
  studentId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: HomeworkStatus;
  attachments: HomeworkAttachment[];
  instructorNotes?: string;
  submission?: Submission;
  createdAt: Date;
  updatedAt: Date;
  estimatedHours?: number;
}

export enum HomeworkStatus {
  Pending = 'pending',
  Completed = 'completed',
  Overdue = 'overdue',
  Downloadable = 'downloadable'
}

export interface HomeworkAttachment {
  id: string;
  homeworkId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  downloadUrl: string;
  originalName?: string;
}

export interface Submission {
  id: string;
  homeworkId: string;
  submittedAt: Date;
  textResponse?: string;
  isCompleted: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: number;
  downloadUrl: string;
  fileUrl: string;
  category: string;
  downloadCount?: number;
  fileName?: string;
  originalName?: string;
  mimeType?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthRequest extends LoginRequest {}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface DashboardStats {
  roadmapProgress: number;
  pendingHomeworkCount: number;
  currentLevel: number;
  upcomingTasks: string[];
  recentActivities: RecentActivity[];
}

export interface RecentActivity {
  icon: string;
  description: string;
  date: Date;
}

export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}
