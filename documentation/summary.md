# WGU Capstone Application Summary

## Business Case

The Company is a small start-up organization looking for an application to manage their customer contact information. I believe that OpenCMS will fulfill all of their requirements for managing customer information.

## Software Development Lifecycle

The software development lifecycle system used for this project was the Agile method. I planned out the work beforehand and worked in two weeks sprints to complete the work that I had ticketed. Work will continue as I allow clients to submit feature requests and bug reports.

## Deliverables

The deliverables for this application are an instance of OpenCMS, and an instance of MariaDB or MySQL to be installed on their system. To accomplish this goal and allow for ease of scalability the application has been Docker-ized. This means the application is easy to get up and running, as well as scale in size under load.

The Docker-ized application is a Customer Management System that allows administrators, and other permitted user groups, to create, read, update, and delete customer contact information. Recruitment reports are also available to display who is adding the most customers either daily, weekly, monthly, or yearly.

## Implementation Plan

The implementation of this application at The Company should be rather straightforward.

Implementation steps:

1. Identity a project manager
2. Assemble necessary personnel with administrator privileges
3. Receive approval to provision server space for both the OpenCMS application and database server.
4. Provision server space
5. Ensure Docker is installed on the server
6. Transfer required files
7. Execute `docker compose up` in the project directory to launch the application.

## Development Environment

This application was developed using Next.JS, a React Framework, that handles a lot of the tedious (but necessary) setup in a normal React project. There is a built in router to handle page routing and api routing that I am a fan of.

My development environment varied between a few systems, and I kept all of my progress in sync using Git. I developed this application on Windows, MacOS, and Ubuntu.

## Cost

The cost of hosting the application and database are minimal if hosted on company hardware. Utilizing third-party hosting will introduce slightly higher costs, but that level is still reasonable (<$1000/yr), and the creators of Next.JS, Vercel, even offer free hosting for Next.JS applications.

## Timeline

The timeline to build this application is approximately two months.
