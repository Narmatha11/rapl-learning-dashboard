import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalCourses = 0;
  completedCourses = 0;
  inProgressCourses = 0;
  notStartedCourses = 0;

  learningProgress = 0;

  currentCourse: Course | undefined;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.courseService.getCourses().subscribe({
      next: (courses: Course[]) => {

        // Total courses
        this.totalCourses = courses.length;

        // Completed courses
        this.completedCourses = courses.filter(
          (course: Course) => course.status === 'Completed'
        ).length;

        // In Progress courses
        this.inProgressCourses = courses.filter(
          (course: Course) => course.status === 'In Progress'
        ).length;

        // Not Started courses
        this.notStartedCourses = courses.filter(
          (course: Course) => course.status === 'Not Started'
        ).length;

        // Calculate learning progress
        this.calculateProgress();

        // Get current course
        this.currentCourse = courses.find(
          (course: Course) => course.status === 'In Progress'
        );
      },

      error: (error) => {
        console.error('Failed to load courses:', error);
      }
    });
  }

  private calculateProgress(): void {
    if (this.totalCourses === 0) {
      this.learningProgress = 0;
      return;
    }

    this.learningProgress = Math.round(
      (this.completedCourses / this.totalCourses) * 100
    );
  }
}