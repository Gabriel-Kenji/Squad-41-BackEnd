# FCalendar - API de Agendamento de Estações de Trabalho

Esta é a API backend para o sistema FCalendar, uma plataforma de agendamento de estações de trabalho em escritórios. Construída com Node.js e Express, e totalmente containerizada com Docker para facilitar a configuração e a execução do ambiente.

## ✨ Funcionalidades

- **Autenticação de Usuários:** Sistema seguro de login utilizando JSON Web Tokens (JWT).
- **Gerenciamento de Usuários:** Criação, listagem, atualização e exclusão de usuários.
- **Gestão de Agendamentos:** Criação, listagem (por usuário) e exclusão de agendamentos.
- **Consulta de Disponibilidade:** Verificação de estações de trabalho livres por sede e por data.
- **Notificação por E-mail:** Envio de e-mail de confirmação ao realizar um agendamento.

## 🚀 Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** MySQL com Sequelize (ORM)
- **Autenticação:** JSON Web Token (JWT), bcryptjs
- **Containerização:** Docker, Docker Compose
- **E-mail:** Nodemailer

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem incluído na instalação do Docker Desktop)

## ⚙️ Como Rodar o Projeto

Graças ao Docker, não é necessário instalar Node.js ou MySQL diretamente na sua máquina. Siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/Squad-41-BackEnd.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd Squad-41-BackEnd
    ```

3.  **Inicie os contêineres:**
    Execute o seguinte comando para construir a imagem da API e iniciar os serviços da aplicação e do banco de dados.
    ```bash
    docker-compose up --build -d
    ```
    - O comando `up` inicia os contêineres.
    - A flag `--build` garante que a imagem da API seja reconstruída com as últimas alterações do código.
    - A flag `-d` executa os contêineres em segundo plano (modo "detached").

Pronto! A API estará rodando e acessível em `http://localhost:3000`.

## Endpoints da API

A seguir estão as principais rotas disponíveis na API. Rotas marcadas com 🔒 requerem um token de autenticação no cabeçalho (`Authorization: Bearer <token>`).

| Método | Rota                          | Descrição                                                    | Autenticação |
| :----- | :---------------------------- | :----------------------------------------------------------- | :----------: |
| `POST` | `/users`                      | Cria um novo usuário.                                        |      Não     |
| `POST` | `/login`                      | Autentica um usuário e retorna um token JWT.                 |      Não     |
| `GET`  | `/users`                      | 🔒 Lista todos os usuários.                                  |     Sim      |
| `GET`  | `/sedes`                      | 🔒 Lista todas as sedes disponíveis.                         |     Sim      |
| `GET`  | `/agendamentos/:date/:sede`   | 🔒 Lista agendamentos e estações livres para uma data e sede. |     Sim      |
| `GET`  | `/agendamentos/:id`           | 🔒 Lista todos os agendamentos de um usuário específico.     |     Sim      |
| `POST` | `/agendamentos`               | 🔒 Cria um novo agendamento para o usuário.                  |     Sim      |
| `DELETE`| `/agendamento/:id`            | 🔒 Deleta um agendamento específico.                         |     Sim      |

## 🖥️ Aplicação Front-end

Este repositório contém apenas a API (backend) do projeto. Para uma experiência de usuário completa, você precisará da aplicação front-end que consome os dados desta API.

- **Repositório do Front-end:** [Squad-41-FrontEnd](https://github.com/Gabriel-Kenji/Squad-41-FrotEnd)

Após iniciar a API com o Docker Compose, siga as instruções no `README.md` do repositório do front-end para configurá-lo e conectá-lo a este backend.

## 📄 Licença

Este projeto está sob a licença ISC.