# Library System

## O que você vai encontrar aqui

Nesse repositório você vai encontrar um projeto RubyOnRails que está servindo de backend para uma aplicação angular. Ambos são uns sitema simples de livros.

## Como iniciar

Backend

Tenha instalado ruby, rails e o postgress.

Faça a instalação das dependencias.

Execute a aplicação com `rails s`

Para rodar os testes execute `bundle exec rspec`

--------

Frontend

Faça a instalação do cli do angular `npm install -g @angular/cli` caso não tenha ainda.

Dentro da pasta ./frontend instale as dependenciais.

Execute a aplicação com `ng serve --open`(endpoint está em localhost:3000).

Dentro de ./frontend/src/environments/environment.prod.ts você poderá mudar o endpoint da aplicação.

Para buildar o projeto `ng build --aot --prod`.

## Considerações

* Para autenticação foi usado a gem 'jwt'.

* A rota /signup foi mantida sem autenticação para que possa ser feita a criação de usuários. Como não possui interface visual pode ser feita via curl ou postman. Requer apenas um json com name, email, password e password_confirmation.

* Frontend foi feito com angular usando os componentes do material design. Rota /admin foi feita em lazy load com um guard que valida a sessão antes de carregar o font para a rota.
