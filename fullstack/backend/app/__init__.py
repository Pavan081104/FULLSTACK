from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    CORS(app)
    
    from app.models import Project, Client, ContactForm, Newsletter
    from app.routes import api_bp, admin_bp
    
    app.register_blueprint(api_bp)
    app.register_blueprint(admin_bp)
    
    with app.app_context():
        db.create_all()
    
    return app
