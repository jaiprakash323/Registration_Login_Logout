# Task App - Full Stack Application

A task management application with JWT authentication, CRUD operations, and responsive UI for mobile, tablet, and desktop screens.

![image alt](https://github.com/jaiprakash323/Registration_Login_Logout/blob/87502d31907c9e4af848e97ada8670d2be455b5e/image-1.png)
![image alt](https://github.com/jaiprakash323/Registration_Login_Logout/blob/20c46f77cd6dad63d722c0808de1aea4865c001d/image-2.png)
![image alt](https://github.com/jaiprakash323/Registration_Login_Logout/blob/dde2d89e258015b60e1cc31f16c4a2f963921f81/image-3.png)

## Setup Instructions

### Backend
1. Navigate to `my-project/backend/`.
2. Set up database credentials in `settings.py`.
3. Run migrations: `python manage.py migrate`.
4. Create superuser: `python manage.py createsuperuser`.
5. Start development server: `python manage.py runserver`.

### Frontend
1. Navigate to `my-project/frontend/`.
2. Install dependencies: `npm install`.
3. Start React dev server: `npm start`.

## Tech Stack
- **Backend**: Django, Django REST Framework (DRF), SimpleJWT, PostgreSQL / SQLite
- **Frontend**: React, Axios, React Router, Responsive CSS
- **Authentication**: JWT with access & refresh tokens

## Key Features
- **User Authentication**: Secure registration and login flow with input validation.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Responsive Layout**: Full support for mobile, tablet, and desktop screens.
