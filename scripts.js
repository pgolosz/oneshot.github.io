// Project data storage
let projects = [
    {
        title: "Cosmic Snake",
        type: "game",
        description: "A futuristic take on the classic Snake game with particle effects and cosmic themes.",
        emoji: "🎮",
        link: "#"
    }
];

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectsGrid = document.getElementById('projectsGrid');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        const filter = btn.dataset.filter;
        filterProjects(filter);
    });
});

function filterProjects(filter) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal functionality
function openModal() {
    document.getElementById('addProjectModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addProjectModal').style.display = 'none';
    document.getElementById('addProjectForm').reset();
}

// Add project functionality
document.getElementById('addProjectForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProject = {
        title: formData.get('title'),
        type: formData.get('type'),
        description: formData.get('description'),
        link: formData.get('link') || '#',
        emoji: formData.get('emoji') || getDefaultEmoji(formData.get('type'))
    };

    addProject(newProject);
    closeModal();
});

function getDefaultEmoji(type) {
    const emojiMap = {
        game: '🎮',
        animation: '✨',
        story: '📖',
        art: '🎨',
        tool: '🔧'
    };
    return emojiMap[type] || '📄';
}

function addProject(project) {
    projects.push(project);
    renderProjects();
}

function renderProjects() {
    const addProjectElement = document.querySelector('.add-project');
    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });

    // Re-add the add project section
    projectsGrid.parentNode.appendChild(addProjectElement);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.type = project.type;

    card.innerHTML = `
                <div class="project-image">${project.emoji}</div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-type">${project.type}</div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-actions">
                        <a href="${project.link}" class="btn btn-primary">View Project</a>
                        <a href="#" class="btn btn-secondary">Details</a>
                    </div>
                </div>
            `;

    return card;
}

// Close modal when clicking outside
window.addEventListener('click', function (e) {
    const modal = document.getElementById('addProjectModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
document.head.appendChild(style);