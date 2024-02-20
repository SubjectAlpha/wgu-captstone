# OpenCMS

## Introduction

OpenCMS is meant to be an easily deployable Customer Management System. The application is dockerized, with a sql database for ease of configuration and deployment.

## .env Example

```txt
MYSQL_URL=mysql://root:example@127.0.0.1:3306/open-crm
HMAC_SECRET=mySuperSecretKey1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mySuperSecretKey2
```
