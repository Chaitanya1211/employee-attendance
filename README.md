# Employee Attendance and Bug Management Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Roles](#roles)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

## Project Overview
This project is designed to monitor the attendance of employees using face recognition technology and manage project-related bugs. The platform allows administrators to invite employees to register, assign roles, and manage projects. Employees can register using an invitation link, set up their profile, and register their face using the face API. Attendance is marked by face recognition. The platform supports three roles: Developer, QA/Tester, and Intern. 

## Features
- **Employee Registration**: Employees can register using an invitation sent by the admin, specifying their role.
- **Node mailer** : Node mailer is used to send invite links to the employees.
- **Face Recognition Attendance**: Employees register their face during the sign-up process and mark their attendance using face recognition.
- **Clodinary** : Clodinary is used to store the images of bugs and employee profile
- **Bug Management**: Admins can create projects, and QA/Testers can raise and assign bugs to employees. Employees can update the status and priority of bugs.
- **Bug Sorting and Filtering**: Employees can sort and filter bugs based on priority, assigned status, and more.

## Roles
- **Developer**: Can view and update bugs assigned to them.
- **QA/Tester**: Can raise bugs for specific projects and assign them to employees.
- **Intern**: Can view bugs and update their status.

## Setup Instructions

### Backend Setup
1. **Clone the Repository**: Navigate to the server folder
     ```bash
     cd ./server
3. **Install Dependencies**:
      ```bash
      npm install
4. **Setup Environment Variables**: Create a .env file in the backend directory and add your configuration details.
      ```bash
      PORT="8080"
      DB_URL="Mongodb connection string"
      SECRET_KEY = "Random 64 bit key for Employee JWT Token"
      ADMIN_SECRET_KEY = "Random 64 bit key for Admin JWT Token"
      EMAIL="Email id for sending mail via node mailer"
      PASSWORD="App password for the email"
      CLOUD_NAME="Cloud name for cloudinary"
      API_KEY="API key of cloudinary"
      API_SECRET="API secret key for clodinary"
5. **Start the server** : Start the server
     ```bash
      npm start

### Frontend Setup
1. **Clone the repository**: Navigate to front folder
   ```bash
   cd ./front
2. **Install Dependencies**:
   ```bash
   npm install
3. **Start the frontend**
   ```bash
   npm run dev

## Usage
1. **Admin Panel**: Admins can log in to send invitations, create projects, and manage employees.
2. **Employee Registration**: Employees receive an invitation email, register by filling in their details, and register their face using the face API.
3. **Attendance Marking**: Employees log in and mark their attendance by capturing a picture for face recognition.
4. **Bug Management**: QA/Testers can raise bugs and assign them to employees. Employees can update the status of the bugs and filter them based on priority and assignment.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Face Recognition**: Face API
- **Authentication**: JWT

## Important Points
-- **Create a admin via postman**
You will have to create admin credentials for admin via Postman as the page for new admin registration is not available

  ```bash
  API Endpoint : http://localhost:8080/admin/register
  API Type : POST
  Request Body : {
    "email" : "admin_email",
    "password" : "admin_password"
  }

-- **URL for front end**
  ```bash
  Admin login : http://localhost:5173/admin/login
  Employee Login : http://localhost:5173/login
