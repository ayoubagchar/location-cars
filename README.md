# Apex Luxury Drive - Modern Full Stack Car Rental Showcase

A high-end, bespoke Full Stack Luxury Car Rental Showcase application. Designed with modern dark obsidian and gold glassmorphic aesthetics, featuring interactive vehicle filtering, direct WhatsApp & phone inquiries, visitor contact requests, and a secure JWT-authenticated Admin Portal for complete fleet management.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Dark Obsidian & Gold Glassmorphism design system)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot 3.2.5 (Java 21)
- **Security**: Spring Security + JWT Authentication (Admin access control)
- **Persistence**: Spring Data JPA + Hibernate
- **Database**: PostgreSQL (Production) / H2 In-Memory (Zero-config local dev)
- **API Documentation**: Springdoc OpenAPI / Swagger UI
- **Image Handling**: File storage service supporting image uploads to `/uploads/cars/`

---

## 🚗 Features

### Public Website
1. **Home Page**:
   - Modern hero banner with custom headline & copy from Agency Settings
   - Quick multi-parameter search bar (Keyword, Brand, Fuel)
   - Featured luxury cars showcase
   - Why choose us section & customer testimonials
   - Concierge contact CTA & footer
2. **Fleet Catalog (`/cars`)**:
   - Live multi-filter drawer (Brand, Price Range Slider, Fuel type, Transmission, Seats count)
   - Search bar by keyword
   - Sorting by Price (Low to High, High to Low), Year, Brand
   - Pagination support
   - Responsive vehicle cards with Availability badges
3. **Car Details Page (`/cars/:id`)**:
   - High-res photo gallery with main display & thumbnail selector
   - Complete technical specifications chips (Fuel, Transmission, Seats, AC, Price)
   - Detailed craft description
   - Direct WhatsApp button (prefilled with vehicle details)
   - Direct Call button
   - Instant Contact Request modal form
4. **About Page (`/about`)**:
   - Company story, vision, key statistics counter
5. **Contact Page (`/contact`)**:
   - Visitor contact form with instant toast notification
   - Direct agency phone, WhatsApp, email, address
   - Interactive Google Maps location display

### Admin Dashboard (`/admin/login`)
- **JWT Authentication**: Secure admin login with auto-fill option for quick testing.
- **Dashboard Overview**:
  - Fleet counters (Total Cars, Available Cars, Rented Cars, Visitor Inquiries)
  - Recent inquiries summary
- **Cars Management (CRUD)**:
  - Add vehicle modal with complete specification fields
  - Edit existing vehicle details
  - Delete vehicle from fleet
  - One-click Availability status toggle (Available <-> Rented)
  - Image Upload support (Upload local image files or provide image URLs)
- **Contact Requests Management**:
  - View visitor messages with timestamp and contact details
  - Mark inquiries as handled/read
  - Delete messages
- **Agency Settings**:
  - Update Agency Name, Phone, WhatsApp number, Email, Showroom Address, and Hero Copy.

---

## 🔑 Default Admin Credentials

- **Email**: `admin@luxurycars.com`
- **Password**: `admin123`

---

## 🚀 How to Run Locally

### 1. Run Backend (Spring Boot)
Requires Java 21 & Maven installed.

```bash
cd backend
mvn spring-boot:run
```
*The backend automatically starts on `http://localhost:8080` with H2 in-memory DB and pre-seeds default admin credentials and 6 luxury demo vehicles.*

- **Swagger API Docs**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **H2 Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:carrentaldb`)

### 2. Run Frontend (React + Vite)
Requires Node.js 18+.

```bash
cd frontend
npm install
npm run dev
```
*The frontend starts on `http://localhost:5173` with automatic API proxying to `http://localhost:8080`.*

---

## 🐳 Docker Deployment

To run the entire stack (PostgreSQL + Spring Boot + NGINX React Frontend) with a single command:

```bash
docker-compose up --build
```

- **Frontend App**: `http://localhost`
- **Backend API**: `http://localhost:8080/api`
- **Swagger Documentation**: `http://localhost:8080/swagger-ui.html`
