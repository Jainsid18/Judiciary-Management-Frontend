# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# ⚖️ Judiciary Management System - Frontend

A modern React-based frontend for the Judiciary Management System. This application provides role-based access for Citizens, Judges, and Administrators to manage court cases, hearings, documents, and notifications.

## 🚀 Features

### Authentication

* User Registration
* Secure Login using JWT Authentication
* Role-Based Access Control

### Citizen Features

* File New Cases
* View Own Cases
* Upload Documents
* Track Case Status
* Receive Notifications

### Judge Features

* View Assigned Cases
* Schedule Hearings
* Review Documents
* Issue Verdicts
* Receive Notifications

### Admin Features

* View All Cases
* Assign Judges to Cases
* Monitor Case Progress

## 🛠️ Tech Stack

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* DaisyUI
* Vite

## 📂 Project Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── ProtectedRoute.jsx
│ ├── RoleProtectedRoute.jsx
│ └── CaseCard.jsx
│
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── Cases.jsx
│ ├── CreateCase.jsx
│ ├── CaseDetails.jsx
│ └── Notifications.jsx
│
├── services/
│ └── api.js
│
└── App.jsx

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Jainsid18/Judiciary-Management-Frontend.git
cd Judiciary-Management-Frontend
```

### Install Dependencies

```bash
npm install
```

### Run Application

```bash
npm run dev
```

Application will start on:

```text
http://localhost:5173
```

## 🔗 Backend Repository

Backend API:

https://github.com/Jainsid18/Judiciary-Management-System

## 📸 Screenshots

Add screenshots of:

* Login Page
* Registration Page
* Case Listing
* Case Details
* Judge Assignment
* Notifications

## 👨‍💻 Author

Siddhant Jain

GitHub:
https://github.com/Jainsid18

## 📜 License

This project is developed for educational and portfolio purposes.
