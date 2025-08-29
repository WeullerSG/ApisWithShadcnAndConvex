# Apresentação Convex

## 1️⃣ O que é o Convex
- O Convex é **uma plataforma de backend serverless**: funciona como banco de dados + funções de backend, mas sem precisar configurar servidor ou API.
- Permite **guardar, atualizar e consultar dados** diretamente do React (ou outro frontend) usando **mutations** e **queries**.

### Por que usar Convex?
- __Sem configuração de servidor__: Você foca no código, não na infraestrutura
- __Integração direta com React__: conecta frontend e backend de forma simples
- __Tipagem automática__: menos bugs, mais produtividade
- __Escalabilidade automática__: cresce conforme sua aplicação cresce

## 2️⃣ Estrutura no projeto
  | Conceito | O que faz | Como usar |
  | -------- | ----------| --------- |
  | __Schema__ | Define a estrutura dos dados | **`defineTable( )`** com campos e índices |
  | __Mutations__ | Modifica dados | **`useMutation( )`** no React |
  | __Queries__ | Busca dados | **`useQuery( )`** no React |
  | __Deploy__ | Publica na cloud | **`npx convex deploy`** |
1. **Schema**: definimos nossas tabelas no Convex, por exemplo `users` com campos `name` e `userName`.
 - Define a **estrutura das tabelas** e os **tipos de dados**.
- Garante que os dados sejam consistentes e bem organizados.
- Exemplo no nosso projeto:
```ts
users: defineTable({
  name: v.string(),
  userName: v.string(),
}).index("by_name", ["name"])
  .index("by_userName", ["userName"])
  ```

2. **Mutations**: funções que **alteram os dados**.  
   - Exemplo: `createUser` insere um usuário na tabela.
   - Funções que modificam os dados no Convex.
   - Exemplo: criar usuário:
  
 ```ts
 export const create = mutation({
  args: { name: v.string(), userName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      userName: args.userName,
    });
  }
})

 ```
 - Chamamos no frontend usando:
  ```ts
  useMutation(api.users.create)
  ```

3. **Queries**: funções que **buscam dados**.  
- Exemplo: `listUsers` retorna todos os usuários cadastrados.
- Funções que buscam dados, sem alterar nada.

Exemplo: listar usuários
  ```ts
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
  ```
-  Chamamos no frontend usando:
  ```ts
  useQuery(api.users.list)
  ```
4. **Índices**: criamos índices (`.index("by_userName", ["userName"])`) para **consultas mais rápidas**.

## 3️⃣ Integração com React
- Usamos `ConvexProvider` e `ConvexReactClient` para conectar o app ao backend do Convex.
- Hooks utilizados:
  - `useMutation(api.users.create)` → criar usuários.
  - `useQuery(api.users.list)` → listar usuários.
- Funciona de forma **reativa**: se o backend muda, o frontend atualiza automaticamente.

## 4️⃣ Fluxo Visual do Convex
``` arduino 
Frontend (React)
        │
        ▼
  Convex Client 
        │
 ┌──────┴──────┐ 
 │             │
Mutations     Queries
 │             │
 ▼             ▼
Schema (Tabelas e Índices)
 │
 ▼
Banco de dados interno do Convex

```

## 5️⃣ Benefícios
- Sem precisar montar servidor, endpoints ou autenticação manual.
- Fácil integração com React e Vite.
- Queries e mutations são **tipadas automaticamente** pelo Convex → menos chance de erro.
- Escala facilmente, já que o Convex é serverless. ( Serverless é um modelo de computação em nuvem onde o provedor de serviços é responsável por gerenciar e provisionar a infraestrutura de servidores, permitindo que desenvolvedores criem e executem aplicações sem precisar gerenciar servidores subjacentes )


## 6️⃣ Resumindo

Schema → estrutura dos dados.

Mutations → modificam dados.

Queries → buscam dados.

Convex cuida da sincronização e performance, tornando o desenvolvimento mais rápido e seguro.


### Fluxo Completo em Ação:
1. __Defina__ o schema (**`users`**, **`posts`**, **`files`**);

2. __Crie__ queries para buscar e mutations para modificar
3. __Use__ os hooks React (**`useQuery`**, **`useMutation`**)
4. __Integre__ com externos via actions quando necessário
5. __Deploy__ com um comando (**`npx convex deploy`**)

# Hospedagem e Servidores no Convex

Como o **Convex lida com hospedagem e servidores**, de forma clara para desenvolvedores.



#

## **Hospedagem no Convex**

1. **Serverless por padrão**

   * Quando você cria um projeto no Convex, você **não precisa configurar servidores**.
   * O Convex roda em **cloud** e cuida de tudo: escalabilidade, segurança e manutenção.

2. **Deploy na nuvem**

   * Você só precisa subir seu projeto usando o CLI (`npx convex deploy`).
   * O Convex cria automaticamente o backend, banco de dados e endpoints internos.

3. **Escalabilidade automática**

   * Se muitas pessoas acessarem seu app ao mesmo tempo, o Convex **aumenta automaticamente os recursos**.
   * Não precisa se preocupar em comprar servidores ou ajustar clusters.

4. **Ambiente local para desenvolvimento**

   * Você pode rodar o Convex localmente (`npx convex dev`) para testar alterações.
   * Depois, quando estiver pronto, faz o deploy para a cloud.

5. **Segurança e dados**

   * O Convex cuida de autenticação e permissões de acesso aos dados.
   * Você interage com ele via **mutations e queries**, sem precisar expor diretamente o banco de dados.




