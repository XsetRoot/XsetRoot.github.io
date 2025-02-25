// Agregar al inicio del archivo
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme);

// Verificar preferencia guardada
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function toggleContent(id) {
    const content = document.getElementById(id);
    const timelineItem = content.closest('.timeline-item');
    
    if (content) {
        // Si hay otro contenido abierto, cerrarlo con animación
        const activeContents = document.querySelectorAll('.content.active');
        activeContents.forEach(activeContent => {
            if (activeContent !== content) {
                activeContent.style.animation = 'slideUp 0.5s ease forwards';
                setTimeout(() => {
                    activeContent.classList.remove('active');
                    activeContent.style.animation = '';
                }, 500);
            }
        });

        // Toggle del contenido actual
        if (!content.classList.contains('active')) {
            content.classList.add('active');
            timelineItem.classList.add('active');
        } else {
            content.style.animation = 'slideUp 0.5s ease forwards';
            setTimeout(() => {
                content.classList.remove('active');
                timelineItem.classList.remove('active');
                content.style.animation = '';
            }, 500);
        }
    }
}

// Función para desplazamiento suave
function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    window.scrollTo({
        top: targetSection.offsetTop - 80, // 80px de offset para la navegación fija
        behavior: 'smooth'
    });
}

// Inicializar los event listeners cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Manejar el modo oscuro
    const toggleSwitch = document.getElementById('checkbox');
    
    // Verificar el tema guardado
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    // Función para cambiar el tema
    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Manejar la apertura/cierre de información
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Evitar que el clic se propague si es en el contenido
            if (e.target.closest('.content') && !e.target.closest('.content').classList.contains('active')) {
                return;
            }
            
            const contentId = this.querySelector('.content').id;
            toggleContent(contentId);
        });
    });

    // Función global para toggle (por si se necesita)
    window.toggleContent = function(id) {
        const content = document.getElementById(id);
        if (content) {
            const timelineItem = content.closest('.timeline-item');
            
            if (!content.classList.contains('active')) {
                // Cerrar cualquier contenido abierto
                const activeContents = document.querySelectorAll('.content.active');
                activeContents.forEach(activeContent => {
                    if (activeContent !== content) {
                        closeContent(activeContent);
                    }
                });

                // Abrir el nuevo contenido
                content.classList.add('active');
                if (timelineItem) {
                    timelineItem.classList.add('active');
                }
            } else {
                // Cerrar el contenido actual
                closeContent(content);
                if (timelineItem) {
                    timelineItem.classList.remove('active');
                }
            }
        }
    };

    // Función para cerrar contenido con animación
    function closeContent(content) {
        content.classList.add('closing');
        content.classList.remove('active');
        
        // Esperar a que termine la animación
        setTimeout(() => {
            content.classList.remove('closing');
        }, 500); // Este tiempo debe coincidir con la duración de la transición en CSS
    }

    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Inicializar las animaciones de scroll
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Manejar el scroll suave para los enlaces
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Crear la red neuronal
    function createNeuralNetwork() {
        const container = document.querySelector('.neural-network');
        const numberOfNodes = 20;
        const nodes = [];

        // Crear nodos
        for (let i = 0; i < numberOfNodes; i++) {
            const node = document.createElement('div');
            node.className = 'node';
            
            // Posición aleatoria
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.animationDelay = `${Math.random() * 2}s`;
            
            container.appendChild(node);
            nodes.push({ element: node, x, y });
        }

        // Crear conexiones entre nodos
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(targetNode => {
                // Calcular distancia entre nodos
                const dx = targetNode.x - node.x;
                const dy = targetNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Crear conexión solo si los nodos están lo suficientemente cerca
                if (distance < 30) {
                    const connection = document.createElement('div');
                    connection.className = 'connection';
                    
                    // Calcular posición y rotación
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    connection.style.width = `${distance}%`;
                    connection.style.left = `${node.x}%`;
                    connection.style.top = `${node.y}%`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    connection.style.animationDelay = `${Math.random() * 4}s`;
                    
                    container.appendChild(connection);
                }
            });
        });

        // Animación de movimiento suave
        function animateNodes() {
            nodes.forEach(node => {
                const newX = parseFloat(node.element.style.left) + (Math.random() - 0.5) * 0.5;
                const newY = parseFloat(node.element.style.top) + (Math.random() - 0.5) * 0.5;
                
                if (newX > 0 && newX < 100) node.element.style.left = `${newX}%`;
                if (newY > 0 && newY < 100) node.element.style.top = `${newY}%`;
            });
            
            requestAnimationFrame(animateNodes);
        }
        
        animateNodes();
    }

    createNeuralNetwork();

    // Manejar la visibilidad del contenido principal
    const mainContent = document.querySelector('main');
    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton && mainContent) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de click en el botón
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // Hacer visible el contenido principal
            mainContent.classList.add('visible');

            // Scroll suave
            const scrollTarget = window.innerHeight;
            
            // Animación suave personalizada
            const startPosition = window.pageYOffset;
            const distance = scrollTarget - startPosition;
            const duration = 1500;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);

                const easeInOutCubic = progress => {
                    return progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                };

                window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        });
    }

    // Mantener las animaciones del botón
    ctaButton.addEventListener('mouseenter', function(e) {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.animation = 'none';
        }
    });

    ctaButton.addEventListener('mouseleave', function(e) {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.animation = 'bounceArrow 2s infinite';
        }
    });
});

// Función para resaltar la sección actual en la navegación
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.timeline-item');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Añadir el evento scroll para actualizar la navegación activa
window.addEventListener('scroll', updateActiveNavLink);

// Añadir animación de salida
