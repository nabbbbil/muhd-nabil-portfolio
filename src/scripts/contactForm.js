import { portfolioData } from '../data/portfolioData.js';

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const steps = form.querySelectorAll('.cform__step');
  const countEl = document.getElementById('cfStepNow');
  const labelEl = document.getElementById('cfStepLabel');
  const nextBtn = document.getElementById('cfNextBtn');
  const backBtn = document.getElementById('cfBackBtn');
  const doneBlock = document.getElementById('cfDone');

  let currentStep = 1;
  const totalSteps = 3;
  let formData = {
    name: '',
    email: '',
    discipline: 'Web Engineering',
    message: ''
  };

  const stepLabels = [
    'Who are you?',
    'What are we building?',
    'Your message'
  ];

  // Pill selectors
  form.querySelectorAll('.cform__pill').forEach(pill => {
    pill.addEventListener('click', () => {
      form.querySelectorAll('.cform__pill').forEach(p => p.classList.remove('is-selected'));
      pill.classList.add('is-selected');
      formData.discipline = pill.dataset.value || pill.textContent;
    });
  });

  function updateStep() {
    steps.forEach((s, idx) => {
      if (idx + 1 === currentStep) {
        s.classList.add('is-active');
      } else {
        s.classList.remove('is-active');
      }
    });

    if (countEl) countEl.textContent = `0${currentStep}`;
    if (labelEl) labelEl.textContent = stepLabels[currentStep - 1];

    if (backBtn) {
      backBtn.style.visibility = currentStep > 1 ? 'visible' : 'hidden';
    }

    if (nextBtn) {
      nextBtn.textContent = currentStep === totalSteps ? 'Dispatch Message' : 'Continue →';
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (currentStep === 1) {
        const nameInput = document.getElementById('cfName');
        const emailInput = document.getElementById('cfEmail');

        if (!nameInput.value.trim() || !emailInput.value.trim()) {
          alert('Please provide your name and email address.');
          return;
        }

        formData.name = nameInput.value.trim();
        formData.email = emailInput.value.trim();
        currentStep = 2;
        updateStep();
      } else if (currentStep === 2) {
        currentStep = 3;
        updateStep();
      } else if (currentStep === 3) {
        const msgInput = document.getElementById('cfMessage');
        formData.message = msgInput ? msgInput.value.trim() : '';

        // Trigger mailto intent with pre-populated fields
        const subject = encodeURIComponent(`[Inquiry] ${formData.discipline} from ${formData.name}`);
        const body = encodeURIComponent(
          `Hi Nabil,\n\nMy name is ${formData.name} (${formData.email}).\nI am interested in: ${formData.discipline}.\n\nMessage:\n${formData.message}\n\nCheers!`
        );

        window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;

        // Show done screen
        form.querySelector('.cform__head').style.display = 'none';
        form.querySelector('.cform__nav').style.display = 'none';
        steps.forEach(s => s.style.display = 'none');
        if (doneBlock) doneBlock.style.display = 'block';
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateStep();
      }
    });
  }

  updateStep();
}
