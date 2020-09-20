### Objetivo

#### Divida o projeto em módulos

Instruções

  - Envolva o código da função execute em um setTimeout com 1000ms.
  - Crie uma promise e retorne-a.
  - Execute o comando "create table".
  - Após a execução de "create table", utilize a função Promise.all para executar os 3 comandos "insert".
  - Após a execução dos 3 comandos "insert", faça um select retornando as colunas "name" e "author".

Resultado

```sh
[{
    "name": "Douglas Crockford",
    "age": "62"
}, {
    "name": "Linus Torvalds",
    "age": "47"
}, {
    "name": "Martin Fowler",
    "age": "54"
}]
```

Conteúdo abordado neste exercício

  - Promise
  - Promise.all
  - new

Execução

```sh
node --experimental-modules main.mjs
```