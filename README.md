# projectInterview
Project Interview


Libraries:

The libraries needed to run the project are: axios and PouchDB. These libraries are added through the respective cdns.

Note that user information is stored in a local database "indexDB". You can view it by right clicking inspect > select application section > storage > indexDB.

1. To run the project clone this repository on your machine:

git clone https://github.com/JulianMolina99/projectInterview.git

2. It is recommended to use VSC with the live server extension and have node installed:

2.1 To open it from vsc you can right click on the index.html file and run live server.

2.2 To run it from command install the dependency:

npm i -D live-server

In the package.json file add: 

"scripts":{
  "start": "live-server --open=./index.html"
}


