import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function AddProduct({ addProduct }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Product added successfully') {
                addProduct(data.product);
                setName('');
                setPrice('');
            } else {
                console.error('Failed to add product:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>Add Product</Typography>
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
            <Button type="submit" variant="contained" color="primary">
                Add Product
            </Button>
        </Box>
    );
}

export default AddProduct;
