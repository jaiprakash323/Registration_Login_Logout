![image alt](https://github.com/jaiprakash323/Registration_Login_Logout/blob/87502d31907c9e4af848e97ada8670d2be455b5e/image-1.png)
![image alt](https://github.com/jaiprakash323/Registration_Login_Logout/blob/20c46f77cd6dad63d722c0808de1aea4865c001d/image-2.png)
![image alt](https://github.com/jaiprakash323/Registration_Login_Logout/blob/dde2d89e258015b60e1cc31f16c4a2f963921f81/image-3.png)
# INSTALLATION
--> python -m venv myenv
--> .\myenv\Scripts\activate.ps1
--> pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt
--> pip install django-cors-headers
# setting.py
INSTALLED_APPS = [
    'rest_frame_work',
    'myapp',
    'corsheaders',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_ALL_ORIGINS = True
# BACKEND 
--> django-admin startproject backend
--> cd backend
--> python manage.py startapp myaap
--> python manage.py createsuperuser
--> python manage.py runserver
# FRONTEND
--> npm create vite@latest myapp
--> cd myapp
--> npm install
--> npm run dev # to start
# FRONTEND
--> npx create-react-app myapp
--> cd myapp
--> npm start
