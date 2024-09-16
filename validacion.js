document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
      // Evita el envío si el formulario no es válido o si el honeypot está lleno
      if (!validarFormulario()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Añade las clases de Bootstrap para mostrar validaciones
      form.classList.add('was-validated');
    });

    // Validación adicional para el campo de correo
    const emailInput = document.getElementById('validationDefaultUsername');
    emailInput.addEventListener('input', function () {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }
    });
  });

  function validarFormulario() {
    const campos = document.querySelectorAll('input[required]');
    let esValido = true;

    campos.forEach(campo => {
      if (!campo.checkValidity()) {
        campo.setCustomValidity(campo.title);
        esValido = false;
      } else {
        campo.setCustomValidity('');
      }
    });

    // Verificación del honeypot para protección contra SPAM
    const honeypot = document.getElementById('honeypot');
    if (honeypot.value !== "") {
      esValido = false; // Evita el envío del formulario si el honeypot no está vacío
    }

    return esValido;
  }