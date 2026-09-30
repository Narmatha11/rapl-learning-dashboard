import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Course, CourseStatus } from '../models/course.model';

interface CourseResponse {
  success: boolean;
  data: Course[];
}

interface SingleCourseResponse {
  success: boolean;
  data: Course;
}

interface ApiResponse {
  success: boolean;
  message: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:5000/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http
      .get<CourseResponse>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http
      .get<SingleCourseResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  addCourse(course: Course): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/${id}`,
      course
    );
  }

  updateCourseStatus(
    id: number,
    status: CourseStatus
  ): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }

  deleteCourse(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}