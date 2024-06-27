import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Snackbar, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ProductList({ products, deleteProduct, setSnackbarOpen, setSnackbarMessage, setEditingProduct }) {
    const handleDelete = (productId) => {
        fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                deleteProduct(productId); 
                setSnackbarMessage('Product deleted successfully');
                setSnackbarOpen(true);
            } else {
                throw new Error('Failed to delete product');
            }
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            setSnackbarMessage('Failed to delete product');
            setSnackbarOpen(true);
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h3" gutterBottom>Product List</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {products.map(product => (
                    <ListItem key={product.id} sx={{ borderBottom: '1px solid #ccc' }}>
                        <ListItemText primary={`${product.name}: $${product.price}`} secondary={product.photo ? <img src={product.photo} alt={product.name} width="50" /> : null} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(product)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(product.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default ProductList;
