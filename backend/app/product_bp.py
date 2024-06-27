from flask import Blueprint, jsonify, request
from .models import ProductDatabase, Product  
from .services import ProductFactory, PercentageDiscountStrategy

product_bp = Blueprint('product_bp', __name__)

# Creamos una única instancia de ProductDatabase
db = ProductDatabase()

class ProductObserver:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def unsubscribe(self, subscriber):
        self.subscribers.remove(subscriber)

    def notify(self, product):
        for subscriber in self.subscribers:
            subscriber.update(product)

class ProductSubscriber:
    def update(self, product):
        print(f'New product added: {product.name}')

observer = ProductObserver()
subscriber = ProductSubscriber()
observer.subscribe(subscriber)

# Ruta para obtener todos los productos
@product_bp.route('/products', methods=['GET'])
def get_products():
    products = db.get_products()
    return jsonify([{'id': product.id, 'name': product.name, 'price': product.price} for product in products])

# Ruta para agregar un nuevo producto
@product_bp.route('/products', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        name = data.get('name')
        price = data.get('price')

        if not name or not price:
            return jsonify({'error': 'Name and price are required'}), 400

        product = ProductFactory.create_product(name, price)

        db.add_product(product)

        return jsonify({'message': 'Product added successfully', 'product': {'id': product.id, 'name': product.name, 'price': product.price}}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Ruta para eliminar un producto por su id
@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        deleted_product = db.delete_product(product_id)

        if deleted_product:
            observer.notify(deleted_product)

            return jsonify({'message': 'Product deleted successfully'}), 200
        else:
            return jsonify({'error': 'Product not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
