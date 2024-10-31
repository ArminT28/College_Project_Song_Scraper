# Song Scraper App - Angular Frontend

This repository contains the **frontend part** of the Song Scraper Application, a project created in college over two days. The project is designed to connect to a Firebase database, allowing users to scrape songs from YouTube, add their information to a database, and manage the songs by editing or removing them. Additionally, the application displays a list of all songs that have ever been scraped and stored in the database.

## Table of Contents
- Features
- Technologies Used
- Setup
- Usage
- Project Structure
- Contributing
- License
- README File

---

## Features

- **Song Scraping**: Allows users to scrape song information from YouTube.
- **Firebase Integration**: Connects to Firebase to store, edit, and delete song data.
- **Song Management**: Provides options to view, edit, and remove songs in the database.
- **Song List Display**: Shows a list of all songs that have ever been scraped and stored.

## Technologies Used

- **Angular**: The frontend framework for building and structuring the application.
- **Firebase**: Used for database management, providing real-time synchronization and data storage.

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArminT28/song-scraper-frontend.git
   cd song-scraper-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Firebase**:
   - Create a Firebase project at [Firebase Console](https://firebase.google.com/).
   - Obtain your Firebase configuration details (API Key, Auth Domain, Database URL, Project ID, etc.).
   - Add your Firebase configuration to the environment files in the Angular project.

4. **Run the Application**:
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser to view the application.

## Usage

- **Adding Songs**: Use the provided interface to scrape songs from YouTube and save their information in the Firebase database.
- **Editing Songs**: Select any saved song to update its details in the database.
- **Deleting Songs**: Remove any unwanted song entries from the database.
- **Viewing All Songs**: The application provides a list view of all songs that have been added.

## Project Structure

- `src/app`: Contains the main Angular components, services, and routing files.
- `src/environments`: Contains the Firebase configuration files.
- `src/assets`: Holds static assets such as images, CSS files, and icons.

## Contributing

Contributions are welcome! If you'd like to improve or expand the project, feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## README 

This README file was generated using OpenAI's ChatGPT version 3.5.
