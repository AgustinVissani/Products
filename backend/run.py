from flask import Flask
from flask_cors import CORS
from app.product_bp import product_bp

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Configura CORS solo para localhost:3000

    # Registrar el blueprint
    app.register_blueprint(product_bp, url_prefix='/api')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
