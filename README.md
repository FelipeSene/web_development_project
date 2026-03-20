# Hollow Knight - Página Web

Site temático sobre o jogo **Hollow Knight**, desenvolvido originalmente em 2021 durante o primeiro ano do curso técnico em Desenvolvimento de Sistemas na ETEC, e posteriormente refatorado com boas práticas de desenvolvimento web.

**[Acesse o site](https://felipesene.github.io/web_development_project/)**

---

## Contexto

Este projeto foi criado do zero em 2021, antes mesmo de qualquer contato com frameworks ou ferramentas modernas. Todo o código foi escrito manualmente, sem bibliotecas externas, como exercício de aprendizado de HTML e CSS.

O projeto original chegou a **+700 linhas de HTML** e **+1000 linhas de CSS**, resultado de uma estilização individual por elemento.

Em 2026, o projeto passou por um processo completo de refatoração, mantendo o design original e adicionando responsividade e boas práticas.

---

## Tecnologias

- **HTML5** - estrutura semântica com tags apropriadas (`header`, `main`, `section`, `footer`)
- **CSS3** - variáveis CSS, Flexbox, Grid, media queries e animações
- **JavaScript** - manipulação de DOM para menu mobile, carrossel de imagens, scroll suave e overlay do mapa

---

## O que foi refatorado

| Antes | Depois |
|---|---|
| +700 linhas de HTML | ~175 linhas |
| +1000 linhas de CSS | ~400 linhas |
| Sem responsividade | Mobile-first com breakpoints |
| Altura fixa em `px` por seção | `min-height: 100vh` + layout fluido |
| Sliders com radio buttons em CSS | Carrossel JS com suporte a swipe |
| Sem JavaScript | Menu hambúrguer, carrossel e mapa fullscreen |
| Classes únicas por elemento | Classes reutilizáveis e variáveis CSS |
| Sem semântica HTML | Tags semânticas e atributos de acessibilidade |

---
 
## Funcionalidades

- Navegação com menu dropdown e versão hambúrguer para mobile
- Carrossel de imagens com dots de navegação e suporte a swipe
- Imagem do mapa expansível em tela cheia ao clicar
- Scroll suave entre seções
- Player de áudio com trilhas do jogo
- Player de vídeo integrado

---

## Autor

**Felipe Sene Souza**

Estudante de Análise e Desenvolvimento de Sistemas - IFSP
 
