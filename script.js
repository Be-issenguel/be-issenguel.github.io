// Efeito de digitação para título
const typeWriter = () => {
    const texts = [
        'Desenvolvedor Python',
        'Especialista em Machine Learning',
        'Desenvolvedor Django',
        'Analista de Dados'
    ];
    
    let speed = 100;
    let eraseSpeed = 50;
    let textIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    
    const typedElement = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    function type() {
        if (!isErasing && charIndex < texts[textIndex].length) {
            typedElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, speed);
        } else if (!isErasing) {
            isErasing = true;
            setTimeout(type, 2000); // Pausa antes de apagar
        } else if (isErasing && charIndex > 0) {
            typedElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, eraseSpeed);
        } else {
            isErasing = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    
    // Animação do cursor
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity == '0' ? '1' : '0';
    }, 500);
    
    setTimeout(type, 1000);
};

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
        contactForm.reset();
    });
}

// Animação das barras de skill
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
};

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    
    // Observador para animar skills quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('habilidades');
    if (skillsSection) observer.observe(skillsSection);
});

// Adicione ao seu script.js existente
function highlightCode() {
    const codeElement = document.querySelector('.code-snippet code');
    if (!codeElement) return;
    
    const code = codeElement.textContent;
    
    // Colorir as palavras-chave (simples)
    let highlighted = code
        .replace(/\b(import|from|class|def|__init__|return|if|else|for|in)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(MySkills|build_solutions)\b/g, '<span class="class">$1</span>')
        .replace(/\b(self\.\w+)\b/g, '<span class="function">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span class="string">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
    
    codeElement.innerHTML = highlighted;
}

// Chame quando a página carregar
document.addEventListener('DOMContentLoaded', highlightCode);
