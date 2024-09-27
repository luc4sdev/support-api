## 💻 Support API 

O projeto consiste em um back-end de uma aplicação de suport para o gerenciamento de clientes. 

O projeto foi desenvolvido com Typescript, NodeJS e Fastify.

Para o banco de dados foi utilizada a ORM do Prisma, foi utilizado um container do Docker para fazer a instância do banco de dados.

Também foram realizados testes unitários e E2E e configurada sua execução no CI/CD para garantir a qualidade e robustez contínuas do código.

Foi realizada uma validação de autenticação com token JWT.

Para a documentação da API foi utilizado o Swagger.

O projeto segue as boas práticas de clean clode e princípios do SOLID, DDD e TDD.

O deploy do back-end foi realizado no Render, onde a aplicação está funcional.


<br/>

## 📗 Link da documentação da API

<h2>Link: <a href="https://support-api-3g2f.onrender.com/docs" target="_blank" rel="external">Documentação</a></h2>

<br/>
<br/>

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você tem uma máquina `<Windows / Linux / Mac>`
* Você instalou a versão mais recente do `NodeJS`
* Você instalou a versão mais recente do `Docker`

<br/>

## ⚙️ Instalando

Para instalar execute no terminal:

npm:
```
npm i
```

yarn:
```
yarn install
```

pnpm:
```
pnpm i
```

<br/>
<br/>

## 🚀 Rodando o projeto

Primeiramente crie um arquivo ```.env``` na raíz do projeto e adicione as seguintes variáveis de ambiente e seus respectivos valores:

```
NODE_ENV=dev
PORT="3333"
DATABASE_URL="postgresql://docker:docker@localhost:5432/nodeapi?schema=public"
JWT_SECRET="secret"
```


Digite no terminal:

```
npx prisma generate
```


Após isso, para criar o container Docker digite no terminal:

```
docker compose up -d
```
<br/>


Para popular o banco de dados digite no terminal:

```
npm run seed
```
<br/>

Para rodar o projeto digite no terminal:

npm:
```
npm run dev
```
yarn:
```
yarn dev
```

pnpm:
```
pnpm run dev
```

<br/>
<br/>

## 🧪 Rodando os testes

Foram realizados testes unitários e testes E2E, utilizando o vitest. Para rodar os ```testes unitários``` digite o seguinte comando no terminal:

npm:
```
npm run test
```
yarn:
```
yarn test
```

pnpm:
```
pnpm run test
```

<br/>


Para rodar os ```testes E2E``` digite o seguinte comando no terminal:

npm:
```
npm run test:e2e
```
yarn:
```
yarn test:e2e
```

pnpm:
```
pnpm run test:e2e
```

<br/>
<br/>

## Features
### Auth

- ✅ Token JWT para a autenticação.


### Clientes

- ✅ Não pode haver mais de um cliente com o mesmo email.
- ✅ É possível deletar um cliente.
- ✅ É possível editar.



<br/>



## 🚀 Tecnologias utilizadas

O projeto está desenvolvido utilizando as seguintes tecnologias:

- Typescript <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
- NodeJS <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
- Fastify <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg" />
- Prisma <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" />
- PostgreSQL <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
- Docker <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
- Vitest <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" />
- Swagger <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" />


