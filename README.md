### task-manager
API de gerenciamento de tarefas, onde podemos cadastrar, listar, excluir e alterar tarefas.

### 🚀 Começando
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste. segue link de intrução.
```
https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository
```

### 📋 Pré-requisitos

Do que vamos precisar para rodar o projeto?

node.js versão >= 16.14.0,
express,
mysql workbench
### 🔧 Instalação
Segue abaixo o que será necessário ser feito para ter um ambiente de desenvolvimento em execução.

Instale as dependências do projeto;
```
yarn install
```
Crie na raiz do projeto o arquivo .env e copie o código abaixo;
```
BACKEND_SERVER_HOST=0.0.0.0
BACKEND_SERVER_PORT=5000

DATABASE_CLIENT='mysql2'
DATABASE_CONNECTION_HOST='localhost'
DATABASE_SCHEMA='task-manager'
DATABASE_USER= root
DATABASE_PASSWORD= root

JWT_TOKEN='jmkfGbeJ7+^sj&ymhWTAP_eeM6xgQqC?HUKGpdxR$4vwtqsasYGUKfSc%!EgvY34SB7taY^y&8N_qqeJH_rF857yb9+zhX$'
JWT_EXPIRES_TIME=30
JWT_EXPIRES_FORMAT='d'

```
Execute o comando para iniciar o projeto.
```
yarn start
```
Importe o dump no seu mysql workbench: Dump-task-manager.sql

E Prontinho!!

#### Me contate caso precise de ajuda! 📌
```
email: leticiafariaplayer@gmail.com
```
