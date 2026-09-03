# 🍽️ TastyBite – Food Order Management System

TastyBite is a full-stack food ordering management system developed using **Spring Boot, React.js, and MySQL**.

The application allows customers to browse food items, manage their cart, place orders, and track their orders. An admin can manage food orders and update order statuses.

## 🚀 Technologies Used

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Spring Security
- Maven
- MySQL

### Frontend
- React.js
- Vite
- JavaScript
- HTML
- CSS
- React Router

### Database
- MySQL

## ✨ Features

### 👤 Customer Features
- User registration
- User login and logout
- Browse food menu
- Browse food categories
- Add food items to cart
- Increase or decrease cart quantity
- Remove items from cart
- Place orders
- View previous orders
- Track order status
- Contact Us page

### 👨‍💼 Admin Features
- Admin login
- View all customer orders
- View order details
- Update order status
- Manage order progress

## 📦 Order Status

Orders can move through the following stages:

1. PLACED
2. CONFIRMED
3. PREPARING
4. OUT FOR DELIVERY
5. DELIVERED

## 📁 Project Structure

```text
foodOrderManagement/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── .gitignore