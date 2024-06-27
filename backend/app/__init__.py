from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  

    from .product_bp import product_bp
    app.register_blueprint(product_bp, url_prefix='/api')

    return app
