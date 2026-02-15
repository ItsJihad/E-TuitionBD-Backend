# 🖥️ Tuition Management System - Server Side

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_Admin-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## 🔗 Live Links
- **Live Server :** [[ON VERCEL](https://etutorsbd.vercel.app/)]
- **Client :** [[ REPO LINK ](https://github.com/ItsJihad/E-TuitionBD-Frontend)]

## 📖 Project Overview
The **Tuition Management System Server** is a robust REST API built with **Express 5**. It serves as the backbone for the eTuition platform, handling complex data relationships between Students, Tutors, and Admins.

It utilizes **Mongoose** for strict schema modeling and **Firebase Admin SDK** for secure, server-side authentication verification. The system also implements **Stripe** for payment processing and uses advanced aggregation for data analysis.

## ✨ Key Features

### 🔐 Security & Authentication
- **Firebase Admin SDK:** Validates ID tokens sent from the client to ensure requests are authorized.
- **Role-Based Middleware:** Custom middleware verifies if a user is an Admin, Tutor, or Student before granting access to sensitive routes.
- **Environment Security:** `dotenv` is used to secure MongoDB URI, Stripe Secret, and Firebase Credentials.

### 🗄️ Database & Modeling
- **Mongoose Schemas:** Structured data models for Users, Tuitions, and Payments.
- **Advanced Pagination:** Utilizes `mongoose-aggregate-paginate-v2` to handle large datasets efficiently on the dashboard.
- **Aggregation Pipelines:** Complex MongoDB aggregations to calculate total revenue and platform statistics.

### 💳 Financial Integration
- **Stripe Payments:** Generates secure `PaymentIntents` for tuition booking fees.
- **Transaction History:** Stores and retrieves payment records for students and tutors.

## 📦 Dependencies

| Package | Version | Usage |
| :--- | :--- | :--- |
| **express** | `^5.2.1` | The web framework for handling API requests and routing. |
| **mongoose** | `^9.1.2` | Object Data Modeling (ODM) for MongoDB to define schemas. |
| **firebase-admin** | `^13.6.1` | Verifies Firebase Auth tokens server-side for security. |
| **stripe** | `^20.3.1` | Handles payment processing and intents. |
| **mongoose-aggregate-paginate-v2** | `^1.1.4` | Adds pagination capabilities to Mongoose aggregation queries. |
| **cors** | `^2.8.5` | Enables Cross-Origin Resource Sharing for frontend communication. |
| **dotenv** | `^17.2.3` | Loads environment variables from `.env` file. |
| **mongodb** | `^7.0.0` | Native MongoDB driver (underlying dependency). |
| **nodemon** | `^3.1.11` | Development tool for auto-restarting the server on file changes. |

## ⚙️ Environment Variables
To run this project, create a `.env` file in the root directory and add the following keys:

```env
# Database
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# Firebase Admin SDK (Service Account)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
