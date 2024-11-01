
# Makerere Map Guide App

![Makerere Map Guide App Screenshot](link-to-image)

## Project Overview

The **Makerere Map Guide App** is a web-based mapping solution built with Django and OpenStreetMap, designed to guide users through Makerere University. The app provides an interactive map with place markers, routes, and directions to help users navigate the campus. Data, including place coordinates and other metadata, is stored in a PostgreSQL database. The routing system allows users to draw routes between locations, making navigation simple and intuitive.

### Key Features
- **Interactive Map**: Built using OpenStreetMap API for dynamic mapping.
- **Markers and Locations**: Custom markers on the map for key locations around Makerere University.
- **Routing System**: Real-time routing to draw paths between selected locations.
- **Data Management**: Locations and route data stored in PostgreSQL for easy management and scalability.

## Tech Stack
- **Backend**: Django (web framework, API development)
- **Database**: PostgreSQL (data storage for coordinates, locations, and routes)
- **Map and Routing**: OpenStreetMap API

## Setup Instructions

1. **Clone the Repository**  
   ```bash
   git clone <repo-url>
   cd makerere-map-guide
   ```

2. **Install Dependencies**  
   Create and activate a virtual environment, then install the required packages:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. **Configure PostgreSQL Database**  
   Update the `DATABASES` setting in `settings.py` with your PostgreSQL credentials:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'your_db_name',
           'USER': 'your_db_user',
           'PASSWORD': 'your_db_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

4. **Run Migrations**  
   ```bash
   python manage.py migrate
   ```

5. **Start the Server**  
   ```bash
   python manage.py runserver
   ```
   
6. **Access the App**  
   Open your browser and navigate to `http://127.0.0.1:8000` to start using the Makerere Map Guide app.

## License
This project is licensed under the [MIT License](link-to-license).
