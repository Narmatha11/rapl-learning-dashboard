
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { Course, CourseStatus } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses: Course[] = [];
  filteredCourses: Course[] = [];

  searchText = '';
  selectedStatus: 'All' | CourseStatus = 'All';
  sortOrder: 'asc' | 'desc' = 'asc';
  loading = true;
  errorMessage = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.loading = true;
    this.errorMessage = '';

    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load courses:', error);
        this.courses = [];
        this.filteredCourses = [];
        this.errorMessage = 'Unable to load courses. Please try again.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.courses];

    const search = this.searchText.trim().toLowerCase();

    if (search) {
      result = result.filter(course =>
        (course.name || '').toLowerCase().includes(search) ||
        (course.description || '').toLowerCase().includes(search)
      );
    }

    if (this.selectedStatus !== 'All') {
      result = result.filter(
        course => course.status === this.selectedStatus
      );
    }

    result.sort((courseA, courseB) => {
      const nameA = courseA.name.toLowerCase();
      const nameB = courseB.name.toLowerCase();

      return this.sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    this.filteredCourses = result;
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.sortOrder = 'asc';

    this.applyFilters();
  }

  getStatusClass(status: CourseStatus): string {
    switch (status) {
      case 'Completed':
        return 'completed';

      case 'In Progress':
        return 'in-progress';

      case 'Not Started':
        return 'not-started';

      default:
        return '';
    }
  }
}
