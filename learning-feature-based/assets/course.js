(() => {
  const storageKey = 'feature-boundaries-course-progress';
  const lessonId = document.body.dataset.lesson;

  function readProgress() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  }

  function writeProgress(progress) {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  function updateProgressUI() {
    const progress = readProgress();
    const completeCount = Object.values(progress).filter(Boolean).length;
    const total = Number(document.body.dataset.lessonTotal || 9);
    const percentage = Math.min(100, Math.round((completeCount / total) * 100));

    document.querySelectorAll('[data-progress-bar]').forEach((bar) => {
      bar.style.width = `${percentage}%`;
    });
    document.querySelectorAll('[data-progress-label]').forEach((label) => {
      label.textContent = `${completeCount} de ${total} lições marcadas`;
    });
    document.querySelectorAll('[data-lesson-card]').forEach((card) => {
      card.dataset.complete = progress[card.dataset.lessonCard] ? 'true' : 'false';
    });
  }

  if (lessonId) {
    const button = document.querySelector('[data-complete-lesson]');
    if (button) {
      const progress = readProgress();
      button.textContent = progress[lessonId] ? 'Lição marcada como concluída' : 'Marcar lição como concluída';
      button.addEventListener('click', () => {
        const next = readProgress();
        next[lessonId] = !next[lessonId];
        writeProgress(next);
        button.textContent = next[lessonId] ? 'Lição marcada como concluída' : 'Marcar lição como concluída';
        updateProgressUI();
      });
    }
  }

  updateProgressUI();
})();
