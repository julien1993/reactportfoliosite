# Personal Portfolio Server

This is a fully functioning server, with config and dotenv configured and connecting to a database as specified in the .env file

## The Standards

this server is designed to use the REST API Standards, combined with only ever returning a json object:

if the object has a key called error, it will be a negative response, and if it has a key called payload, it is a positive response.

## API End Points

all API End Points begin with /api/v1/

| Endpoint        | Authentication Required? | Method | Purpose                                 | Usage                                                                                                                     | Actions Taken By Route                                                                                                                                                                                  | Positive Response         | Negative Response        |
|-----------------|--------------------------|--------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|--------------------------|
| /users/register | no                       | POST   | to register a user                      | {firstName: <user's first name>,  surname: <user's surname>,  email: <user's email>,  confirmEmail: <user's email again>} | 1. Verify all fields present 2. Compare email and confirmEmail 3. Create new User in database 4. Send email with unique key for each user 5. Create new record in the Key Database 6. Return a response | {payload: "user created"} | {error: <error message>} |
| /users/login    | no                       | POST   | to log in a user                        | {logUsername: <user's username>,  logPassword: <user's password>}                                                         | 1. Verify that the username and password provided match in the database 2. Create a session with the email, username and permission level of the player 3. Return a response                            | {payload: <the session>}  | {error: <error message>} |
| /users/validate | no                       | GET    | to validate the link used from an email | add query parameters of email and key                                                                                     | 1. Verify that the email address and key are the same as found in the Key Database 2. Create a session with the email, first name and surname of the user 3. Return a response                          | {payload: <the session>}  | {error: <error message>} |
