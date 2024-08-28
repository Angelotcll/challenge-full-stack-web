# Challenge Full Stack Web

## Estrutura do Projeto

- `backend/` - Contém o código-fonte do backend, desenvolvido com Nest.js.
- `frontend/` - Contém o código-fonte do frontend, desenvolvido com Vue.js e vuetify

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](20.11.0 ou superior)
- [PostgreSQL](15.6.1 ou superior)
- [npm](10.8.2 ou superior)

## Configuração do Ambiente

1. **Clone o repositório**

    ```bash
    git clone https://github.com/Angelotcll/challenge-full-stack-web
    ```

2. **Navegue até a pasta do backend**

    ```bash
    cd backend
    ```

3. **Instale as dependências**

    ```bash
    npm install
    ```

4. **Configure o banco de dados**

    - Crie um banco de dados no PostgreSQL para a aplicação.
    - Acesse o arquivo module.ts em `backend/src/infra/database` e altere as configurações conforme o seu banco de dados:

      ```
      port: port,
      username: 'username',
      password: 'password',
      database: 'database',
      ```

## Execução

Para iniciar o servidor de desenvolvimento, use o comando:

```bash
npm run start:dev


## Frontend

1. **Navegue até a pasta do frontend**

    ```bash
    cd ../frontend
    ```

2. **Instale as dependências**

    Instale todas as dependências necessárias listadas no `package.json`:

    ```bash
    npm install
    ```
## Execução

Para iniciar o servidor de desenvolvimento, use o comando:

```bash
npm run dev
