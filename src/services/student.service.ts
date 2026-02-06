
import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, push, remove, update } from 'firebase/database';
import { firebaseConfig } from '../firebase.config';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly db;
  private readonly studentsRef;

  students = signal<Student[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
    this.studentsRef = ref(this.db, 'students');
    this.fetchStudents();
  }

  async fetchStudents(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const snapshot = await get(this.studentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const studentsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          photoUrl: data[key].photoUrl || `https://i.pravatar.cc/150?u=${key}`
        }));
        this.students.set(studentsArray);
      } else {
        this.students.set([]);
      }
    } catch (err: any) {
      this.error.set('Failed to fetch students. Please try again later.');
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  async addStudent(studentData: Omit<Student, 'id' | 'photoUrl'>): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const newStudentRef = push(this.studentsRef);
      const newStudent: Omit<Student, 'id'> = {
        ...studentData,
        photoUrl: `https://i.pravatar.cc/150?u=${newStudentRef.key}`
      };
      await set(newStudentRef, newStudent);
      await this.fetchStudents(); // Refresh the list
    } catch (err: any) {
       this.error.set('Failed to add student.');
       console.error(err);
       this.isLoading.set(false);
    }
  }

  async updateStudent(student: Student): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const studentRef = ref(this.db, `students/${student.id}`);
      const { id, ...studentData } = student;
      await update(studentRef, studentData);
      await this.fetchStudents(); // Refresh the list
    } catch (err: any) {
      this.error.set('Failed to update student.');
      console.error(err);
      this.isLoading.set(false);
    }
  }

  async deleteStudent(id: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const studentRef = ref(this.db, `students/${id}`);
      await remove(studentRef);
      await this.fetchStudents(); // Refresh the list
    } catch (err: any) {
      this.error.set('Failed to delete student.');
      console.error(err);
      this.isLoading.set(false);
    }
  }
}
