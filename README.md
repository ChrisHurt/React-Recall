# React Memorisation App

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Roadmap](#roadmap)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project

A react app for remembering people's names and faces (or other data).

What is this useful for?
- Memorise people's names and faces
- Memorise mushroom names based on their photos
- Memorising any arbitrary pairing of text and photo you can imagine

### Built With
* [React](https://reactjs.org/)
* [SASS](https://sass-lang.com/)
* [Jest](https://jestjs.io/)
* [MongoDB](https://www.mongodb.com/) -- Integration Pending
* [Express](https://expressjs.com/) -- Integration Pending
* [Node](https://nodejs.org/en/) -- Integration Pending

## Roadmap
### Sprint 1 -- Completed 11/09/19
The UI concept for representing the data is multiples circles packed within a larger circle
  - See: http://mathworld.wolfram.com/CirclePacking.html
  - Automate distribution of data within concentric rings of circles
  - Data will be represented by the smaller circles with photo thumbnails and initially hidden text

### Sprint 2 -- Completed 12/09/19
UI Behaviours include the following 
  - After clicking a sub-circle it should:
    - Expand
    - Move to the center
    - reveal data's text (a name or whatever information you prefer)
    - allow users to indicate if they remembered the hidden text
      - This could be done automatically by typing their name in an input prior to clicking or,
      - This could be done by using a check box in the circle
  - After resolving the user response the sub-circle should be removed from the dataset

### Sprint 3 -- Completed 13/09/19
Store memory outcomes in a new component
  - Hardcode more data for testing - 50 unique data points
  - Success in one, Failure in another

### Sprint 4 -- In Progress
Server-side data management
  - Design PSQL Schema
    - Tables
      - Users
      - Data Points
      - Data Collections
  - Build Sinatra Backend
    - Models representing users, datapoints & collections
    - CRUD API Endpoints
    - User Login & Validation
  - Implement Schema in PSQL
    - Write Schema File
    - Write Seed & Cleanse files


### Schema Design
The initial schema design contains 5 tables
- **Users**
  - have many *DataCollections* 
  - have many *GuessSessions*
- **DataCollections**
  - belong to a *User* (May need another table for sharing data collections between users)
  - have many *DataPoints*
- **GuessSessions**
  - belong to a *User*
  - belong to a *DataCollection*
  - have many *Guesses*
- **DataPoints**
  - belong to a *DataCollection*
  

### Future Implementation
Look into methods for collecting data to integrate into the UI for testing
  - Consider:
    - Facebook & Instagram API's - Rejected, not enough time to implement
    - LinkedIn API - Pending Decision
    - Any other API's or accessible data that can be applied in this context - No suitable options found, Pending Decision
  - Look into methods for allowing user input and storage of this data as appropriate and if needed
    - Postgresql with node or ruby backend - Under consideration

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Chris Hurt - chrishcoding@gmail.com

Project Link: [https://github.com/ChrisHurt/React-Recall-Remember](https://github.com/ChrisHurt/React-Recall-Remember)

Live Demo: -- Pending implementation of backend



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [kasun-maldeni - Debugging](https://github.com/kasun-maldeni)
* [DT (epoch) - Debugging](https://github.com/epoch)
* [othnieldrew - README template](https://github.com/othneildrew/Best-README-Template)