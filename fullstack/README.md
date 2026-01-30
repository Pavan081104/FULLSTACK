# Full Stack Web Application – Landing Page & Admin Panel

A complete full-stack web application with a public landing page and secure admin panel for managing dynamic content. Built with Flask backend, SQLite database, and Bootstrap frontend.

## 🎯 Project Overview

This project demonstrates a real-world full-stack development workflow with:
- **Landing Page**: Dynamic project showcase, client testimonials, contact form, and newsletter subscription
- **Admin Panel**: Manage projects, clients, view contact submissions, and track newsletter subscribers
- **Backend API**: RESTful Flask API with SQLAlchemy ORM
- **Database**: SQLite with clean data models
- **Frontend**: Responsive HTML/CSS/JavaScript with Bootstrap

## 🔹 Technologies Used

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript (Vanilla)
- **Backend**: Flask 2.3.2, Flask-SQLAlchemy 3.0.5, Flask-CORS 4.0.0
- **Database**: SQLite
- **Version Control**: Git & GitHub
- **Development**: Python 3.8+

## 🔹 Features Implemented

### Landing Page
✅ Dynamic "Our Projects" section  
✅ Dynamic "Happy Clients" testimonials section  
✅ Functional contact form with email validation  
✅ Newsletter subscription feature  
✅ Responsive design  
✅ Smooth navigation  

### Admin Panel
✅ Add and manage projects (CRUD operations)  
✅ Add and manage clients (CRUD operations)  
✅ View all contact form submissions  
✅ View and manage newsletter subscribers  
✅ Clean and intuitive UI  
✅ Real-time data updates  

## 📁 Project Structure

```
fullstack/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app initialization
│   │   ├── models.py             # Database models
│   │   ├── routes.py             # API endpoints
│   │   ├── static/               # Backend static files
│   │   └── templates/            # Backend templates
│   ├── run.py                    # Flask server entry point
│   └── requirements.txt           # Python dependencies
│
├── frontend/
│   ├── index.html                # Landing page
│   ├── admin.html                # Admin panel
│   └── assets/
│       ├── css/
│       │   ├── style.css         # Landing page styles
│       │   └── admin.css         # Admin panel styles
│       └── js/
│           ├── app.js            # Landing page scripts
│           └── admin.js          # Admin panel scripts
│
├── .gitignore
└── README.md
```

## 🚀 Steps to Run the Project Locally

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- A modern web browser

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fullstack
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   ```

4. **Activate virtual environment**
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`

5. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

6. **Run the backend server**
   ```bash
   python run.py
   ```
   
   The backend will start at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Serve the frontend** (use a simple HTTP server)
   - **Using Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - **Using Node.js (if installed)**:
     ```bash
     npx http-server
     ```

3. **Open in browser**
   - Landing Page: `http://localhost:8000`
   - Admin Panel: `http://localhost:8000/admin.html`

⚠️ **Important**: Ensure the backend server is running on port 5000 for the frontend API calls to work correctly.

## 📡 API Documentation

### Public API Endpoints

#### Projects
- `GET /api/projects` - Get all projects
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter

#### Clients
- `GET /api/clients` - Get all client testimonials

### Admin API Endpoints

#### Projects
- `GET /admin/api/projects` - Get all projects
- `POST /admin/api/projects` - Create project
- `PUT /admin/api/projects/<id>` - Update project
- `DELETE /admin/api/projects/<id>` - Delete project

#### Clients
- `GET /admin/api/clients` - Get all clients
- `POST /admin/api/clients` - Create client
- `PUT /admin/api/clients/<id>` - Update client
- `DELETE /admin/api/clients/<id>` - Delete client

#### Contact Submissions
- `GET /admin/api/contact-submissions` - Get all submissions
- `DELETE /admin/api/contact-submissions/<id>` - Delete submission

#### Newsletter
- `GET /admin/api/newsletter-subscribers` - Get all subscribers
- `DELETE /admin/api/newsletter-subscribers/<id>` - Remove subscriber

## 💾 Database Models

### Project
- `id` - Primary key
- `title` - Project title
- `description` - Project description
- `image_url` - Project image URL
- `link` - Project link
- `created_at` - Creation timestamp

### Client
- `id` - Primary key
- `name` - Client name
- `testimonial` - Client testimonial
- `image_url` - Client image URL
- `rating` - Star rating (1-5)
- `created_at` - Creation timestamp

### ContactForm
- `id` - Primary key
- `name` - Sender name
- `email` - Sender email
- `message` - Message content
- `created_at` - Submission timestamp

### Newsletter
- `id` - Primary key
- `email` - Subscriber email
- `subscribed_at` - Subscription timestamp

## 🔐 Features & Best Practices

✅ Clean code architecture  
✅ RESTful API design  
✅ CORS enabled for cross-origin requests  
✅ Proper error handling  
✅ Data validation  
✅ Responsive UI/UX  
✅ Scalable database design  
✅ Easy to extend and modify  

## 📝 Notes

- This project uses SQLite for local development. For production, consider using PostgreSQL or MySQL.
- API calls are made from the frontend to `http://localhost:5000`. Update the API URL in `app.js` and `admin.js` if your backend runs on a different port.
- Images are stored as URLs. To support image uploads, integrate a service like Cloudinary or AWS S3.
- For deployment, consider platforms like Render (backend) and Netlify/Vercel (frontend).

## 🚀 Deployment

### Backend Deployment (Render)
1. Create a Render account
2. Connect your GitHub repository
3. Set up a new Web Service with Python 3.11
4. Add environment variables if needed
5. Deploy!

### Frontend Deployment (Netlify)
1. Create a Netlify account
2. Connect your GitHub repository
3. Set build command to skip (static files only)
4. Update API URL in `app.js` and `admin.js` to your live backend URL
5. Deploy!

## 📧 Contact

For questions or suggestions, please reach out via the contact form on the landing page.

---

**Created**: January 2026  
**License**: MIT  
**Author**: Your Name
