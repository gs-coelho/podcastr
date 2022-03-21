# Podcastr

Podcstr é uma homepage para um podcast fictício, desenvolvido durante a trilha de React da Next Level Week 5, um bootcamp da RocketSeat. O app foi desenvolvido utilizando React e Next.js, usando a cli [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requisitos

Para executar esse projeto, é necessário ter o [Node.js](https://nodejs.org/pt-br/) instalado na sua máquina.

Utilizando o Node.js, instale o Yarn na sua máquina com seguinte comando:

```bash
npm install -g yarn
```

## Executando o projeto

Tendo instalado o Yarn, utilize-o para instalar as dependências do projeto:

```bash
yarn install
```

O projeto pode ser executado de duas maneiras: em modo de desenvolvimento, ou em modo de produção. Em ambos os modos, é necessário iniciar o servidor que serve a API de episódios que a aplicação consulta.

Para iniciar esse servidor, execute no terminal o seguinte comando:

```bash
yarn server
```

Ao fazer isso, o servidor da API será executado em [http://localhost:3333](http://localhost:3333).

### Executando em modo de desenvolvimento

Nesse modo, o projeto é executado de maneira mais rápida, mas permite que alterações feitas nas páginas e componentes dentro de `./src` sejam atualizadas no navegador em tempo real. Aqui, a funcionalidade de SSR (Server Side rendering) do Next.js já entra em ação.

Para executar o projeto dessa maneira, execute, em outra janela do terminal (para não interromper a API), o seguinte comando:

```bash
yarn dev
```

Abra o endereço [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado!

### Executando em modo de produção

Nesse modo, primeiro o projeto passa por um estágio de build antes de sua execução, permitindo assim que as funcionalidades de SSG (Static Site Generation) e ISR (Incremental Static Regeneration) passem a agir, melhorando o desempenho do site.

Para executar o projeto dessa maneira, primeiro é necessário dar build no projeto, executando, em outra janela do terminal (para não interromper a API), o seguinte comando:

```bash
yarn build
```

O comando mostra quais páginas foram geradas em avanço, e qual método foi utilizado. Em seguida, a aplicação deve ser iniciada com o comando abaixo:

```bash
yarn start
```

Abra o endereço [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado!