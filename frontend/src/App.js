import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Switch, FormControlLabel, Box, Snackbar } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
    const [products, setProducts] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

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
        setProducts(products.filter(product => product.id !== productId));
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
            <Container sx={{ textAlign: 'center', paddingTop: 20 }}>
                <Typography variant="h1" component="h2" gutterBottom>
                    Product Store
                </Typography>
                <FormControlLabel
                    control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
                    label="Dark Mode"
                />
                <Box sx={{ mt: 4 }}>
                    {editingProduct ? (
                        <EditProduct product={editingProduct} updateProduct={updateProduct} />
                    ) : (
                        <AddProduct addProduct={addProduct} />
                    )}
                    <ProductList
                        products={products}
                        deleteProduct={deleteProduct}
                        setSnackbarOpen={setSnackbarOpen}
                        setSnackbarMessage={setSnackbarMessage}
                        setEditingProduct={setEditingProduct}
                    />
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
