import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { CourseStatus } from '../../../core/models/course.model';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse {

  courseForm;

  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {

    // Create the form after FormBuilder is available
    this.courseForm = this.formBuilder.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ]
      ],

      duration: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],

      lessons: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],

      status: [
        'Not Started' as CourseStatus,
        Validators.required
      ]

    });
  }


  // Course name
  get name() {
    return this.courseForm.controls.name;
  }


  // Description
  get description() {
    return this.courseForm.controls.description;
  }


  // Duration
  get duration() {
    return this.courseForm.controls.duration;
  }


  // Number of lessons
  get lessons() {
    return this.courseForm.controls.lessons;
  }


  // Status
  get status() {
    return this.courseForm.controls.status;
  }


  // Submit form
  onSubmit(): void {

    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.courseForm.invalid) {

      this.courseForm.markAllAsTouched();

      return;
    }


    const formValue = this.courseForm.getRawValue();


    const newCourse = {

      id: Date.now(),

      name: formValue.name!.trim(),

      description: formValue.description!.trim(),

      duration: Number(formValue.duration),

      lessons: Number(formValue.lessons),

      status: formValue.status as CourseStatus

    };


    // Add course to service
    this.courseService.addCourse(newCourse);


    // Go back to course list
    this.router.navigate(['/courses']);
  }


  // Reset form
  resetForm(): void {

    this.isSubmitted = false;

    this.courseForm.reset({

      name: '',

      description: '',

      duration: null,

      lessons: null,

      status: 'Not Started'

    });

  }

}