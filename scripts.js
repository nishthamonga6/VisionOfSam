const counters = document.querySelectorAll('.counter');
const speed = 200; // Adjust speed of the animation

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCounter = () => {
            const currentValue = +counter.innerText;

            if (currentValue < target) {
                counter.innerText = Math.ceil(currentValue + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target; // Ensures the final value matches the target
            }
        };

        updateCounter();
    });
};

// Trigger animation on scroll
const counterSection = document.querySelector('.counter-section');
let counterStarted = false;

window.addEventListener('scroll', () => {
    const sectionPosition = counterSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (sectionPosition < screenPosition && !counterStarted) {
        animateCounters();
        counterStarted = true; // Prevents re-triggering the animation
    }
});