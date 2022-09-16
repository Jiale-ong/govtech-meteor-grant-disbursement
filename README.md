# govtech-meteor-grant-disbursement
Repository for Govtech Meteor's coding assessment. This repo contains the code for the backend API server of a grant disbursement application.

# Prerequisites
Download and install MongoDB locally, running on port 27017
Download node.js

# Setup instructions
1. Download and unzip the contents of this repo into a folder.
2. run npm install on a command prompt, to install the necessary node packages from package.json
3. ensure that mongodb is up and running on port 27017
4. run "node app.js" on a command prompt from the folder that contains app.js
5. use POSTman to test the APIs, postman collection can be found in this repo as METEOR.postman_collection.json

## Setup Notes
* You do not need to create a schema for this application, as it will be automatically created upon running "node app.js"

# Assumptions
1. A married person may not have a spouse under the household, to allow for administrative time to add the spouse to the household in the future.
2. Similarly, a person might have a spouse but may not be married, to allow for administrative flexibility.
3. For the student encouragement bonus, qualifying members need not be students, as outlined in the assessment document.
4. For the multigenerational scheme, households only need EITHER a member less than 18 years old OR a member greater than 55 years old, as outlined in the assessment document.
5. For the Elder bonus, a household MUST have a member ABOVE 55 years old, where subsequently members AT OR ABOVE 55 years old would qualify for this bonus.
6. While this application is currently running locally, if this application were to be hosted, the database would be restricted to mongoDB since it was developed using mongoDB.
7. The current application does not have delete or modify functionalities, as it is not required by the assessment document.
