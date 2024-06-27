import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function AddProduct({ addProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(""); // Agrega un estado para la foto

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, photo }), // Incluye la foto en el cuerpo de la solicitud
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Product added successfully") {
          addProduct(data.product);
          setName("");
          setPrice("");
          setPhoto("");
        } else {
          console.error("Failed to add product:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Product
      </Typography>
      <TextField
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Photo URL"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box  margin={2}>
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
    </Box>
  );
}

export default AddProduct;
