document.querySelectorAll("[data-quiz]").forEach((quiz) => {
    const feedback = quiz.querySelector(".quiz-feedback[data-feedback]");
    const buttons = quiz.querySelectorAll("button[data-answer]");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", "false"));
            button.setAttribute("aria-pressed", "true");

            const isCorrect = button.dataset.correct === "true";
            feedback.dataset.state = isCorrect ? "correct" : "incorrect";
            feedback.textContent = isCorrect
                ? quiz.dataset.correctFeedback
                : (button.dataset.feedback ?? quiz.dataset.incorrectFeedback);
        });
    });
});
