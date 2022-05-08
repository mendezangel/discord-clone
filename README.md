# Strife Repo
Welcome to the Strife Repo, this is a clone of Discord. This project is a web app in which you can create servers and channels where you can invite your friends and message them.


# Link to Live Site
https://strife-app.herokuapp.com/


# WikiLinks
## [Wiki](https://github.com/mendezangel/discord-clone/wiki/Home)


# Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# Getting Started

To see Strife live, click the live link above. To run Strife locally on your machine follow these steps:

* Clone the repository:
  * git clone https://github.com/mendezangel/discord-clone.git

* Create a database and database user:
   * psql
   * CREATE USER strife_app WITH PASSWORD <password> CREATEDB;
   * CREATE DATABASE strife_dev WITH OWNER strife_app;

* Navigate to the backen folder and install python packages
   * pipenv install
   * pipenv shell

* Create and seed database with
   * flask db upgrade
   * flask seed all
   
* Start server
   * flask run
   
* CD into react-app folder and run
   * npm install
   
* Start the app with
   *npm start
   
  
# Demo
   
   Log in as a demo user to get a feel for the site.
   ![Animation](https://user-images.githubusercontent.com/55769045/167316186-6807e0d5-cc19-47b9-92c2-6c0d13430b96.gif)



