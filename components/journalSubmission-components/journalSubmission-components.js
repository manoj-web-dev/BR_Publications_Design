

let currentStep = 1;
const totalSteps = 5;

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    updateStepDisplay();
    updateProgressLine();

    // File input handler
    document.getElementById('fileInput').addEventListener('change', function (e) {
        const files = e.target.files;
        const filesList = document.getElementById('filesList');

        for (let file of files) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                    <div class="file-info">
                        <div class="file-icon">
                            <i class="fas fa-file-${getFileIcon(file.name)}"></i>
                        </div>
                        <div class="file-details">
                            <h4>${file.name}</h4>
                            <p>${formatFileSize(file.size)} • Uploaded just now</p>
                        </div>
                    </div>
                    <button class="btn btn-secondary" style="padding: 8px 15px;" onclick="this.parentElement.remove()">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
            filesList.appendChild(fileItem);
        }
    });

    // Step click handlers
    document.querySelectorAll('.step-item').forEach(step => {
        step.addEventListener('click', function () {
            const stepNum = parseInt(this.dataset.step);
            if (stepNum < currentStep || this.classList.contains('completed')) {
                goToStep(stepNum);
            }
        });
    });
});

function nextStep(step) {
    // Validate current step
    if (!validateStep(currentStep)) {
        showAlert('Please complete all required fields before continuing.', 'warning');
        return;
    }

    // Mark current step as completed
    document.querySelector(`.step-item[data-step="${currentStep}"]`).classList.add('completed');

    currentStep = step;
    updateStepDisplay();
    updateProgressLine();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
    currentStep = step;
    updateStepDisplay();
    updateProgressLine();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToStep(step) {
    currentStep = step;
    updateStepDisplay();
    updateProgressLine();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepDisplay() {
    // Update step indicators
    document.querySelectorAll('.step-item').forEach((step) => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active');

        if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });

    // Update content visibility
    document.querySelectorAll('.step-content').forEach((content) => {
        content.classList.remove('active');
    });
    document.getElementById(`step${currentStep}`).classList.add('active');
}

function updateProgressLine() {
    const progressLine = document.getElementById('progressLine');
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressLine.style.width = percentage + '%';
}

function validateStep(step) {
    const stepElement = document.getElementById(`step${step}`);
    const requiredInputs = stepElement.querySelectorAll('[required]');

    for (let input of requiredInputs) {
        if (input.type === 'checkbox') {
            if (!input.checked) return false;
        } else if (input.value.trim() === '') {
            return false;
        }
    }

    return true;
}

function finishSubmission() {
    const btn = event.target;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;

    // Simulate submission
    setTimeout(() => {
        document.querySelector(`.step-item[data-step="${currentStep}"]`).classList.add('completed');
        nextStep(5);
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 2000);
}

function cancelSubmission() {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        window.location.href = '/dashboard';
    }
}

function reviewSubmission() {
    showAlert('Opening submission review page...', 'info');
    setTimeout(() => {
        window.location.href = '/submissions/review';
    }, 1500);
}

function createNewSubmission() {
    if (confirm('Start a new submission? Current progress will be saved.')) {
        location.reload();
    }
}

function returnToDashboard() {
    window.location.href = '/dashboard';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'pdf': 'pdf',
        'doc': 'word',
        'docx': 'word',
        'txt': 'alt',
        'rtf': 'alt'
    };
    return icons[ext] || 'alt';
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '400px';
    alertDiv.style.animation = 'slideInRight 0.3s ease';

    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };

    alertDiv.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-${icons[type]}"></i>
            </div>
            <div class="alert-content">${message}</div>
        `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add animations for alerts
const style = document.createElement('style');
style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
document.head.appendChild(style);

function addContributor() {
    console.log('Add Contributor button clicked');
    const template = document.getElementById('contributorModalTemplate');
    const modal = template.content.cloneNode(true);

    document.body.appendChild(modal);

}

function closeModal() {
    const modal = document.getElementById("contributorModal");
    if (modal) modal.remove();
}


