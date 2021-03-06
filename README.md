# React Recall - Client-side

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Demo](#demo)
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
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Node](https://nodejs.org/en/)

## Demo
### Demo User
 - username: Carla
 - password: 123
 - Link: [https://chrishurt.github.io/React-Recall/](https://chrishurt.github.io/React-Recall/)

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

### Sprint 4 -- Redesigned & Completed 02/10/19
Build UI/Components and react routing for
 - Navigation
 - Login and Register
 - Viewing datacollections
  - Viewing data in a collection
  - Viewing metrics of a collection
  - Viewing recent session outcomes
 - Making a datacollection
 - General feedback on user actions for clarity
  - I.e. You have added 'item' to 'collection'

### Future Implementation
Look into methods for collecting data to integrate into the UI for testing
  - Consider:
    - Facebook & Instagram API's
    - LinkedIn API

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Chris Hurt - chrishcoding@gmail.com

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [kasun-maldeni - Debugging](https://github.com/kasun-maldeni)
* [DT (epoch) - Debugging](https://github.com/epoch)
* [othnieldrew - README template](https://github.com/othneildrew/Best-README-Template)