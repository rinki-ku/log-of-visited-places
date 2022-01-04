## Description

Node.JS backend providing a REST API to create, read, update and delete places.

Each place has the properties: ID, latitude, longitude, name, image URL
Don’t worry about any long-term storage or database or something. Only storing those in memory of the backend is sufficient for this example.
Node Express should be the best starting point
 
For the frontend try to show a world map as central component: e.g. Leaflet.js + Openstreetmap data

Clicking on the map add a place marker (stored in the backend)
Clicking on an existing marker shows its properties in a popup window (name, image).
The popup window allows to edit name and image URL, and to delete the marker.
Reloading the frontend page loads all markers from the backend REST

## Installation

1. This repository is using NodeJS, React, Leaflet React, HTML, CSS, SASS etc.
2. Frontend: React, Html, SASS, CSS.
3. Backend: Node.js

### Backend - server
##### •	Go inside server folder and do 'npm install'
##### •	After installing  run the server using 'node .\server.js' or 'nodemon .\server.js' then open chrome and enter http://localhost:4000/maps

#### Crud Operations:
1. GET http://localhost:4000/maps
2. POST http://localhost:4000/map
3. Delete http://localhost:4000/map/:id 
4. Put/Update http://localhost:4000/map/:id 

#### Once your server is up and running follow below commands to run Frontend

### Client- Frontend 
##### •	Go to client folder and do 'npm install'
##### •	After installing  run 'npm start' it will redirect to http://localhost:3000. 
##### •	Used react-leaflet for map
