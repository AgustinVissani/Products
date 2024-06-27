import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function EditProduct({ product, updateProduct }) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [photo, setPhoto] = useState(product.photo);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, photo }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Product updated successfully') {
                updateProduct(data.product);
            } else {
                console.error('Failed to update product:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="4" sx={{ mb: 2 }}>Edit Product</Typography>
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
            <Button type="submit" variant="contained" color="primary">
                Update Product
            </Button>
        </Box>
    );
}

export default EditProduct;
