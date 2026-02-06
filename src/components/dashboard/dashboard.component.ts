
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class DashboardComponent {
  private studentService = inject(StudentService);
  
  studentCount = computed(() => this.studentService.students().length);
  isLoading = computed(() => this.studentService.isLoading());

  stats = [
    { label: 'Total Faculty', value: '450', change: '+2.5%', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', color: 'bg-green-500' },
    { label: 'Courses Offered', value: '85', change: '', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5-1.253', color: 'bg-yellow-500' },
    { label: 'Departments', value: '15', change: '', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z', color: 'bg-red-500' }
  ];
}
