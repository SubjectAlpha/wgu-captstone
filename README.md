# OpenCMS

## Introduction

OpenCMS is meant to be an easily deployable Customer Management System. The application is dockerized, with a sql database for ease of configuration and deployment.

## Features

## Future Improvements

- secure api routes w jwt, next auth can do this automatically and htey have docs
- setup program to check if db exists and take values and create new db
- - this should only be able to be accessed if there is no 'opencms' database
- write docs
- - all below env vars required
- mobile friendly-ness
- component-ize forms
- add name in registration

## .env Example

```txt
MYSQL_URL=mysql://root:example@127.0.0.1:3306/open-crm
HMAC_SECRET=mySuperSecretKey1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mySuperSecretKey2
```
