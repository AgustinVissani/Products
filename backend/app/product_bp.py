from flask import Blueprint, jsonify, request
from app.models import ProductDatabase, Product
from app.services import ProductFactory, PercentageDiscountStrategy

product_bp = Blueprint('product_bp', __name__)

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

@product_bp.route('/products', methods=['GET'])
def get_products():
    db = ProductDatabase()
    products = db.get_products()
    return jsonify([{'id': product.id, 'name': product.name, 'price': product.price, 'photo': getattr(product, 'photo', '')} for product in products])

@product_bp.route('/products', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        name = data.get('name')
        price = data.get('price')
        photo = data.get('photo', '')  # Asegúrate de manejar correctamente el valor predeterminado

        # Llama a create_product() con los argumentos correctos
        product = ProductFactory.create_product(name, price, photo)

        db = ProductDatabase()
        db.add_product(product)
        observer.notify(product)

        return jsonify({'message': 'Product added successfully', 'product': {'id': product.id, 'name': product.name, 'price': product.price, 'photo': product.photo}}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        db = ProductDatabase()
        product = db.delete_product(product_id)
        return jsonify({'message': 'Product deleted successfully', 'product': {'id': product.id, 'name': product.name, 'price': product.price}}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@product_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    photo = data.get('photo', '')

    db = ProductDatabase()
    product = db.update_product(product_id, name, price, photo)

    return jsonify({'message': 'Product updated successfully', 'product': {'id': product.id, 'name': product.name, 'price': product.price, 'photo': product.photo}}), 200
