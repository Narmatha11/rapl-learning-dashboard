import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-details',
  imports: [RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {

  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCourse();
  }

  private loadCourse(): void {

    const courseId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.course = this.courseService.getCourseById(courseId);

    if (!this.course) {
      this.router.navigate(['/courses']);
    }
  }

  startCourse(): void {

    if (!this.course) {
      return;
    }

    this.courseService.updateCourseStatus(
      this.course.id,
      'In Progress'
    );

    this.course = {
      ...this.course,
      status: 'In Progress'
    };
  }

  getStatusClass(): string {

    if (!this.course) {
      return '';
    }

    switch (this.course.status) {

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