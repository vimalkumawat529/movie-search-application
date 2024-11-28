# Features

Search Movies: Users can search for movies using a search bar.
Movie Cards: Displays movie information like title, release date, poster, and overview.
Movie Details Page:
Displays detailed information about the selected movie, including cast, ratings, and reviews.
Autocomplete Suggestions: Offers suggestions while typing in the search bar.
Responsive Design: Works well on both desktop and mobile devices.
Pagination: Handles large datasets efficiently with pagination.

### Technologies Used

React.js
Material UI
TMDb API
Netlify (Deployment)

### Setup and Installation

Prerequisites:
Node.js installed on your system.
A TMDb API key. You can get it from TMDb API Documentation.

### Steps to Run the Application Locally:

Clone the repository:

bash
Copy code
git clone : https://github.com/vimalkumawat529/movie-search-application?tab=readme-ov-file
cd : movie-search-application

## Install dependencies:

npm install

## Start the development server:

npm start

### Open the application in your browser at http://localhost:3000.

### Deployment

The application is deployed on Netlify. You can access it using the following link:
https://main--melodic-medovik-320e30.netlify.app/

## Folder Structure

src/components: Contains reusable components like SearchBar, MovieCard, etc.
src/assests: constants data
src/reducer: movieDetailsSlice, movieSearchSlice, reviewSlice etc,
src/store: store slice data

### Additional Notes

Make sure to test the application on different devices for responsiveness.
Follow the best practices for coding, state management, and modularity.
