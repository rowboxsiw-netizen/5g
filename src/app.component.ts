
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';

type ViewType = 'dashboard' | 'students';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    StudentManagementComponent
  ],
})
export class AppComponent {
  currentView = signal<ViewType>('dashboard');

  onNavigate(view: ViewType): void {
    this.currentView.set(view);
  }
}
