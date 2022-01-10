# Routes

## Basics

### `/` — Landing page
### `/privacy` — Privacy policy

## Demo

### `/demo` — Demo page
### `/demo/quantum-basis` — Demo Quantum Basis tutorial page.
### `/demo/quantum-mouse` — Demo Quantum Mouse tutorial page.

## Auth

### `/auth/signin` — Sign in page
### `/auth/verify-request` — Check your email for a sign in link
### `/auth/signout` — Sign out page

## Admin

### `/admin` — Grant or revoke admin/instructor privileges

## Tutorials

These pages need to know:
- the current user
- the current users's course selection vs. "personal exploration mode"
- whether the current use is an instructor (for that course)
- whether the current user is in "instructor preview mode"

### `/tutorials` — List of all available tutorials
### `/tutorials/{tutorialName}` — Tutorial intro page
### `/tutorials/{tutorialName}/{page}` — Tutorial page/pretest/etc.

## Courses

### `/courses`
- List of courses for the logged in user.  For instructors: option to create a new course.
### `/courses/{courseId}`
- List of tutorials for this course.  For instructors: link to admin page.
### `/courses/{courseId}/admin`
- Course admin page for instructors.
- Options to:
  - change display name
  - change list of tutorials
  - add (and remove students)
  - export data.

## API
The user is included in the session for all API requests.

### `/api/tutorial-state?tutorial={tutorialName}&course=({courseId}|NONE)`
- `GET` — load tutorial state for logged in user
- `PUT` — update tutorial state for logged in user
### `/api/courses`
- `GET` — load all courses (just display name, visible tutorials) for logged in user
- `POST` — create new course with given user as instructor
### `/api/courses/{courseId}`
- `GET` — load given course, including instructors
- `PUT` — update course display name, visible tutorials
### `/api/courses/{courseId}/instructors`
- `PUT` — add additional instructors to this course (by email).
### `/api/courses/{courseId}/students`
- `PUT` — add additional students to this course (by email).
### `/api/courses/{courseId}/tutorial-states?tutorial=({tutorialName}|ALL)`
- `GET` — download CSV of tutorial state entries for the given course and tutorial (or optionally all tutorials at once).
### `/api/instructors/{email}`
- `PUT` — Grants the user instructor privileges.  You must be an admin.
- `DELETE` — Revokes instructor privileges from the user.  You must be an admin.
### `/api/admin/{email}`
- `PUT` — Grants the user admin privileges.  You must be an admin.
- `DELETE` — Revokes admin privileges from the user.  You must be an admin, and you cannot revoke privileges from yourself.
