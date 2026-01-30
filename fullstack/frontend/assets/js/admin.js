const ADMIN_API_URL = 'http://localhost:5000/admin/api';

let currentEditingId = null;
let currentEditingType = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    switchTab('projects');
    setupFormListeners();
    loadAllData();
});

function setupFormListeners() {
    document.getElementById('projectForm').addEventListener('submit', handleProjectSubmit);
    document.getElementById('clientForm').addEventListener('submit', handleClientSubmit);
}

async function loadAllData() {
    await loadProjects();
    await loadClients();
    await loadContactSubmissions();
    await loadNewsletterSubscribers();
}

function switchTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('d-none'));
    
    // Show selected tab
    document.getElementById(`${tab}-tab`).classList.remove('d-none');
}

// ==================== PROJECTS ====================

async function loadProjects() {
    try {
        const response = await fetch(`${ADMIN_API_URL}/projects`);
        const projects = await response.json();
        const container = document.getElementById('projectsList');

        if (!projects || projects.length === 0) {
            container.innerHTML = '<p class="col-12">No projects yet.</p>';
            return;
        }

        container.innerHTML = projects.map(project => `
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    ${project.image_url ? `<img src="${project.image_url}" class="card-img-top" alt="${project.title}">` : '<div style="height: 200px; background: #e9ecef; display: flex; align-items: center; justify-content: center;">No Image</div>'}
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description.substring(0, 100)}...</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-sm btn-warning" onclick="editProject(${project.id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProject(${project.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function editProject(id) {
    // Find the project and populate form
    fetch(`${ADMIN_API_URL}/projects`).then(res => res.json()).then(projects => {
        const project = projects.find(p => p.id === id);
        if (project) {
            document.getElementById('projectTitle').value = project.title;
            document.getElementById('projectDescription').value = project.description;
            document.getElementById('projectImageUrl').value = project.image_url || '';
            document.getElementById('projectLink').value = project.link || '';
            currentEditingId = id;
            currentEditingType = 'project';
            document.getElementById('projectModalTitle').textContent = 'Edit Project';
            new bootstrap.Modal(document.getElementById('projectModal')).show();
        }
    });
}

async function handleProjectSubmit(e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        image_url: document.getElementById('projectImageUrl').value || null,
        link: document.getElementById('projectLink').value || null
    };

    try {
        let url = `${ADMIN_API_URL}/projects`;
        let method = 'POST';

        if (currentEditingId && currentEditingType === 'project') {
            url += `/${currentEditingId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('projectModal')).hide();
            document.getElementById('projectForm').reset();
            currentEditingId = null;
            currentEditingType = null;
            document.getElementById('projectModalTitle').textContent = 'Add New Project';
            await loadProjects();
        }
    } catch (error) {
        console.error('Error saving project:', error);
    }
}

async function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            const response = await fetch(`${ADMIN_API_URL}/projects/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await loadProjects();
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }
}

// ==================== CLIENTS ====================

async function loadClients() {
    try {
        const response = await fetch(`${ADMIN_API_URL}/clients`);
        const clients = await response.json();
        const container = document.getElementById('clientsList');

        if (!clients || clients.length === 0) {
            container.innerHTML = '<p class="col-12">No clients yet.</p>';
            return;
        }

        container.innerHTML = clients.map(client => `
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    ${client.image_url ? `<img src="${client.image_url}" class="card-img-top" alt="${client.name}">` : '<div style="height: 200px; background: #e9ecef; display: flex; align-items: center; justify-content: center;">No Image</div>'}
                    <div class="card-body">
                        <h5 class="card-title">${client.name}</h5>
                        <p class="card-text">${'⭐'.repeat(client.rating)}</p>
                        <p class="card-text small">"${client.testimonial.substring(0, 80)}..."</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-sm btn-warning" onclick="editClient(${client.id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteClient(${client.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading clients:', error);
    }
}

function editClient(id) {
    fetch(`${ADMIN_API_URL}/clients`).then(res => res.json()).then(clients => {
        const client = clients.find(c => c.id === id);
        if (client) {
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientTestimonial').value = client.testimonial;
            document.getElementById('clientImageUrl').value = client.image_url || '';
            document.getElementById('clientRating').value = client.rating;
            currentEditingId = id;
            currentEditingType = 'client';
            document.getElementById('clientModalTitle').textContent = 'Edit Client';
            new bootstrap.Modal(document.getElementById('clientModal')).show();
        }
    });
}

async function handleClientSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('clientName').value,
        testimonial: document.getElementById('clientTestimonial').value,
        image_url: document.getElementById('clientImageUrl').value || null,
        rating: parseInt(document.getElementById('clientRating').value)
    };

    try {
        let url = `${ADMIN_API_URL}/clients`;
        let method = 'POST';

        if (currentEditingId && currentEditingType === 'client') {
            url += `/${currentEditingId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('clientModal')).hide();
            document.getElementById('clientForm').reset();
            currentEditingId = null;
            currentEditingType = null;
            document.getElementById('clientModalTitle').textContent = 'Add New Client';
            await loadClients();
        }
    } catch (error) {
        console.error('Error saving client:', error);
    }
}

async function deleteClient(id) {
    if (confirm('Are you sure you want to delete this client?')) {
        try {
            const response = await fetch(`${ADMIN_API_URL}/clients/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await loadClients();
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    }
}

// ==================== CONTACT SUBMISSIONS ====================

async function loadContactSubmissions() {
    try {
        const response = await fetch(`${ADMIN_API_URL}/contact-submissions`);
        const submissions = await response.json();
        const container = document.getElementById('contactList');

        if (!submissions || submissions.length === 0) {
            container.innerHTML = '<p>No contact submissions yet.</p>';
            return;
        }

        container.innerHTML = `
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${submissions.map(sub => `
                        <tr>
                            <td>${sub.name}</td>
                            <td>${sub.email}</td>
                            <td>${sub.message.substring(0, 50)}...</td>
                            <td>${new Date(sub.created_at).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="deleteContactSubmission(${sub.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading contact submissions:', error);
    }
}

async function deleteContactSubmission(id) {
    if (confirm('Delete this submission?')) {
        try {
            const response = await fetch(`${ADMIN_API_URL}/contact-submissions/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await loadContactSubmissions();
            }
        } catch (error) {
            console.error('Error deleting submission:', error);
        }
    }
}

// ==================== NEWSLETTER SUBSCRIBERS ====================

async function loadNewsletterSubscribers() {
    try {
        const response = await fetch(`${ADMIN_API_URL}/newsletter-subscribers`);
        const subscribers = await response.json();
        const container = document.getElementById('newsletterList');

        if (!subscribers || subscribers.length === 0) {
            container.innerHTML = '<p>No newsletter subscribers yet.</p>';
            return;
        }

        container.innerHTML = `
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Subscribed Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${subscribers.map(sub => `
                        <tr>
                            <td>${sub.email}</td>
                            <td>${new Date(sub.subscribed_at).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="deleteNewsletterSubscriber(${sub.id})">Remove</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading newsletter subscribers:', error);
    }
}

async function deleteNewsletterSubscriber(id) {
    if (confirm('Remove this subscriber?')) {
        try {
            const response = await fetch(`${ADMIN_API_URL}/newsletter-subscribers/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await loadNewsletterSubscribers();
            }
        } catch (error) {
            console.error('Error deleting subscriber:', error);
        }
    }
}
