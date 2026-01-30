const API_URL = 'http://localhost:5000/api';

// Load projects on page load
document.addEventListener('DOMContentLoaded', loadProjects);
document.addEventListener('DOMContentLoaded', loadClients);
document.addEventListener('DOMContentLoaded', setupFormListeners);

async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const projects = await response.json();
        const container = document.getElementById('projectsContainer');

        if (!projects || projects.length === 0) {
            container.innerHTML = '<p class="text-center">No projects yet. Add your first project!</p>';
            return;
        }

        container.innerHTML = projects.map(project => `
            <div class="col-md-4 mb-4">
                <div class="project-card">
                    ${project.image_url ? `<img src="${project.image_url}" alt="${project.title}">` : '<div style="height: 250px; background: #e9ecef; display: flex; align-items: center; justify-content: center;">No Image</div>'}
                    <div class="card-body">
                        <h5>${project.title}</h5>
                        <p>${project.description}</p>
                        ${project.link ? `<a href="${project.link}" class="btn btn-sm btn-primary" target="_blank">View Project</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsContainer').innerHTML = '<p class="text-center text-danger">Error loading projects</p>';
    }
}

async function loadClients() {
    try {
        const response = await fetch(`${API_URL}/clients`);
        const clients = await response.json();
        const container = document.getElementById('clientsContainer');

        if (!clients || clients.length === 0) {
            container.innerHTML = '<p class="text-center">No client testimonials yet.</p>';
            return;
        }

        container.innerHTML = clients.map(client => `
            <div class="col-md-4 mb-4">
                <div class="client-card">
                    ${client.image_url ? `<img src="${client.image_url}" alt="${client.name}">` : '<div style="width: 80px; height: 80px; border-radius: 50%; background: #e9ecef; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">No Image</div>'}
                    <div class="stars">${'⭐'.repeat(client.rating)}</div>
                    <p>"${client.testimonial}"</p>
                    <h5>${client.name}</h5>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading clients:', error);
        document.getElementById('clientsContainer').innerHTML = '<p class="text-center text-danger">Error loading client testimonials</p>';
    }
}

function setupFormListeners() {
    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    
    // Newsletter Form
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletterSubmit);
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value
    };

    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const messageDiv = document.getElementById('contactMessage');
        
        if (response.ok) {
            messageDiv.innerHTML = '<div class="alert alert-success">Message sent successfully! We\'ll get back to you soon.</div>';
            document.getElementById('contactForm').reset();
        } else {
            messageDiv.innerHTML = '<div class="alert alert-danger">Error sending message. Please try again.</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('contactMessage').innerHTML = '<div class="alert alert-danger">Error sending message.</div>';
    }
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const formData = {
        email: document.getElementById('newsletterEmail').value
    };

    try {
        const response = await fetch(`${API_URL}/newsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const messageDiv = document.getElementById('newsletterMessage');
        
        if (response.ok) {
            messageDiv.innerHTML = '<div class="alert alert-success">Successfully subscribed to our newsletter!</div>';
            document.getElementById('newsletterForm').reset();
        } else {
            const data = await response.json();
            messageDiv.innerHTML = `<div class="alert alert-danger">${data.error || 'Error subscribing. Please try again.'}</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('newsletterMessage').innerHTML = '<div class="alert alert-danger">Error subscribing to newsletter.</div>';
    }
}
