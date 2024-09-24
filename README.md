# Marvel Comics

## Descrição do Projeto

<p>O projeto <strong>Marvel Comics</strong> foi desenvolvido com <strong>React</strong> e <strong>TypeScript</strong>, utilizando <strong>Vite</strong> e <strong>Nx</strong> como ferramentas de desenvolvimento. Ele lista os personagens da <a href="https://developer.marvel.com" target="_blank">API da Marvel</a>, exibindo detalhes de cada personagem através de um modal. O projeto inclui disponibilidade nos idiomas Português e Inglês.</p>

<p>Inicialmente o usuário é direcionado a criar um perfil com dados básicos.</p>
<p>Após, o usuário é direcionado a uma páginas em que os personagens da marvel são listados com paginação, e ao clicar em um personagem, um modal exibe detalhes adicionais sobre ele. Além disso, ele pode favoritar seus personagens favoritos que aparecerá em outra tela.</p>

<p>O usuário pode optar por ver a lista dos personagens favoritas cliando em "ver favoritos" no topo.</p>
<p>Ele também consegue editar seu perfil clicando no icone de pessoa no topo direito.</p>

<p align="center">
 <a href="#status">Status</a> •
 <a href="#objetivo">Objetivo</a> • 
 <a href="#features">Features</a> • 
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#pré-requisitos">Pré-requisitos</a> • 
 <a href="#rodar-o-projeto">Rodar o Projeto</a> • 
 <a href="#autor">Autor</a>
</p>

## Status

<h4>Em desenvolvimento... 🚀</h4>

## Objetivo

<p>Este projeto foi criado para demonstrar o uso de diversas tecnologias como Nx, Vite, e Redux, além de explorar o consumo de APIs externas, como a da Marvel, com uma arquitetura limpa e escalável.</p>

### Features

- [x] Lista de personagens com paginação
- [x] Detalhamento de personagens em modal
- [x] Arquitetura escalável com Nx
- [x] Suporte a múltiplos idiomas com React i18n
- [] Testes unitários completos

### Tecnologias

- [Nx](https://nx.dev/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MUI](https://mui.com/)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [React i18n](https://react.i18next.com/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress](https://www.cypress.io/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Query (TanStack Query)](https://tanstack.com/query/latest)

### Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) 18 ou superior
- [npm](https://www.npmjs.com/)

### Rodar o Projeto

```bash
# Clone este repositório
$ git clone https://github.com/gustavokunde/marvel-comics.git

# Instale as dependências
$ npm install


#Insira os valores em um .env seguindo o exemplo do .env.example

#Para rodar o json:server inclua o arquivo db.json com {user:[]} internamente

# Inicie o projeto mock
$ npm run start:json-server

# Inicie o projeto web
$ npm run start
```

### Autor

<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/51379380?v=4" width="80px;" alt=""/> <br /> <sub><b>Gustavo Kunde</b></sub>
[linkedin](https://www.linkedin.com/in/gustavokunde/)
