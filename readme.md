# Vidarix

Vidarix é um projeto de plataforma de streaming estilo Netflix, que permite aos usuários explorar filmes e séries, visualizar trailers, pesquisar conteúdos e filtrar por gêneros. Ele também conta com um **banner de destaque** para o filme ou série em alta, além de modais para detalhes completos de cada título.

## Funcionalidades

- Exibição de filmes e séries em alta.
- Banner com destaque para o conteúdo mais relevante.
- Pesquisa de filmes e séries por título.
- Filtros por gênero para filmes e séries.
- Modal detalhado com trailer e sinopse do filme ou série.
- Layout responsivo para desktop e dispositivos móveis.
- Footer personalizado com crédito do desenvolvedor.

## Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construção da interface do usuário.
- **Next.js**: Framework React para renderização do lado do servidor e rotas simplificadas.
- **Tailwind CSS**: Framework de estilização para criar um design moderno e responsivo.
- **TMDB API**: API externa utilizada para buscar filmes, séries e trailers.

## Como usar

1. Instale as dependências:

```bash
npm install
```

2. Configure sua **API key** do TMDB em `utils/tmdb.js`.

3. Rode o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

4. Abra seu navegador em [http://localhost:3000](http://localhost:3000) para visualizar o projeto.

## Créditos

🧑🏻‍💻 Desenvolvido por **Janderson Vidal**

## Observações

- Projeto frontend apenas, sem backend próprio.
- Requer conexão com a internet para consumir dados da TMDB API.

