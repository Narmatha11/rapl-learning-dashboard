import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-dashboard',
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
    const courses = this.courseService.getCourses();

    this.totalCourses = courses.length;

    this.completedCourses = courses.filter(
      course => course.status === 'Completed'
    ).length;

    this.inProgressCourses = courses.filter(
      course => course.status === 'In Progress'
    ).length;

    this.notStartedCourses = courses.filter(
      course => course.status === 'Not Started'
    ).length;

    this.calculateProgress();

    this.currentCourse = courses.find(
      course => course.status === 'In Progress'
    );
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