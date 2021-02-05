# Boas vindas ao projeto API de Blogs!

## O que foi desenvolvido

Foi arquiteturado, desenvolvido e testado uma API de um CRUD posts de blog (com o sequelize). Começando pela API, foi desenvolvido alguns endpoints (seguindo os principios do REST) que estarão conectados ao seu banco de dados. Aplicado os princípios SOLID!

Primeiro, foi criado uma tabela para os usuários que desejam se cadastrar na aplicação. Após isso, a tabela blogPost será seu foco, guardando todas as informações dos posts realizados na plataforma.

Para manter a integridade e segurança de uma aplicação, nada melhor do que testar! Portanto, foram criados testes para todos os endpoints do projeto.

---

## Requisitos do projeto

### 1 - Os modelos dos seus dados no banco devem seguir a seguinte especificação

#### Os seguintes pontos serão avaliados:

- O seu projeto deverá usar um `ORM` para criar e atualizar o seu banco. A clonagem do projeto seguida de um comando de migrate deve deixá-lo em sua forma esperada.

- Deve conter uma tabela chamada **Users**, contendo os seguinte dados:

  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- Deve conter uma tabela chamada **BlogPosts**, contendo os seguinte dados:

  ```json
  {
    "id": "7706273476706534553",
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.947Z",
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "user_id": "401465483996" // esse é o id que referência usuário que é o autor do post
  }
  ```

### 2 - Sua aplicação deve ter o endpoint POST `/user`

#### Os seguintes pontos serão avaliados:

- O endpoint deve ser capaz de adicionar um novo user a sua tabela no banco de dados;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": 123456,
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- O campo `displayName` deverá ser uma string com no mínimo de 8 caracteres;

- O campo `email` será considerado válido se tiver o formato `<prefixo>@<domínio>` e se for único. Ele é obrigatório.

- A senha deverá conter 6 caracteres. Ela é obrigatória.

- Caso exista uma pessoa com o mesmo email na base, deve-se retornar o seguinte erro:

  ```json
  {
    "message": "Usuário já existe"
  }
  ```

- Caso contrário, retornar a mesma resposta do endpoint de `/login`, um token `JWT`:

  ```json
  {
    "token": "token-aqui"
  }
  ```

- O endpoint deverá ser testado.

### 3 - Sua aplicação deve ter o endpoint GET `/user`

#### Os seguintes pontos serão avaliados:

- Deve listar todos os **Users** e retorná-los na seguinte estrutura:

  ```json
  [
    {
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
  ]
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

- O endpoint deverá ser testado.

### 4 - Sua aplicação deve ter o endpoint GET `/user/:id`

#### Os seguintes pontos serão avaliados:

- Retorna os detalhes do usuário baseado no `id` da rota. Os dados devem ter o seguinte formato:

  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

- O endpoint deverá ser testado.

### 5 - Sua aplicação deve ter o endpoint DELETE `/user/me`

#### Os seguintes pontos serão avaliados:

- Utilizando o token de autenticação nos headers, o usuário correspondente deve ser apagado.

- O endpoint deverá ser testado.

### 6 - Sua aplicação deve ter o endpoint POST `/login`

#### Os seguintes pontos serão avaliados:

- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- Caso algum desses campos seja inválido ou não exista um usuário correspondente no banco de dados, retorne um código de status 400 com o corpo `{ message: "Campos inválidos" }`.

- Caso esteja tudo certo com o login, a resposta deve ser um token `JWT`, no seguinte formato:

  ```json
  {
    "token": "token-aqui"
  }
  ```

- O endpoint deverá ser testado.

### 7 - Sua aplicação deve ter o endpoint POST `/post`

#### Os seguintes pontos serão avaliados:

- Esse endpoint deve receber um _BlogPost_ no corpo da requisição e criá-lo no banco. O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- Caso o post não contenha o `title` e/ou o `content` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

- O endpoint deverá ser testado.

### 8 - Sua aplicação deve ter o endpoint GET `/post`

#### Os seguintes pontos serão avaliados:

- Esse endpoint deve listar todos os _BlogPosts_ e retorná-los na seguinte estrutura:

  ```json
  [
    {
      "id": "7706273476706534553",
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.947Z",
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "user": { // esse usuário é o autor do post
        "id": "401465483996",
        "displayName": "Brett Wiltshire",
        "email": "brett@email.com",
        "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
      }
    }
  ]
  ```

- O endpoint deverá ser testado.

### 9 - Sua aplicação deve ter o endpoint PUT `/post/:id`

#### Os seguintes pontos serão avaliados:

- O endpoint deve receber um **BlogPost** que irá sobrescrever o original com o `id` especificado na URL. Só deve ser permitido para o usuário que criou o **BlogPost**.

- O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 403`.

- Caso uma requisição sem token seja recebida, deve-se retornar um código de `status 401`.

- Caso o post não contenha o `title` e/ou o `content` a API deve retornar um erro de `status 400`.

- O endpoint deverá ser testado.

### 10 - Sua aplicação deve ter o endpoint GET `post/:id`

#### Os seguintes pontos serão avaliados:

- Retorna um **BlogPost** com o `id` especificado. O retorno deve ter os seguinte formato:

  ```json
  {
    "id": "7706273476706534553",
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.947Z",
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "user": { // esse usuário é o autor do post
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    }
  }
  ```

- O endpoint deverá ser testado.

### 11 - Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`

#### Os seguintes pontos serão avaliados:

- Retorna uma array de **BlogPosts** que contenham em seu título, ou conteúdo, o termo pesquisado no `queryParam` da URL. O retorno deve ter o seguinte formato:

  ```json
  [
    {
      "id": "7706273476706534553",
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.947Z",
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "user": { // esse usuário é o autor do post
        "id": "401465483996",
        "displayName": "Brett Wiltshire",
        "email": "brett@email.com",
        "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
      }
    }
  ]
  ```

- Caso nenhum **BlogPost** satisfaça a busca, retorne um array vazio.

- O endpoint deverá ser testado.

### 12 - Sua aplicação deve ter o endpoint DELETE `post/:id`

#### Os seguintes pontos serão avaliados:

- Deleta o post com o `id` especificado. Só deve ser permitido para o usuário que criou o **BlogPost**.

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 403`.

- Caso uma requisição sem token seja recebida, deve-se retornar um código de `status 401`.

- Caso o post referido não exista, deve-se retornar um código de `status 404`.

- O endpoint deverá ser testado.

## Dicas

### Status HTTP

Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

Alguns exemplos:

  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de `status 201`.

### Testes

- Seguido boas práticas para a organização de testes conforme visto nos conteúdos!

- Houve preferência por testes unitários nesse projeto.

---
