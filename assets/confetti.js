function startConfetti() {
    const confettiCanvas = document.createElement("canvas");
    document.body.appendChild(confettiCanvas);
    const confettiSettings = { target: confettiCanvas, max: 150, size: 1.2 };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => {
        confetti.clear();
        document.body.removeChild(confettiCanvas);
    }, 3000);
}
