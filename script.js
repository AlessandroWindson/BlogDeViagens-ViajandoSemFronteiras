// Função principal que será executada após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona os elementos do sidebar
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const closeSidebar = document.getElementById('closeSidebar');

  // Função para abrir a barra lateral
  sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
  });

  // Função para fechar a barra lateral
  closeSidebar.addEventListener('click', function () {
      sidebar.classList.remove('open');
  });

  // Função para rolar suavemente para as âncoras
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function(link) {
      link.addEventListener('click', function(event) {
          if (this.hash !== "") {
              event.preventDefault();
              const hash = this.hash;
              const target = document.querySelector(hash);
              const targetOffsetTop = target.offsetTop;
              smoothScroll(targetOffsetTop);
          }
      });
  });

  // Função para rolar suavemente
  function smoothScroll(targetOffsetTop) {
      const startPosition = window.pageYOffset;
      const distance = targetOffsetTop - startPosition;
      const duration = 800;
      let start = null;

      function animation(currentTime) {
          if (!start) start = currentTime;
          const progress = currentTime - start;
          const scrollTo = ease(progress, startPosition, distance, duration);
          window.scrollTo(0, scrollTo);
          if (progress < duration) {
              requestAnimationFrame(animation);
          }
      }

      function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
  }

  // Função para animar elementos ao rolar a página
  function animateOnScroll() {
      const elementsToShow = document.querySelectorAll('.show-on-scroll');
      elementsToShow.forEach(function(element) {
          if (isElementInViewport(element)) {
              element.classList.add('animated');
          }
      });
  }

  // Verifica se o elemento está visível na viewport
  function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  // Ativa a animação ao rolar a página
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Atualiza a barra de progresso ao rolar a página
  window.addEventListener('scroll', function() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      document.getElementById('progressBar').style.width = scrolled + '%';
  });

  // Função para rolar para o topo da página suavemente
  function topFunction() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
          window.requestAnimationFrame(topFunction);
          window.scrollTo(0, currentScroll - currentScroll / 8);
      }
  }

  // Função de manipulação de formulário de contato
  (() => {
      "use strict";
      const handleContactForm = form => {
          const clearErrors = () => {
              // Lógica para limpar mensagens de erro
              const errorElements = form.querySelectorAll('.error-message');
              errorElements.forEach(element => {
                  element.textContent = '';
              });
          };
    
          const displayErrors = errors => {
              // Lógica para exibir mensagens de erro
              const errorElements = form.querySelectorAll('.error-message');
              Object.keys(errors).forEach(fieldName => {
                  const errorMessage = errors[fieldName];
                  const errorElement = form.querySelector(`[data-error="${fieldName}"]`);
                  if (errorElement) {
                      errorElement.textContent = errorMessage;
                  }
              });
          };
    
          const submitFormData = formData => {
              // Lógica para enviar dados do formulário para o servidor
              // Exemplo simplificado: enviar dados via fetch API
              fetch(form.getAttribute('action'), {
                  method: 'POST',
                  body: formData
              }).then(response => {
                  if (response.ok) {
                      alert('Formulário enviado com sucesso!');
                      // Lógica adicional após o envio bem-sucedido
                  } else {
                      throw new Error('Erro ao enviar formulário.');
                  }
              }).catch(error => {
                  console.error(error);
                  alert('Erro ao enviar formulário. Por favor, tente novamente mais tarde.');
              });
          };
    
          const validateForm = () => {
              // Lógica para validar formulário
              const errors = {};
              const requiredFields = form.querySelectorAll('[required]');
              requiredFields.forEach(field => {
                  if (!field.value.trim()) {
                      const fieldName = field.getAttribute('name');
                      errors[fieldName] = 'Este campo é obrigatório.';
                  }
              });
              return errors;
          };
    
          const handleSubmit = event => {
              event.preventDefault();
              clearErrors();
              const errors = validateForm();
              if (Object.keys(errors).length === 0) {
                  const formData = new FormData(form);
                  submitFormData(formData);
              } else {
                  displayErrors(errors);
              }
          };
    
          form.addEventListener('submit', handleSubmit);
      };
    
      const contactForms = document.querySelectorAll('.contact-form');
      contactForms.forEach(handleContactForm);
  })();
});
