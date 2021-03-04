# JWT-Auth-Template-With-Hooks

##

## This template contains a basic navbar that will display the name of the logged in user.

### Instructions:

#### 1. Clone this repository to your local machine.

```
git clone https://github.com/CodingSalmon/jwt-auth-template-with-hooks.git
```

#### 2. Navigate into the repository and install node modules.

```
cd jwt-auth-template-with-hooks
npm i
```

#### 3. Create a .env file and add values for the database URL, mongoDB connection string, a key for signing tokens to securely reset passwords, your client's url, and login info for a google account that does not have 2FA enabled. (nodemailer will not work with 2FA enabled)

```
touch .env
```

```
DATABASE_URL=<your MongoDB connection string>
SECRET=<any string>
CLIENT_URL=http://localhost:3000 (note: When deploying change this to your site's url)
RESET_PASSWORD_KEY=<any string>
GOOGLE_APP_EMAIL=<google account email>
GOOGLE_APP_PW=<google account password>
```

#### 4. Reset the origin remote so you can push to your own repo.

```
git remote set-url origin <your repo's url with .git at the end>
```
