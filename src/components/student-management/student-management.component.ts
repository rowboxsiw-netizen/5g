
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class StudentManagementComponent {
  studentService = inject(StudentService);

  isModalOpen = signal(false);
  isEditMode = signal(false);
  
  currentStudent = signal<Student | Omit<Student, 'id' | 'photoUrl'>>({
    name: '',
    enrollmentNumber: '',
    course: '',
    year: 1,
    email: '',
    phone: '',
    dateOfBirth: ''
  });

  openAddModal(): void {
    this.isEditMode.set(false);
    this.currentStudent.set({
      name: '',
      enrollmentNumber: '',
      course: '',
      year: 1,
      email: '',
      phone: '',
      dateOfBirth: ''
    });
    this.isModalOpen.set(true);
  }

  openEditModal(student: Student): void {
    this.isEditMode.set(true);
    this.currentStudent.set({...student});
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  async saveStudent(): Promise<void> {
    if (this.isEditMode()) {
      await this.studentService.updateStudent(this.currentStudent() as Student);
    } else {
      await this.studentService.addStudent(this.currentStudent() as Omit<Student, 'id' | 'photoUrl'>);
    }
    this.closeModal();
  }

  async deleteStudent(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this student?')) {
      await this.studentService.deleteStudent(id);
    }
  }

  isStudent(student: Student | Omit<Student, 'id' | 'photoUrl'>): student is Student {
    return 'id' in student;
  }
}
