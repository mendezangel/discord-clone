# Welcome to the Strife Repo, this is a clone of Discord. This project is a web app in which you can create servers and channels where you can invite your friends and message them.

# Link to Live Site
https://strife-app.herokuapp.com/


# WikiLinks
## [Wiki](https://github.com/mendezangel/discord-clone/wiki/Home/_edit)


# Technologies Used
![image](https://user-images.githubusercontent.com/55769045/158077336-42abae5d-5d9c-4283-9172-3f0c0c4bac79.png)
![image](https://user-images.githubusercontent.com/55769045/158077345-d81dc631-e5bd-4300-ae54-017c7790708c.png)
![image](https://user-images.githubusercontent.com/55769045/158077355-9918d271-854d-4636-b8dc-236cecc1cca9.png)
![image](https://user-images.githubusercontent.com/55769045/158077365-124b78bd-1084-4599-a5b3-d6c918c71ab3.png)
![image](https://user-images.githubusercontent.com/55769045/158077375-898fb063-db42-4d4a-ab44-49836079f7e1.png)
![image](https://user-images.githubusercontent.com/55769045/158077401-9125b47a-3399-4e17-bdb7-2c5701efa1cf.png)
![image](https://user-images.githubusercontent.com/55769045/158077456-ba4d497a-be52-4b4b-866c-9e28fc0db2fd.png)
![image](https://github.com/aaugustin/websockets/raw/main/logo/horizontal.svg)
![image](https://camo.githubusercontent.com/f7b8dd3ec5e0959272f5015575d66b6b6231329b1b597cca76d665453eb10f6b/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f73716c616c6368656d792f73716c616c6368656d792d6f726967696e616c2e737667)
![image](https://camo.githubusercontent.com/826c4915dba072e0dfbf44c4d33e4e33861e0205c1f94a679fe06e7976a88131/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f666c61736b2f666c61736b2d6f726967696e616c2e737667)
![image](https://camo.githubusercontent.com/240d9f9177236e5fd117a33e31e5b77b5fece5f03410fe10f5c7835937fb3506/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f646f636b65722f646f636b65722d706c61696e2d776f72646d61726b2e737667)

## Getting started
### Dev Containers (M1 Users, follow this guide)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. 

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |


