# Escola Virtual

## Objetivo

O objetivo é atender os requisitos previamente estabelecidos no pdf disponibilizado

## Aplicação

A aplicação foi feita separadamente com backend e frontend ambos foram desenvolvido com typescript. 

O backend utiliza o banco de dados sqlite para fazer a persistência dos dados de maneira simplificada, também conta com testes unitarios para serviço (login, busca de usuarios, busca de cursos, etc). A aplicação conta com uma lib de reconhecimento de entrada de dados a Zod, o que é possivel deixar o erro de request mais visivel. Geralmente este erro é retornado em ingles.

Ja o frontend utiliza nextjs na ultima versão com tailwindcss como framework css o projeto conta com uma separação minima de camadas como components/api/service/app cada um deles com sua responsabilidade especifica dividida.

## Como rodar

Considero que tem o NodeJS instalado na sua maquina.

- Inicialmente rodaremos o backend
- Abra um terminal separado e acesse a pasta `escola-virtual`.
- Rode o comando `npm i` para fazer as instalações das dependências do projeto.
- Rode o comando `npm run prisma:migrate` para gerar seu banco de dados em formato de arquivo.
- Rode o comando `npm run prisma:seed` para gerar dados prefixados no seu banco de dados.
- OPCIONAL: Rode o comando `npm run test` para rodar os testes da aplicação.
- Rode o comando `npm run dev` para rodar a aplicação na porta 8000 no modo de desenvolvimento.


- Inicialmente rodaremos o frontend
- Abra um terminal separado e acesse a pasta `escola-virtual-front`.
- Rode o comando `npm i` para fazer as instalações das dependências do projeto.
- Rode o comando `npm run dev` para rodar a aplicação na porta 8000 no modo de desenvolvimento.

## Usuarios 

Você tem 3 usuários para utilizar um admin e dois normais

Segue o email e senha de cada um deles

- giuliano@mail.com / 123456
- hiago@mail.com / 123456
- lara@mail.com / 123456


