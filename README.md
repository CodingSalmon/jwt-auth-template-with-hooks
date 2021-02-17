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
DATABASE_URL=XXXXXXXXXXXXXXXXXXXXXXXX
SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXX
CLIENT_URL=http://localhost:3000
RESET_PASSWORD_KEY=XXXXXXXXXXXXXXXXX
GOOGLE_APP_EMAIL=XXXXXXXXXXXXXXXX
GOOGLE_APP_PW=XXXXXXXXXXXXXXXXXX
```
