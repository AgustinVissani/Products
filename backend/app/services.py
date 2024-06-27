from .models import Product

class ProductFactory:
    @staticmethod
    def create_product(name, price):
        return Product(name, price)

class PercentageDiscountStrategy:
    def __init__(self, discount_percentage):
        self.discount_percentage = discount_percentage

    def apply_discount(self, price):
        return price * (1 - self.discount_percentage / 100)
