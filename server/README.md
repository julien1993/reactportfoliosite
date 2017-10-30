# Personal Portfolio Server

This is a fully functioning server, with config and dotenv configured and connecting to a database as specified in the .env file

## The Standards

this server is designed to use the REST API Standards, combined with only ever returning a json object:

if the object has a key called error, it will be a negative response, and if it has a key called payload, it is a positive response.

## API End Points

all API End Points begin with /api/v1/

### User Endpoints

| Endpoint                        | Auth Level        | Method | Purpose                                         | Usage                                                                                                             | Positive Response             |
|---------------------------------|-------------------|--------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|-------------------------------|
| /users/register                 | 0                 | POST   | to register a user                              | {firstName: user's first name,  surname: user's surname,  email: user's email,  confirmEmail: user's email again} | {payload: created user}       |
| /users/login                    | 0                 | POST   | to log in a user                                | {logUsername: user's username,  logPassword: user's password}                                                     | {payload: the session}        |
| /users/validate                 | 0                 | GET    | to validate the link used from an email         | add query parameters of email and key                                                                             | {payload: the session}        |
| /users/completesignup           | 0                 | POST   | to finish the signup of a user                  | {username: user's username,   password: user's password,  confirmPassword: user's password again,}                | {payload: "signup finished"}  |
| /users                          | 5                 | GET    | to list all users in database                   | N/A                                                                                                               | {payload: [{user}, {user}...] |
| /users/:username                | 5 or own username | GET    | to list singular user in database               | :username = username as entered in /users/completesignup                                                          | {payload:{user}}              |
| /users/:username                | 5 or own username | POST   | to change user in database                      | :username = username as entered in /users/completesignup                                                          | {payload:{edited user}}       |
| /users/remove/:username         | 5 or own username | POST   | to delete specified user from database          | :username = username as entered in /users/completesignup                                                          | {payload:{deleted user}}      |
| /users/validatepasswordkey      | 0                 | GET    | to validate link used from password reset email | Add query parameters of email and key                                                                             | {payload: the session}        |
| /users/changepassword/:username | 5 or own username | GET    | to change user password in database             | {password: new password, confirmPassword: new password again}                                                     | {payload: {edited user}}      |
