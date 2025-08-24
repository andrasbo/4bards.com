// animation for hamburger

const menu = document.getElementById('menu');
const l1 = document.getElementById('line1');
const l4 = document.getElementById('line4');
const nav = document.getElementById('nav');

let toggleState = 0;
let hoverEnabled = true;

function animateLine(line, attr, from, to) {
    const steps = 20;
    let i = 0;
    const delta = (to - from) / steps;
    clearInterval(line._timer);
    line._timer = setInterval(() => {
        const val = from + delta * i;
        line.setAttribute(attr, val.toFixed(2));
        if (++i > steps) clearInterval(line._timer);
    }, 15);
}

function animateNavIn(nav) {
    const items = Array.from(nav.children);
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100)     
    });
}

function animateNavOutLeft(nav) {
    const items = Array.from(nav.children).reverse();
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-100%)';
        }, index * 100)     
    });
}

function animateNavOutRight(nav) {
    const items = Array.from(nav.children).reverse();
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(100%)';
        }, index * 100)     
    });
}

menu.addEventListener('mouseenter', () => {
    if (!hoverEnabled) return;
    animateLine(l1, 'x1', +l1.getAttribute('x1'), 6);
    animateLine(l4, 'x2', +l4.getAttribute('x2'), 6);
});

menu.addEventListener('mouseleave', () => {
    if (!hoverEnabled) return;
    animateLine(l1, 'x1', +l1.getAttribute('x1'), 1);
    animateLine(l4, 'x2', +l4.getAttribute('x2'), 11);
});

menu.addEventListener('touchstart', () => {
    animateLine(l1, 'x1', +l1.getAttribute('x1'), 6);
    animateLine(l4, 'x2', +l4.getAttribute('x2'), 6);
});

menu.addEventListener('click', () => {
    toggleState = 1 - toggleState;
    hoverEnabled = false;

    if (toggleState == 1) {
        animateLine(l1, 'x1', +l1.getAttribute('x1'), 6);
        animateLine(l4, 'x2', +l4.getAttribute('x2'), 6);
        animateNavIn(nav);
    } else {
        hoverEnabled = true;
        if (window.screen.width <= 768)
            { animateNavOutRight(nav); }
        else
            { animateNavOutLeft(nav); }
    }

    
});

