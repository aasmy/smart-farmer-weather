# 🌱 Smart Agricultural Advisor

A smart weather-based agricultural assistant that helps farmers and hobbyists get tailored crop recommendations based on their local climate conditions - without requiring user login or database storage.

---

## 🚀 Project Overview

**Smart Agricultural Advisor** is a lightweight, privacy-respecting Node.js web application that provides users with real-time weather-based agricultural recommendations. Users can either allow the browser to detect their current location or manually enter their city and crop of interest. Based on that input, the app generates meaningful, AI-enhanced guidance for crop management.

The application is ideal for farmers, students, and agricultural advisors who want quick, intelligent, and context-aware advice — without jumping through hoops or creating accounts.

---

## 🛠️ Key Features

### ✅ No Login Required: Session-Based Storage
Unlike many modern apps that rely on persistent databases and user accounts, our app uses **server-side sessions** to temporarily store user inputs (city, crop, notes). This ensures:
- Simplicity for the user
- No need for registration or authentication
- A lightweight and secure experience
- Data resets upon session expiry (no long-term storage)

### 🌦️ Weather-Based Recommendations
We fetch real-time weather data based on either:
- The **user's geolocation** (via browser `navigator.geolocation` API), or
- A **manually entered city**

This weather data is then used to generate AI-based agricultural advice tailored to the specific crop and local conditions (temperature, humidity, wind speed, etc).

### ✍️ User Notes Under Recommendations
Users can write their own observations or notes alongside the AI-generated recommendation. These are:
- Displayed directly under the recommendation
- Editable **in-place** inside the same card
- Automatically saved using the same session logic

### 🧠 AI Integration (Gemini API)
Crop recommendations are intelligently generated through integration with an AI model (Gemini API). The system factors in:
- Crop type
- Weather conditions
- User notes (as context)

This leads to rich, context-aware recommendations for each situation.

### 🧩 Modular UI Using EJS + Bootstrap
The interface is built using:
- **EJS** for dynamic rendering
- **Bootstrap** for responsive layout and clean styling

Each recommendation card includes:
- Crop and city info
- Weather snapshot
- Generated AI tip
- Optional user note
- Inline editing functionality

---

## 🧑‍💻 Tech Stack

| Layer           | Tools Used                |
|----------------|---------------------------|
| Backend        | Node.js, Express.js       |
| Frontend       | EJS, Bootstrap 5          |
| Weather API    | OpenWeatherMap API        |
| AI Engine      | Gemini API (Google AI)    |
| Data Storage   | Server-side Sessions only |
| Deployment     | Render.com (optional)     |

---

## 📦 Current Functionality Summary

- [x] Geolocation-based weather fetch
- [x] Manual city and crop entry
- [x] Smart recommendations via AI
- [x] Editable user notes per crop
- [x] No login, no registration
- [x] Sessions for temporary state tracking
- [x] Clean, responsive UI
- [x] Graceful handling of missing input

---

## 📝 Future Enhancements

- 📷 **Image-based crop detection** (Placeholder button ready)
- 🧠 **Offline caching for field use**
- 🧪 **Soil condition integration**
- 🌐 **Multi-language support**

---

## 🗒️ NOTES:

- 🌾 **AI Image Integration Planned**  
  A placeholder button has been added for future implementation of AI-based crop recognition from uploaded or captured images.

- ⚙️ **This is an MVP (Minimum Viable Product)**  
  The current build includes the **core concept** and primary **feature set** of the project. Key logic such as AI-generated recommendations, session-based user tracking, and dynamic form handling has been fully implemented.

- 🧩 **Modular Expansion Underway**  
  Core functionality is separated cleanly to allow future enhancements — including soil condition support, offline caching, and advanced analytics — without needing structural overhaul.

- 📖 **“Farming Diary” Navbar Page Implemented**  
  A dedicated **Farming Diary** page has been added to the navigation bar. This page handles the user’s crop-specific notes in a persistent yet lightweight manner via session-based storage.

---


## ✨ Demo

 live link

---

## 🤝 Author

- **Abdullah Asmy ** – Developer, Designer, Product Vision  
  [LinkedIn](https://www.linkedin.com/in/aasmy/)

