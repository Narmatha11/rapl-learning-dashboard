# Debugging Challenge

## Problem

The "Start Course" button does nothing when the user clicks it.

## My Debugging Approach

I would debug the issue step by step from the frontend to the database.

### 1. Check the Button in the HTML

First, I would verify that the Start Course button exists and that the click event is correctly connected.

Example:

```html
<button (click)="startCourse()">
  Start Course
</button>

# Debugging Challenge – Start Course Button

## Problem

The "Start Course" button does nothing when the user clicks it.

## Debugging Approach

I would debug the issue step by step, starting from the Angular frontend and following the request through the backend and database.

### 1. Check the Button HTML

First, I would verify that the button exists and that the click event is correctly connected to the TypeScript method.

Example:

```html
<button (click)="startCourse()">
  Start Course
</button>

I would also check whether the button is disabled or covered by another element.

2. Check the TypeScript Method

Next, I would verify that the startCourse() method is being called.

I can temporarily add:

console.log('Start Course button clicked');

If this message does not appear in the browser console, the problem is likely related to the HTML button or event binding.

3. Check the Course Object

I would verify that the selected course exists and that the course ID is available.

For example:

if (!this.course) {
  return;
}

console.log('Course ID:', this.course.id);

This helps confirm that the correct course is being selected.

4. Check the Browser Console

I would open the browser Developer Tools and check the Console for:

Angular errors
TypeScript errors
Runtime errors
Undefined values
Other JavaScript errors
5. Check the Network Request

If the click event works, I would open the browser Network tab.

The application should send a request similar to:

PATCH /api/courses/:id/status

For example:

PATCH http://localhost:5000/api/courses/1/status

The request body should contain:

{
  "status": "In Progress"
}

I would check:

Request URL
HTTP method
Request body
Response status
Response message
6. Check the Backend Route

I would verify that the Express route exists and is correctly connected to the controller.

Example:

router.patch('/:id/status', updateStatus);

I would also check the Node.js terminal for any backend errors.

7. Check the Controller

The controller should receive the course ID and status and call the appropriate model function.

For example:

const affectedRows = await courseModel.updateCourseStatus(
  id,
  status
);

I would verify that the correct ID and status are being received.

8. Check the Database

I would verify whether MySQL actually updates the course status.

I can run:

SELECT id, name, status
FROM courses;

The selected course should change to:

In Progress
9. Check the Angular UI

After the backend successfully updates the database, Angular should update the displayed course status.

For example:

this.course.status = 'In Progress';

I would verify that the UI reflects the updated status without requiring an unexpected page refresh.

Debugging Flow
Start Course Button
        ↓
Click Event
        ↓
Angular Component
        ↓
HTTP PATCH Request
        ↓
Express Route
        ↓
Controller
        ↓
Course Model
        ↓
MySQL Database
        ↓
API Response
        ↓
Angular UI Update
Possible Causes

The issue could be caused by:

Incorrect click event binding.
The startCourse() method not being called.
Missing or incorrect course ID.
HTTP request not being sent.
Incorrect API URL or HTTP method.
Backend route or controller error.
Database update failure.
Frontend not updating after a successful response.
Conclusion

I would not immediately change the button code without checking the complete flow. I would use the browser console, Network tab, backend logs, and database query to identify the exact layer where the failure occurs.

This approach helps isolate the problem systematically and avoids making unnecessary changes to working code.


