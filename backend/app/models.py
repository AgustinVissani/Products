class Product:
    _id = 1

    def __init__(self, name, price, photo=None):
        self.id = Product._id
        self.name = name
        self.price = price
        self.photo = photo  
        Product._id += 1

    def update(self, name, price, photo):
        if name:
            self.name = name
        if price:
            self.price = price
        if photo:
            self.photo = photo

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

    def get_product(self, product_id):
        for product in self.products:
            if product.id == product_id:
                return product
        raise Exception(f'Product with id {product_id} not found')

    def delete_product(self, product_id):
        product = self.get_product(product_id)
        self.products.remove(product)
        return product

    def update_product(self, product_id, name, price, photo):
        product = self.get_product(product_id)
        product.update(name, price, photo)
        return product
