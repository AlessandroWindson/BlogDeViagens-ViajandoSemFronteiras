import React, { useState, useEffect } from 'react'; // Importa o React e os hooks useState e useEffect
import ReactDOM from 'react-dom'; // Importa ReactDOM para renderizar o aplicativo

// Componente de barra de progresso
const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // Define o estado para o progresso de rolagem

  // Efeito para atualizar o progresso de rolagem quando a página é rolada
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // Obtém a posição de rolagem atual
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight; // Calcula a altura total da página
      const scrolled = (scrollTop / scrollHeight) * 100; // Calcula o progresso de rolagem em porcentagem
      setScrollProgress(scrolled); // Atualiza o estado do progresso de rolagem
    };

    window.addEventListener('scroll', handleScroll); // Adiciona um ouvinte de evento de rolagem

    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove o ouvinte de evento de rolagem ao desmontar o componente
    };
  }, []);

  // Retorna a barra de progresso com a largura dinâmica com base no progresso de rolagem
  return (
    <div className="progress-container fixed-top">
      <div className="progress-bar bg-success" role="progressbar" style={{ width: `${scrollProgress}%` }} aria-valuenow={scrollProgress} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  );
};

// Componente principal do aplicativo
const App = () => {
  const [loading, setLoading] = useState(true); // Define o estado para indicar se o aplicativo está carregando
  const [data, setData] = useState(null); // Define o estado para armazenar os dados

  // Efeito para simular um tempo de carregamento e obter dados fictícios
  useEffect(() => {
    setTimeout(() => {
      const fakeData = {
        title: "Viajando Sem Fronteiras - Destaques",
        destinations: [
          { id: 1, name: "Destino dos Sonhos", description: "Explore lugares incríveis ao redor do mundo." },
          { id: 2, name: "Cultura Local", description: "Descubra as tradições e costumes dos destinos visitados." },
          { id: 3, name: "Aventuras Inesquecíveis", description: "Viva experiências únicas em cada viagem." }
        ]
      };

      setData(fakeData); // Define os dados fictícios
      setLoading(false); // Atualiza o estado para indicar que o carregamento foi concluído
    }, 2000);
  }, []);

  // Efeito para lidar com a rolagem da página e a exibição da barra lateral
  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.getElementById('sidebar');
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const links = document.querySelectorAll('a[href^="#"]');

      if (scrollTop > 50) {
        sidebar.style.display = 'block'; // Exibe a barra lateral ao rolar além de 50 pixels
      } else {
        sidebar.style.display = 'none'; // Oculta a barra lateral quando a rolagem é menor que 50 pixels
      }

      links.forEach(link => {
        const hash = link.hash;
        const target = document.querySelector(hash);
        const targetOffsetTop = target.offsetTop;
        if (scrollTop >= targetOffsetTop) {
          link.classList.add('active'); // Adiciona a classe 'active' ao link quando a seção correspondente está visível na tela
        } else {
          link.classList.remove('active'); // Remove a classe 'active' quando a seção correspondente não está visível na tela
        }
      });
    };

    window.addEventListener('scroll', handleScroll); // Adiciona um ouvinte de evento de rolagem

    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove o ouvinte de evento de rolagem ao desmontar o componente
    };
  }, []);

  // Função para rolar suavemente para uma seção específica
  const smoothScroll = targetOffsetTop => {
    const startPosition = window.pageYOffset;
    const distance = targetOffsetTop - startPosition;
    const duration = 800;
    let start = null;

    const animation = currentTime => {
      if (!start) start = currentTime;
      const progress = currentTime - start;
      const scrollTo = ease(progress, startPosition, distance, duration);
      window.scrollTo(0, scrollTo);
      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  // Função para lidar com o clique no botão de alternância da barra lateral
  const handleSidebarToggle = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open'); // Adiciona ou remove a classe 'open' para abrir ou fechar a barra lateral
  };

  // Função para lidar com o clique em um link de âncora
  const handleAnchorClick = event => {
    event.preventDefault();
    const hash = event.target.hash;
    const target = document.querySelector(hash);
    const targetOffsetTop = target.offsetTop;
    smoothScroll(targetOffsetTop); // Rola suavemente para a seção correspondente ao link de âncora clicado
  };

  // Retorna o conteúdo do aplicativo, incluindo a barra de progresso, a barra de navegação e as seções
  return (
    <div>
      <ProgressBar /> {/* Renderiza a barra de progresso */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* Barra de navegação */}
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" onClick={handleSidebarToggle}> {/* Botão de alternância da barra lateral */}
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div id="sidebar" className="bg-dark text-light" style={{ display: 'none' }}> {/* Barra lateral */}
        <button id="closeSidebar" className="btn btn-light" onClick={handleCloseSidebar}>Fechar</button>
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link active" href="#section1" onClick={handleAnchorClick}>Section 1</a></li>
          <li className="nav-item"><a className="nav-link" href="#section2" onClick={handleAnchorClick}>Section 2</a></li>
          <li className="nav-item"><a className="nav-link" href="#section3" onClick={handleAnchorClick}>Section 3</a></li>
        </ul>
      </div>
      <div id="content"> {/* Seções de conteúdo */}
        <div id="section1" className="container">
          <h2>Section 1</h2>
          <p>Content for Section 1</p>
        </div>
        <div id="section2" className="container">
          <h2>Section 2</h2>
          <p>Content for Section 2</p>
        </div>
        <div id="section3" className="container">
          <h2>Section 3</h2>
          <p>Content for Section 3</p>
        </div>
      </div>
    </div>
  );
};

// Renderiza o aplicativo dentro do elemento root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
