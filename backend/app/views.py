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
    return jsonify([{'name': product.name, 'price': product.price} for product in products])

@product_bp.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    product = ProductFactory.create_product(name, price)

    db = ProductDatabase()
    db.add_product(product)
    observer.notify(product)

    return jsonify({'message': 'Product added successfully'}), 201
