# React Memorisation App

> A react app for remembering people's names (or other data) with a custom UI

## Demo of Application
- This is currently under construction and a link will be placed here when ready.

## Initial Scope and Planning
### Sprint 1 -- Completed 11/09/19
The UI concept for representing the data is multiples circles packed within a larger circle
  - See: http://mathworld.wolfram.com/CirclePacking.html
  - Automate distribution of data within concentric rings of circles
  - Data will be represented by the smaller circles with photo thumbnails and initially hidden text

### Sprint 2 -- Currently In Progress
Look into methods for collecting data to integrate into the UI for testing
  - Consider:
    - Facebook & Instagram API's - Rejected, not enough time to implement
    - LinkedIn API - Pending Decision
    - Any other API's or accessible data that can be applied in this context - No suitable options found, Pending Decision
  - Look into methods for allowing user input and storage of this data as appropriate and if needed
    - Postgresql with node or ruby backend - Under consideration

### Sprint 3
UI Behaviours include the following 
  - After clicking a sub-circle it should:
    - Expand
    - Move to the center
    - reveal data's text (a name or whatever information you prefer)
    - allow users to indicate if they remembered the hidden text
      - This could be done automatically by typing their name in an input prior to clicking or,
      - This could be done by using a check box in the circle
  - After resolving the user response the sub-circle should be removed from the dataset

## Installation Instructions
- This is currently under construction and a instructions will be placed here when ready.