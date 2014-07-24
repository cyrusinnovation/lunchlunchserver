lunchlunchserver
================

Node js server for lunch buddy

This is meant to be used in conjunction with the lunchlunch ios client and the lunchlunch android client.
If you change the API here, make sure that the clients are updated as well.

In order to run locally, make sure you have node which now ships with npm. Then, to get all the dependencies, run:
npm install

Next, make sure you have mongodb installed:
brew install mongodb

Then run mongo and create the db:
mongo
use LunchLunchDB

And to run the app server:
node app.js

