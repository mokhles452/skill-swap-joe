(function() {
    emailjs.init("OiT3U7kR8txef7ceo");
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('skillForm');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const skillOptions = document.querySelectorAll('.skill-option');
    const manualSkillInput = document.getElementById('manualSkill');
    const addManualSkillBtn = document.getElementById('addManualSkill');
    const selectedSkillsContainer = document.getElementById('selectedSkills');
    const floatingRobot = document.querySelector('.floating-robot');
    const bigRobot = document.getElementById('bigRobot');
    const skillsWantInput = document.createElement('input');

    // Create hidden input to store selected skills
    skillsWantInput.type = 'hidden';
    skillsWantInput.name = 'skillsWant';
    skillsWantInput.id = 'skillsWant';
    form.insertBefore(skillsWantInput, form.lastElementChild);

    let selectedSkills = [];

    // Add hover effect to robot
    floatingRobot.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.filter = 'drop-shadow(0 0 20px rgba(255, 204, 0, 0.9))';
    });

    floatingRobot.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.filter = 'drop-shadow(0 0 15px rgba(255, 204, 0, 0.7))';
    });

    // Category selection
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding skills
            document.querySelectorAll('.skills-options').forEach(option => {
                option.classList.remove('show');
            });
            document.querySelector(`.skills-options.${category}`).classList.add('show');
        });
    });

    // Skill selection
    skillOptions.forEach(option => {
        option.addEventListener('click', function() {
            const skill = this.textContent;

            if (this.classList.contains('selected')) {
                // Remove skill
                this.classList.remove('selected');
                selectedSkills = selectedSkills.filter(s => s !== skill);
            } else {
                // Add skill
                this.classList.add('selected');
                selectedSkills.push(skill);

                // Add bounce effect
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            }

            updateSelectedSkills();
        });
    });

    // Add manual skill
    addManualSkillBtn.addEventListener('click', function() {
        const skill = manualSkillInput.value.trim();

        if (skill && !selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            manualSkillInput.value = '';
            updateSelectedSkills();

            // Add bounce effect to button
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        }
    });

    // Also allow adding manual skill with Enter key
    manualSkillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addManualSkillBtn.click();
        }
    });

    // Update the selected skills display and hidden input
    function updateSelectedSkills() {
        selectedSkillsContainer.innerHTML = '';

        selectedSkills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'selected-skill';
            skillElement.innerHTML = `
                ${skill}
                <span class="remove-skill">&times;</span>
            `;

            // Add remove functionality
            skillElement.querySelector('.remove-skill').addEventListener('click', function() {
                selectedSkills = selectedSkills.filter(s => s !== skill);
                updateSelectedSkills();

                // Also remove selection from skill options if it exists there
                skillOptions.forEach(option => {
                    if (option.textContent === skill) {
                        option.classList.remove('selected');
                    }
                });
            });

            selectedSkillsContainer.appendChild(skillElement);
        });

        // Update hidden input
        skillsWantInput.value = selectedSkills.join(', ');
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate at least one skill is selected
        if (selectedSkills.length === 0) {
            alert('Please select at least one skill you want to learn');
            return;
        }

        // Show loading state
        loading.style.display = 'flex';
        floatingRobot.style.animation = 'none';
        floatingRobot.style.transform = 'rotate(360deg)';

        // Reset robot animation after spin
        setTimeout(() => {
            floatingRobot.style.animation = 'floatRobot 8s ease-in-out infinite';
            floatingRobot.style.transform = 'rotate(0)';
        }, 1000);

        emailjs.send("service_f5zed3v", "template_d16dwuv", {
                fullName: document.getElementById('fullName').value,
                college: document.getElementById('college').value,
                major: document.getElementById('major').value,
                whatsapp: document.getElementById('whatsapp').value,
                skillsHave: document.getElementById('skillsHave').value,
                skillsWant: selectedSkills.join(', ')
            })
            .then(function(response) {
                loading.style.display = 'none';
                successMessage.style.display = 'flex';
                bigRobot.style.display = 'flex';

                // Hide success message after 2 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 2000);

                // Hide big robot after 5 seconds
                setTimeout(() => {
                    bigRobot.style.display = 'none';
                    form.reset();
                    selectedSkills = [];
                    updateSelectedSkills();

                    // Reset skill selections
                    skillOptions.forEach(option => {
                        option.classList.remove('selected');
                    });
                }, 5000);
            }, function(error) {
                loading.style.display = 'none';
                alert('Failed to send. Please try again later.');
                console.error('EmailJS Error:', error);
            });
    });

    // Add animations to form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
    });

    // Create particles dynamically
    function createParticles() {
        const particlesContainer = document.querySelector('.background-animation');
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random size between 5px and 20px
            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random animation duration and delay
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();
});