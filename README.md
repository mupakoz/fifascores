# fifascores

Simple project to try out technologies like: Gulp, Akka-Http, ReactiveMongo. Build system inspired by https://github.com/softwaremill/bootzooka.

# How to develop

### DB

Run MongoDB server on default port (27017). The database will be created automatically if needed.

### Backend

To run the BE of the app you will need:
* SBT

Run **start_backend.bat** script from the root directory of the repository. You can test it typing *http://localhost:8081/api/hello* into the browser. The response should be a JSON saying "API Test message".

### Frontend

Requirements:
* Node.js (with bower, gulp, tsd installed globally)

Commands to install the app (run from ./frontend):
* npm install
* bower install
* tsd reinstall

Commands to run the app:
* gulp serve

### Deployment
t.b.d.
