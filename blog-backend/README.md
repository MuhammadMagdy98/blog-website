# Blog API Documentation

## Overview

The Blog API provides endpoints for user authentication, managing posts, categories, tags, and comments. To explore the full API documentation, refer to the Postman collection linked below.

---

## Postman Documentation

You can find the complete API documentation here:

[Postman Documentation](https://documenter.getpostman.com/view/19991125/2sAYQdjq9s)

---

## Environment Variables

To run the application, configure the following environment variables in a `.env`file:

```
DATABASE_URL="postgres://postgres:password@localhost:5432/blog_db"
REDIS_URL="redis://localhost:6379"
TOKEN_EXPIRY="3600"
NODE_ENV="development"
```

---

## Setup Instructions

### **Install Dependencies**

Use the following command to install all necessary dependencies:

```
bun install
```

### **Generate Drizzle Models**

Generate the database models using:

```
bun drizzle-kit generate
```

### **Run Database Migrations**

Apply the migrations using:

```
bun drizzle-kit migrate
```

---

## Notes

* Ensure the backend is running at `http://localhost:3000`.
* Use appropriate environment variables for your local setup.
