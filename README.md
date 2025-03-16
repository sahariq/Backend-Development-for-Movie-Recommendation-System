# Movie Recommendation System - Backend

## Introduction
This is the backend implementation of a **Movie Recommendation System** built using **ExpressJS** and **MongoDB**. Users can browse, rate, review movies, and receive recommendations based on their preferences and similar users' activity. Admins can manage the movie database, moderate reviews, and view site analytics.

## Features
### User Authentication & Profiles
- User registration and login with **JWT authentication**.
- Users can update their profile with preferences (favorite genres, actors, etc.).
- Personal **wishlist** management.

### Movie Database Management
- Admins can **add, update, and delete** movies.
- Movies include details such as **title, genre, director, cast, release date, runtime, synopsis, average rating, and cover photos**.
- Additional sections for **trivia, goofs, and soundtrack information**.
- Detailed profiles for **actors, directors, and crew members**.
- Age ratings and parental guidance information.

### Rating & Review Module
- Users can rate movies (scale of **1 to 5**).
- Users can **write and update reviews**.
- Display **review highlights** for top-rated and most-discussed reviews.

### Recommendation System
- Suggests movies based on **user ratings, favorite genres, and similar user activity**.
- "Similar Titles" section on movie pages.
- "Trending Movies" and "Top Rated Movies" sections based on **current user activity**.

### Watchlist & Custom Lists
- Users can create **custom movie lists** and share them.
- Ability to **follow or save** lists created by others.

### Search & Filtering
- Search movies by **title, genre, director, or actors**.
- Filter by **ratings, popularity, and release year**.
- Advanced filtering: **release decade, country, language, and keywords**.

### Upcoming Releases & Notifications
- Display upcoming movie releases and **allow users to set reminders**.
- Email or dashboard notifications for **new releases or trailers**.

### News & Industry Updates
- Section for news and articles related to movies and upcoming projects.

### Box Office & Awards
- Display box office earnings and **awards received by movies or actors**.

### Community & Discussion Boards
- **Discussion forums** where users can engage in movie-related discussions.

### Admin Operations
- Manage the **movie database** and moderate user reviews.
- View **site statistics**, including user activity and trending genres.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+)
- **MongoDB** (local or cloud-based)

### Clone Repository
```sh
git clone https://github.com/your-repository/movie-recommendation-backend.git
cd movie-recommendation-backend
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory and set the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_SERVICE_API_KEY=your_email_api_key
```

### Start Server
```sh
npm start
```
The server runs on `http://localhost:5000/` by default.

## API Documentation
API documentation is available via **Swagger** and **Postman**:
- Swagger: `http://localhost:5000/api-docs`
- Postman: Import `postman_collection.json`

## Project Structure
```
movie-recommendation-backend/
│-- src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│-- config/
│-- .env
│-- package.json
│-- README.md
```

## API Endpoints
### User Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile

### Movies
- `GET /api/movies` - Get all movies (pagination implemented)
- `POST /api/movies` - Add a new movie (Admin only)
- `PUT /api/movies/:id` - Update movie details (Admin only)
- `DELETE /api/movies/:id` - Delete a movie (Admin only)

### Ratings & Reviews
- `POST /api/reviews/:movieId` - Add a review
- `PUT /api/reviews/:reviewId` - Update review
- `GET /api/reviews/:movieId` - Get reviews for a movie

### Recommendations
- `GET /api/recommendations` - Get personalized movie recommendations

### Watchlist & Custom Lists
- `POST /api/watchlist` - Add a movie to the watchlist
- `GET /api/watchlist` - Get user watchlist

## Contribution
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License
This project is licensed under the MIT License.

