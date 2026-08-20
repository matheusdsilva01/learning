/**
 * Reusable Quiz Component for Interactive Lessons
 * Provides instant feedback loop, explanation display, and state tracking.
 */
class QuizWidget {
  constructor(containerId, options) {
    this.container = document.getElementById(containerId);
    this.question = options.question;
    this.answers = options.answers; // array of { text, isCorrect, explanation }
    this.hint = options.hint || null;
    this.answered = false;
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.classList.add('quiz-widget');
    this.container.innerHTML = `
      <div class="quiz-question">${this.question}</div>
      <div class="quiz-options">
        ${this.answers.map((ans, idx) => `
          <button class="quiz-option-btn" data-index="${idx}">
            ${ans.text}
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="${this.container.id}-feedback"></div>
    `;

    const buttons = this.container.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.handleSelect(idx, buttons);
      });
    });
  }

  handleSelect(selectedIndex, buttons) {
    if (this.answered) return;
    this.answered = true;

    const selectedAnswer = this.answers[selectedIndex];
    const feedbackEl = document.getElementById(`${this.container.id}-feedback`);

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (this.answers[idx].isCorrect) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('incorrect');
      }
    });

    feedbackEl.className = `quiz-feedback visible callout ${selectedAnswer.isCorrect ? 'success' : 'danger'}`;
    feedbackEl.innerHTML = `
      <div class="callout-title">
        ${selectedAnswer.isCorrect ? '✅ Resposta Correta!' : '❌ Incorreto — Vamos Analisar:'}
      </div>
      <p style="margin: 0.25rem 0 0; color: inherit;">${selectedAnswer.explanation}</p>
    `;
  }
}

window.QuizWidget = QuizWidget;
