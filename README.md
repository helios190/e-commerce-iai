# Product Retrieval Backend


## Installation

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Ensure you have MongoDB installed and running on your machine.

## Usage

### Endpoints

- GET `/product`: Retrieve a list of all products.
- GET `/product/:id`: Retrieve information about a specific product by its ID.
- POST `/product`: Add a new product.
- POST `/product/edit/:id`: Edit an existing product by its ID.
- DELETE `/product/delete/:id`: Delete a product by its ID.

### Adding a New Product

To add a new product, send a POST request to `/product` with the following JSON data:

```json
{
  "name": "Product Name",
  "size": {
    "S": 10,
    "M": 15,
    "L": 20
  },
  "price": 25.99,
  "file": (upload an image file)
}
```

### Editing a Product

To edit an existing product, send a POST request to `/product/edit/:id` with the following JSON data:

```json
{
  "name": "New Product Name",
  "size": {
    "S": 8,
    "M": 12,
    "L": 18
  },
  "price": 29.99
}
```

### Deleting a Product

To delete a product, send a DELETE request to `/product/delete/:id`.

### Viewing Product Information

To view information about a specific product, send a GET request to `/product/:id`.

## File Uploads

When adding or editing a product, make sure to upload an image file along with the request.

## Running the Server

To start the server, run `npm start`. By default, the server runs on port 3000.

## Dependencies

- Express.js
- Mongoose
- Multer

---

This README provides a brief overview of the API endpoints and how to use them. Feel free to expand it with more detailed instructions if needed.
