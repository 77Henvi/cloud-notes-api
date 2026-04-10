Cloud Notes API

🚀 Live URL
https://cloud-notes-api-qeyj.onrender.com

 📌 Features
- User Authentication (JWT)
- Create, Read, Update, Delete Notes
- Protected Routes
- Multi-user support

🛠 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT

🔐 API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Notes
GET /api/notes  
POST /api/notes  
PUT /api/notes/:id  
DELETE /api/notes/:id  

⚙️ Environment Variables

- MONGO_URI
- JWT_SECRET

## 📦 Run Locally

```bash
npm install
node server.js
