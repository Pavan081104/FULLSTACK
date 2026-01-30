from flask import Blueprint, request, jsonify
from app import db
from app.models import Project, Client, ContactForm, Newsletter

api_bp = Blueprint('api', __name__, url_prefix='/api')
admin_bp = Blueprint('admin', __name__, url_prefix='/admin/api')

# ==================== PUBLIC API ====================

@api_bp.route('/projects', methods=['GET'])
def get_projects():
    """Get all projects"""
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@api_bp.route('/clients', methods=['GET'])
def get_clients():
    """Get all clients testimonials"""
    clients = Client.query.all()
    return jsonify([client.to_dict() for client in clients])

@api_bp.route('/contact', methods=['POST'])
def submit_contact_form():
    """Submit contact form"""
    data = request.get_json()
    
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    contact = ContactForm(
        name=data['name'],
        email=data['email'],
        message=data['message']
    )
    db.session.add(contact)
    db.session.commit()
    
    return jsonify({'message': 'Contact form submitted successfully', 'data': contact.to_dict()}), 201

@api_bp.route('/newsletter', methods=['POST'])
def subscribe_newsletter():
    """Subscribe to newsletter"""
    data = request.get_json()
    
    if not data.get('email'):
        return jsonify({'error': 'Email is required'}), 400
    
    existing = Newsletter.query.filter_by(email=data['email']).first()
    if existing:
        return jsonify({'error': 'Email already subscribed'}), 400
    
    newsletter = Newsletter(email=data['email'])
    db.session.add(newsletter)
    db.session.commit()
    
    return jsonify({'message': 'Successfully subscribed to newsletter', 'data': newsletter.to_dict()}), 201

# ==================== ADMIN API ====================

@admin_bp.route('/projects', methods=['GET'])
def admin_get_projects():
    """Admin: Get all projects"""
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@admin_bp.route('/projects', methods=['POST'])
def admin_create_project():
    """Admin: Create a new project"""
    data = request.get_json()
    
    if not data.get('title') or not data.get('description'):
        return jsonify({'error': 'Title and description are required'}), 400
    
    project = Project(
        title=data['title'],
        description=data['description'],
        image_url=data.get('image_url'),
        link=data.get('link')
    )
    db.session.add(project)
    db.session.commit()
    
    return jsonify({'message': 'Project created successfully', 'data': project.to_dict()}), 201

@admin_bp.route('/projects/<int:project_id>', methods=['PUT'])
def admin_update_project(project_id):
    """Admin: Update a project"""
    project = Project.query.get(project_id)
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    data = request.get_json()
    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.image_url = data.get('image_url', project.image_url)
    project.link = data.get('link', project.link)
    
    db.session.commit()
    
    return jsonify({'message': 'Project updated successfully', 'data': project.to_dict()}), 200

@admin_bp.route('/projects/<int:project_id>', methods=['DELETE'])
def admin_delete_project(project_id):
    """Admin: Delete a project"""
    project = Project.query.get(project_id)
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    db.session.delete(project)
    db.session.commit()
    
    return jsonify({'message': 'Project deleted successfully'}), 200

# Clients Management
@admin_bp.route('/clients', methods=['GET'])
def admin_get_clients():
    """Admin: Get all clients"""
    clients = Client.query.all()
    return jsonify([client.to_dict() for client in clients])

@admin_bp.route('/clients', methods=['POST'])
def admin_create_client():
    """Admin: Create a new client testimonial"""
    data = request.get_json()
    
    if not data.get('name') or not data.get('testimonial'):
        return jsonify({'error': 'Name and testimonial are required'}), 400
    
    client = Client(
        name=data['name'],
        testimonial=data['testimonial'],
        image_url=data.get('image_url'),
        rating=data.get('rating', 5)
    )
    db.session.add(client)
    db.session.commit()
    
    return jsonify({'message': 'Client added successfully', 'data': client.to_dict()}), 201

@admin_bp.route('/clients/<int:client_id>', methods=['PUT'])
def admin_update_client(client_id):
    """Admin: Update a client"""
    client = Client.query.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    data = request.get_json()
    client.name = data.get('name', client.name)
    client.testimonial = data.get('testimonial', client.testimonial)
    client.image_url = data.get('image_url', client.image_url)
    client.rating = data.get('rating', client.rating)
    
    db.session.commit()
    
    return jsonify({'message': 'Client updated successfully', 'data': client.to_dict()}), 200

@admin_bp.route('/clients/<int:client_id>', methods=['DELETE'])
def admin_delete_client(client_id):
    """Admin: Delete a client"""
    client = Client.query.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    db.session.delete(client)
    db.session.commit()
    
    return jsonify({'message': 'Client deleted successfully'}), 200

# Contact Forms
@admin_bp.route('/contact-submissions', methods=['GET'])
def admin_get_contact_submissions():
    """Admin: Get all contact form submissions"""
    submissions = ContactForm.query.all()
    return jsonify([submission.to_dict() for submission in submissions])

@admin_bp.route('/contact-submissions/<int:submission_id>', methods=['DELETE'])
def admin_delete_contact_submission(submission_id):
    """Admin: Delete a contact submission"""
    submission = ContactForm.query.get(submission_id)
    
    if not submission:
        return jsonify({'error': 'Submission not found'}), 404
    
    db.session.delete(submission)
    db.session.commit()
    
    return jsonify({'message': 'Submission deleted successfully'}), 200

# Newsletter
@admin_bp.route('/newsletter-subscribers', methods=['GET'])
def admin_get_newsletter_subscribers():
    """Admin: Get all newsletter subscribers"""
    subscribers = Newsletter.query.all()
    return jsonify([subscriber.to_dict() for subscriber in subscribers])

@admin_bp.route('/newsletter-subscribers/<int:subscriber_id>', methods=['DELETE'])
def admin_delete_newsletter_subscriber(subscriber_id):
    """Admin: Delete a newsletter subscriber"""
    subscriber = Newsletter.query.get(subscriber_id)
    
    if not subscriber:
        return jsonify({'error': 'Subscriber not found'}), 404
    
    db.session.delete(subscriber)
    db.session.commit()
    
    return jsonify({'message': 'Subscriber deleted successfully'}), 200
