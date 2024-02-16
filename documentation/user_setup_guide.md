# User Setup Guide

1. Acquire source code
2. Ensure that Docker is installed and running on this system.
3. Open a terminal and navigate to the root directory of the project.
4. Execute `docker compose up` in the project root directory.
5. Execute `cd src`.
6. Execute `npm i`. This will install all of the project dependencies.
7. Execute `npx prisma migrate dev`. This command will populate the database running in the Docker container with the schema defined in the project.
8. Execute `npm run dev` to start the application. The application will open at <https://localhost:3000>
9. You can now access the setup page for the application located at <https://localhost:3000/setup>. This will allow you to create an admin account as well as populate required application settings.
