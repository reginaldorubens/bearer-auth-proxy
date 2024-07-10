# bearer-auth-proxy
App que serve como proxy para obter token JWT e adicionar header "Authorization: Bearer &lt;token>" a uma requisição HTTP e enviar a requisição para o seu destino

## Como usar
Instale as dependências
```
npm install
```

Crie o arquivo ".env" na raíz do projeto, usando como base o arquivo ".env.example" fornecido e preenchendo os valores para cada variável dentro do arquivo. Certifique-se de informar uma porta na variável PORT que não esteja sendo utilizada por nenhum outro app ou serviço. Também devem ser informados os dados para a obteção do token JWT (URL, usuário ou customerKey e senha ou customerSecret).

Execute o app com o comando:
```
npm start
```

## Enviando requisições para o app
O app disponibiliza um endpoint "/redirect-request". A requisição enviada para este endpoint deve ter o método POST e o corpo da requisição deve conter os seguintes dados:
- method: especifica o método da requisição a ser enviada para o destino final após a adição do header "Authorization"
- targetUrl: a URL de destino para a qual a requisição deve ser direcionada após a adição do header
- payload: o corpo da requisição esperado pelo endpoint para o qual a requisição será direcionada após a adição do header "Authorization"
