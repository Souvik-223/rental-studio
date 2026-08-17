<div align="center">

# 🏡 Rental Studio

**A modern, full-stack rental accommodation & property booking platform.**  
Discover, list, and book studio stays seamlessly with flexible pricing, dynamic calendar calculations, and real-time property management.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.18.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📖 Overview

**Rental Studio** is an end-to-end web application inspired by modern hospitality platforms like Airbnb. It bridges property hosts and travelers by providing a streamlined ecosystem to showcase places, manage amenities, upload high-resolution galleries, and reserve stays with instant pricing calculations.

---

## ⚙️ Tech Stack

### **Frontend**
- **React 18** – Dynamic and responsive user interface
- **Vite** – Next-generation fast frontend tooling & bundler
- **React Router DOM (v6)** – Client-side routing and navigation
- **Tailwind CSS** – Utility-first modern responsive styling
- **Axios** – HTTP client with credentials and session support
- **Date-fns** – Lightweight date manipulation and calendar calculations
- **React Hot Toast** – Interactive notification toasts

### **Backend**
- **Node.js & Express.js** – RESTful API architecture
- **MongoDB & Mongoose** – NoSQL database modeling and persistent storage
- **JWT (JSON Web Tokens)** – Secure token-based authentication with HTTP-only cookies
- **Bcrypt.js** – Salted password encryption
- **Multer** – Multi-part form data handler for file uploads
- **Image Downloader** – Automated remote image fetching via URL links
- **CORS & Dotenv** – Cross-origin security and environment variable management

---

## 🎯 Features

- 🔐 **Authentication & User Sessions** – Secure signup, login, and protected user profiles powered by JWT and encrypted passwords.
- 🏡 **Property Discovery & Exploration** – Browse available stays with high-quality photo previews, location tags, and pricing.
- ➕ **Host & List Places** – Complete CRUD workflows for property owners to publish new listings or update existing listings.
- 📸 **Dual Photo Upload System** – Upload images directly from your device storage or paste external image URLs for automatic server download.
- 💵 **Flexible Multi-Tier Pricing** – Configure custom rates per hour, per day, and per month.
- 🛋️ **Comprehensive Perks & Amenities** – Highlight amenities including WiFi, Free Parking, TV, Furnished, Pets Allowed, Private Entrance, 24x7 Electricity, Nearby Library/School/Hospital/Park, and Security.
- 📅 **Dynamic Date & Price Calculator** – Automated stay duration computation and total booking expense calculation using `date-fns`.
- 🛎️ **Booking & Reservation Management** – Track reserved stays, review check-in/check-out dates, guest counts, and pricing summaries.
- 📱 **Fully Responsive Design** – Mobile-first, sleek UI built with Tailwind CSS.

---

## 🏗️ Project Architecture

```plaintext
rental-studio/
├── Client/                     # Frontend Application (React + Vite + Tailwind)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── Components/         # Layouts, Navigation, Auth, & Property Details
│   │   │   ├── AccountSubComponents/   # Bookings, Sell Property, Place Form, Perks
│   │   │   ├── Placedetailscomponents/ # Place Details, Booked Place, Booking Operations
│   │   │   ├── Header.jsx      # Top navigation with user dropdown
│   │   │   └── IndexPage.jsx   # Home feed displaying all rental places
│   │   ├── context/            # User Authentication Context Provider
│   │   ├── App.jsx             # Route definitions & global configs
│   │   └── main.jsx            # Application entry point
│   ├── package.json
│   └── vite.config.js
│
└── Server/                     # Backend Application (Node.js + Express + MongoDB)
    ├── modals/                 # Mongoose Schemas (User, Place, Booking)
    ├── uploads/                # Static storage for uploaded property images
    ├── index.js                # Express server & API route endpoints
    └── package.json
```

---

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

### 1. **Clone the repository:**

```bash
git clone https://github.com/Souvik-223/rental-studio.git
cd rental-studio
```

---

### 2. **Backend Setup:**

1. Navigate to the `Server` directory:
   ```bash
   cd Server
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside the `Server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   > The server will start running on `http://localhost:5000`.

---

### 3. **Frontend Setup:**

1. Open a new terminal window and navigate to the `Client` directory:
   ```bash
   cd Client
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` (or `.env.local`) file inside the `Client` directory:
   ```env
   VITE_URL=http://localhost:5000
   VITE_DataURL=http://localhost:5000/uploads/
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > Open `http://localhost:5173` in your browser to view the application.

---

## 🧪 Demo Account (For Testing)

You can explore the app quickly using the demo credentials below:

```plaintext
Email:    tester@test.com
Password: Tester
```

> 💡 *Use this account to test property listing, image uploads, amenities configuration, and booking reservations without signing up.*

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/signup` | Register a new user | ❌ |
| `POST` | `/login` | Authenticate user & issue JWT | ❌ |
| `POST` | `/logout` | Invalidate user session cookie | ❌ |
| `GET` | `/profile` | Fetch logged-in user profile | ✅ |
| `GET` | `/places` | Retrieve all listed properties | ❌ |
| `GET` | `/places/:id` | Get details of a single property | ❌ |
| `POST` | `/places` | Create a new property listing | ✅ |
| `PUT` | `/places` | Update an existing property | ✅ |
| `GET` | `/user-places`| Get properties listed by the logged-in host | ✅ |
| `POST` | `/upload-by-link` | Download & store image from URL | ✅ |
| `POST` | `/upload` | Upload multiple images from local disk | ✅ |
| `POST` | `/booking` | Create a new reservation | ✅ |
| `GET` | `/booking` | List all bookings for the logged-in user | ✅ |

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

<div align="center">
  Crafted with ❤️ by <a href="https://github.com/Souvik-223">Souvik</a>
</div>
