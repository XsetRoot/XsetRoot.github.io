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
    const allContents = document.querySelectorAll('.content');
    
    // Cerrar todos los contenidos abiertos
    allContents.forEach(item => {
        if (item.id !== id && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Alternar el contenido seleccionado
    content.classList.toggle('active');
} 