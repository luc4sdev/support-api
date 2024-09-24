## 💻 Routers App 

O projeto consiste em um back-end de uma aplicação de gerenciamento de clientes e roteadores. 

O projeto foi desenvolvido com Typescript, NodeJS e Fastify.

Para o banco de dados foi utilizada a ORM do Prisma e o Elasticsearch para aramazenar os dados, foi utilizado um container do Docker para fazer a instância do banco de dados.

As rotas do Elasticsearch estão documentadas na API do Swagger, para fazer as requisições será necessário inserir o id do servidor, username e password nas variáveis de ambiente.

Também foram realizados testes unitários e E2E e configurada sua execução no CI/CD para garantir a qualidade e robustez contínuas do código. Para os testes E2E funcionarem é preciso inserir as credenciais do Elasticsearch nas variáveis de ambiente.

Para a documentação da API foi utilizado o Swagger.

O projeto segue as boas práticas de clean clode e princípios do SOLID, DDD e TDD.

O deploy do back-end foi realizado no Render, onde a aplicação está funcional.


<br/>

## 📗 Link da documentação da API

<h2>Link: <a href="https://api-node-3q8n.onrender.com/docs" target="_blank" rel="external">Documentação</a></h2>

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

ELASTIC_CLOUD_ID=""
ELASTIC_USERNAME=""
ELASTIC_PASSWORD=""
```


Digite no terminal:

```
npx prisma generate
```

```
npm run elastic
```


Após isso, para criar o container Docker digite no terminal:

```
docker compose up -d
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

### Clientes

- ✅ Um cliente está ativo somente quando está vinculado a um roteador.
- ✅ Um cliente está vinculado apenas a 1 roteador.
- ✅ Quando um cliente é deletado e ele é o único cadastrado no roteador, o mesmo é colocado como inativo.
- ✅ Não pode haver mais de um cliente com o mesmo CPF/CNPJ.

### Roteadores

- ✅ Um roteador está ativo somente quando está vinculado a pelo menos um cliente.
- ✅ Um roteador pode ter vários clientes cadastrados.
- ✅ Quando um roteador é excluido, todos os clientes do mesmo são colocados como inativo.

### Endereços

- ✅ Um endereço pode ter vários clientes.


<br/>



## 🚀 Tecnologias utilizadas

O projeto está desenvolvido utilizando as seguintes tecnologias:

- Typescript <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
- NodeJS <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
- Fastify <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg" />
- Prisma <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" />
- Elasticsearch <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg" />
- PostgreSQL <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
- Docker <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
- Vitest <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" />
- Swagger <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" />


