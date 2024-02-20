# WGU Capstone Application Summary

## Business Case

The Company is a small start-up organization looking for an application to manage their customer contact information. I believe that OpenCMS will fulfill all of their requirements for managing customer information.

## Software Development Lifecycle

The software development lifecycle system used for this project was the Agile method. I planned out the work beforehand and worked in two weeks sprints to complete the work that I had ticketed. Work will continue as I allow clients to submit feature requests and bug reports.

## Deliverables

The deliverables for this application are an instance of OpenCMS, and an instance of MariaDB or MySQL to be installed on their system. To accomplish this goal and allow for ease of scalability the application has been Docker-ized. This means the application is easy to get up and running, as well as scale in size under load.

The Docker-ized application is a Customer Management System that allows administrators, and other permitted user groups, to create, read, update, and delete customer contact information. Recruitment reports are also available to display who is adding the most customers either daily, weekly, monthly, or yearly.

## Implementation Plan

The implementation of this application at The Company should be rather straightforward. We anticipate that implementing this solution at The Company will result in better customer management by the sales team.

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

There has been no cost during the development process, other than time cost.

This project would have greatly benefited from additional human support. Designing, developing, documenting, and managing the application could have easily been a 6 person job, (2 designers, 2 developers, 1 documenter, and 1 project manager), to reach a release state.

## Cost

The cost of hosting the application and database are minimal if hosted on company hardware. Utilizing third-party hosting will introduce slightly higher costs, but that level is still reasonable (<$1000/yr), and the creators of Next.JS, Vercel, even offer free hosting for Next.JS applications.

## Timeline

The timeline to build this application is approximately two months. The design phase should take no longer than one week (01-01-2024 - 01-08-2024). The development process will be the longest part, with multiple milestones to hit.

The milestones are (presented in timeline and dependency order):

- Database design and creation (01-06-2024 - 01-08-2024)
- User account creation (Registration and SignIn) (01-08-2024 - 01-16-2024)
- Authentication and Authorization (01-16-2024 - 01-23-2024)
- Customer creation (01-23-2024 - 01-26-2024)
- Report generation (01-26-2024 - 02-04-2024)

Each task is allotted one developer to complete the milestone. The other developer will then code review and test the feature.

## Validation

In order to validate the application with The Company we are doing a preview test where OpenCMS will front the cost of hosting and managing the site while The Company has their sales reps live test the site to ensure it meets all of their requirements.
