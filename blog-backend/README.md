# Blog API Documentation

## Overview

The Blog API provides endpoints for user authentication, managing posts, categories, tags, and comments. It supports CRUD operations with token-based authentication for protected resources.

---

## Base URL

```
http://localhost:3000
```

---

## Endpoints

### **Authentication**

#### **Register**

* **URL:**`/auth/register`
* **Method:**`POST`
* **Body:**
  ```json
  {
      "username": "migo",
      "password": "new-password",
      "email": "abc@abc.com"
  }
  ```

#### **Login**

* **URL:**`/auth/login`
* **Method:**`POST`
* **Body:**
  ```json
  {
      "username": "migo",
      "password": "new-password"
  }
  ```

#### **Logout**

* **URL:**`/auth/logout`
* **Method:**`POST`
* **Body:**
  ```json
  {
      "username": "migo",
      "password": "new-password"
  }
  ```

---

### **Posts**

#### **Get All Posts**

* **URL:**`/posts`
* **Method:**`GET`

#### **Get Post by ID**

* **URL:**`/posts/{id}`
* **Method:**`GET`

#### **Create Post**

* **URL:**`/posts`
* **Method:**`POST`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "categoryId": 2,
      "title": "post title 1",
      "content": "ya magdy asdas adsd ads aasda"
  }
  ```

#### **Update Post**

* **URL:**`/posts/{id}`
* **Method:**`PUT`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "categoryId": 1,
      "title": "post title 1",
      "content": "lorem ipsum"
  }
  ```

#### **Delete Post**

* **URL:**`/posts/{id}`
* **Method:**`DELETE`
* **Authorization:**`Bearer Token`

---

### **Categories**

#### **Get All Categories**

* **URL:**`/categories`
* **Method:**`GET`

#### **Create Category**

* **URL:**`/categories`
* **Method:**`POST`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "name": "Category 1"
  }
  ```

#### **Update Category**

* **URL:**`/categories/{id}`
* **Method:**`PUT`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "name": "abrakadabra"
  }
  ```

#### **Delete Category**

* **URL:**`/categories/{id}`
* **Method:**`DELETE`
* **Authorization:**`Bearer Token`

---

### **Comments**

#### **Get Comment by ID**

* **URL:**`/comments/{id}`
* **Method:**`GET`

#### **Create Comment**

* **URL:**`/comments`
* **Method:**`POST`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "content": "Hello hello",
      "postId": 5
  }
  ```

#### **Update Comment**

* **URL:**`/comments`
* **Method:**`PUT`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "content": "abc abc abc",
      "commentId": 7
  }
  ```

#### **Delete Comment**

* **URL:**`/comments/{id}`
* **Method:**`DELETE`
* **Authorization:**`Bearer Token`

---

### **Tags**

#### **Get All Tags**

* **URL:**`/tags`
* **Method:**`GET`

#### **Create Tag**

* **URL:**`/tags`
* **Method:**`POST`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "name": "sobhan allah"
  }
  ```

#### **Update Tag**

* **URL:**`/tags`
* **Method:**`PUT`
* **Authorization:**`Bearer Token`
* **Body:**
  ```json
  {
      "name": "abc",
      "tagId": 4
  }
  ```

#### **Delete Tag**

* **URL:**`/tags/{id}`
* **Method:**`DELETE`
* **Authorization:**`Bearer Token`

---

## Authorization

Some endpoints require a `Bearer Token` for authentication. Include the token in the `Authorization` header as follows:

```plaintext
Authorization: Bearer <token>
```

---

## Error Handling

The API responds with standard HTTP status codes to indicate success or failure:

* `200 OK` – Request succeeded.
* `201 Created` – Resource successfully created.
* `400 Bad Request` – Invalid input data.
* `401 Unauthorized` – Missing or invalid authentication.
* `403 Forbidden` – Access denied.
* `404 Not Found` – Resource not found.
* `500 Internal Server Error` – Server encountered an error.

---

## Testing

You can test the API using tools like Postman, Insomnia, or cURL.

---

## Notes

* Ensure the backend is running at `http://localhost:3000`.
* Replace `<token>` with a valid token for protected endpoints.
* Use appropriate `categoryId`, `postId`, or `commentId` values where required.

---

## Contact

For questions or issues, contact the API maintainer:

**Name:** Mohamed Magdy
**Email:**[mohamed@example.com](mailto:mohamed@example.com)

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.43. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
