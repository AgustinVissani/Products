import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Switch, FormControlLabel, Box, Snackbar } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import SearchAppBar from './components/SearchAppBar';

function App() {
    const [products, setProducts] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const addProduct = (product) => {
        setProducts([...products, product]);
        setSnackbarMessage('Product added successfully');
        setSnackbarOpen(true);
    };

    const deleteProduct = (productId) => {
        fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setProducts(products.filter(product => product.id !== productId));
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

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
        setSnackbarMessage('Product updated successfully');
        setSnackbarOpen(true);
        setEditingProduct(null);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleThemeChange = () => {
        setIsDarkMode(!isDarkMode);
    };

    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Container sx={{ textAlign: 'center'}}>
            <SearchAppBar setSearchTerm={setSearchTerm} />
                <FormControlLabel
                    control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
                    label="Dark Mode"
                />
                <Box sx={{ mt: 4 }}>

                    <ProductList
                        products={products}
                        searchTerm={searchTerm}
                        deleteProduct={deleteProduct}
                        setSnackbarOpen={setSnackbarOpen}
                        setSnackbarMessage={setSnackbarMessage}
                        setEditingProduct={setEditingProduct}
                    />
                    {editingProduct ? (
                        <EditProduct product={editingProduct} updateProduct={updateProduct} />
                    ) : (
                        <AddProduct addProduct={addProduct} />
                    )}
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    sx={{ backgroundColor: snackbarMessage.includes('successfully') ? '#4caf50' : '#f44336' }}
                />
            </Container>
        </ThemeProvider>
    );
}

export default App;
