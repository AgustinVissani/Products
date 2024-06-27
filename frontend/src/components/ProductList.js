import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ProductList({ products, deleteProduct, setSnackbarOpen, setSnackbarMessage, setEditingProduct, searchTerm }) {
    const handleDelete = (productId) => {
        fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                // Eliminación exitosa en el servidor, actualizar localmente
                deleteProduct(productId); // Esta función debería eliminar el producto del estado local
                setSnackbarMessage('Product deleted successfully');
                setSnackbarOpen(true);
            } else {
                // Error al eliminar, manejar el error
                return response.json().then(error => {
                    throw new Error(error.message || 'Failed to delete product');
                });
            }
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            setSnackbarMessage(error.message || 'Failed to delete product');
            setSnackbarOpen(true);
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    // Filtrar productos por el término de búsqueda
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>Product List</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {filteredProducts.map(product => (
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
                {/* Mensaje si no hay resultados */}
                {filteredProducts.length === 0 && (
                    <Typography variant="subtitle1" sx={{ p: 2 }}>No products found</Typography>
                )}
            </List>
        </Box>
    );
}

export default ProductList;
