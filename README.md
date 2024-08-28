# Challenge Full Stack Web

## Estrutura do Projeto

- `backend/` - Contém o código-fonte do backend, desenvolvido com Nest.js.
- `frontend/` - Contém o código-fonte do frontend, desenvolvido com Vue.js e vuetify

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](20.11.0 ou superior)
- [PostgreSQL](15.6.1 ou superior)
- [npm](10.8.2 ou superior)
 

**Certifique-se de que as portas 3000 (backend) e 5000 (frontend) estejam disponíveis!**


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
    
    npm run start:dev


## Frontend

Em um novo terminal

1. **Navegue até a pasta do frontend**

    ```bash
    cd frontend
    ```

2. **Instale as dependências**

    Instale todas as dependências necessárias listadas no `package.json`:

    ```bash
    npm install
    ```
## Execução

    Para iniciar o servidor de desenvolvimento, use o comando:

    npm run dev

## Tela Inicial

1. **Acessar a Tela Inicial**

   Abra seu navegador e acesse [http://localhost:5000/](http://localhost:5000/). Isso exibirá a tela inicial da aplicação.

2. **Descrição da Tela Inicial**

   Na tela inicial, você encontrará uma mensagem de boas-vindas. O menu lateral oferece duas opções:

   - **Módulo Acadêmico**: Mantém você na mesma tela, permitindo acessar recursos relacionados ao módulo acadêmico.
   - **Menu Alunos**: Redireciona você para uma nova tela que exibe a lista de alunos.
   

## Tela de Alunos

A **tela de alunos** exibe a lista de alunos cadastrados, se houver algum. As principais funcionalidades desta tela incluem:

1. **Busca de Alunos**

   - Você pode buscar alunos utilizando o **registro acadêmico**, **nome** ou **CPF**.

2. **Cadastro de Alunos**

   - Há um botão para **cadastro de novos alunos**. Ao clicar neste botão, você será redirecionado para a tela de cadastro.

3. **Tabela de Alunos**

   - **Ordenação**: A tabela permite ordenar os alunos por qualquer coluna ao clicar no cabeçalho.
   - **Edição e Exclusão**:
     - **Editar**: Clique no ícone de lápis ✏️ ao lado do aluno para acessar uma nova tela com os dados atuais do aluno preenchidos. Os campos editáveis estarão habilitados para alterações.
     - **Excluir**: Clique no ícone de lixeira 🗑️ para remover um aluno. Um pop-up de confirmação será exibido para confirmar a exclusão.


## Tela de Cadastro

A **tela de cadastro** permite registrar um novo aluno. Os campos e suas validações são os seguintes:

- **Nome**: Insira o nome completo do aluno, com **nome** e **sobrenome**, cada um com pelo menos 3 letras e um espaço entre eles.
- **Email**: Insira um endereço de email válido no formato `exemplo@dominio.com`.
- **Registro Acadêmico**: Insira um número com até 6 dígitos, apenas valores numéricos são aceitos.
- **CPF**: Digite o CPF do aluno com somente números.

### Funcionalidades

- **Salvar**: Se todos os campos forem preenchidos corretamente, o botão de salvar será habilitado. Ao clicar em salvar, uma mensagem de confirmação será exibida indicando que o aluno foi cadastrado com sucesso.
- **Cancelar**: Se o botão de cancelar for clicado, todos os campos serão limpos e você será redirecionado para a tela de alunos.


## Menu Lateral

O **Menu Lateral** está disponível em todas as telas e fornece navegação fácil entre as seções principais da aplicação. Ele oferece as seguintes opções:

- **Módulo Acadêmico**: Clique aqui para retornar à tela inicial.
- **Alunos**: Clique aqui para acessar a tela de lista de alunos.

