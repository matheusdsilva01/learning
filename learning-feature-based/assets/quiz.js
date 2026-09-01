class QuizWidget {
  constructor(containerId, options) {
    this.container = document.getElementById(containerId);
    this.question = options.question;
    this.answers = options.answers;
    this.renderAnswers = this.shuffle([...options.answers]);
    this.hint = options.hint || 'Revise a regra e tente novamente.';
    this.attempts = 0;
    this.render();
  }

  shuffle(answers) {
    for (let index = answers.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [answers[index], answers[target]] = [answers[target], answers[index]];
    }
    return answers;
  }

  render() {
    if (!this.container) return;

    this.container.classList.add('quiz-widget');
    this.container.innerHTML = `
      <div class="quiz-question" id="${this.container.id}-question">${this.question}</div>
      <div class="quiz-options" role="group" aria-labelledby="${this.container.id}-question">
        ${this.renderAnswers.map((answer, index) => `
          <button type="button" class="quiz-option-btn" data-index="${index}">${answer.text}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="${this.container.id}-feedback" role="status" aria-live="polite"></div>
    `;

    this.container.querySelectorAll('.quiz-option-btn').forEach((button) => {
      button.addEventListener('click', () => this.handleSelect(button));
    });
  }

  handleSelect(button) {
    const selectedIndex = Number(button.dataset.index);
    const selected = this.renderAnswers[selectedIndex];
    const feedback = this.container.querySelector('.quiz-feedback');
    this.attempts += 1;

    if (selected.isCorrect) {
      button.classList.add('correct');
      this.container.querySelectorAll('.quiz-option-btn').forEach((option) => { option.disabled = true; });
      feedback.className = 'quiz-feedback visible callout success';
      feedback.innerHTML = `<div class="callout-title">Resposta sustentada</div><p>${selected.explanation}</p>`;
      this.container.dataset.complete = 'true';
      return;
    }

    button.classList.add('incorrect');
    button.disabled = true;
    feedback.className = 'quiz-feedback visible callout danger';
    feedback.innerHTML = `<div class="callout-title">Hipótese rejeitada</div><p>${selected.explanation}</p><p><strong>Pista:</strong> ${this.hint}</p>`;
  }
}

window.QuizWidget = QuizWidget;
