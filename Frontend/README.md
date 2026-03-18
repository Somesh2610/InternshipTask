# 🚀 Armatrix Team Page

A full-stack Team Management Web Application built using Next.js (frontend), FastAPI (backend), and MongoDB (database).  
This project allows users to view team members and provides an admin panel to manage them.

---

## 🌐 Live Demo

- Frontend: (Add your Vercel link here)  
- Backend API: (Add your Render link here)  

---

## 📌 Features

### 👥 User Features
- View all team members
- Clean and responsive UI
- Search team members by name
- View detailed profile popup
- Conditional rendering (LinkedIn, Email, Resume)

### 🔐 Admin Features
- Secure admin login (basic)
- Add new team members
- Edit existing members
- Delete members
- Image upload with preview (base64)

---

## 🛠️ Tech Stack

### Frontend
- Next.js (React)
- Tailwind CSS
- React Icons

### Backend
- FastAPI (Python)
- REST API

### Database
- MongoDB Atlas

### Deployment
- Frontend → Vercel  
- Backend → Render  

---

## ⚙️ Project Structure

Frontend (Next.js)
```
app/
  page.js
components/
styles/
```

Backend (FastAPI)
```
main.py
MongoDB Database
```

---

## 🔗 API Endpoints

| Method | Endpoint        | Description              |
|--------|---------------|--------------------------|
| GET    | /team         | Get all members          |
| POST   | /team         | Add new member           |
| PUT    | /team/{id}    | Update member            |
| DELETE | /team/{id}    | Delete member            |

---

## 🧠 Key Concepts Used

- Full-stack integration (Frontend ↔ Backend ↔ Database)
- REST API design
- React state management (useState, useEffect)
- Conditional rendering
- File handling (image upload)
- Deployment and hosting

---

## ⚠️ Known Limitations

- Admin password is stored in frontend (not secure for production)
- No proper authentication (JWT not implemented)
- Images stored as base64 (can be optimized)

---

## 🚀 Future Improvements

- Add JWT-based authentication
- Store images using Cloudinary / AWS S3
- Add pagination for large datasets
- Improve error handling and user feedback
- Add rate limiting for security

---

## 🧑‍💻 Author

Somesh Pradeep Huljute  
BITS Pilani – Electronics & Communication  

---

## 💡 Note

This project was built as part of an internship assignment and demonstrates full-stack development, deployment, and problem-solving skills.