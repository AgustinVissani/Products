# models.py

class Product:
    _id = 1  

    def __init__(self, name, price):
        self.id = Product._id  
        self.name = name
        self.price = price
        Product._id += 1 
        
class ProductDatabase:
    _instance = None  

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.products = []
        return cls._instance

    def add_product(self, product):
        product.id = len(self.products) + 1  
        self.products.append(product)

    def get_products(self):
        return self.products

    def delete_product(self, product_id):
        for index, product in enumerate(self.products):
            if product.id == product_id:
                del self.products[index]
                return product
        raise Exception(f'Product with id {product_id} not found')

