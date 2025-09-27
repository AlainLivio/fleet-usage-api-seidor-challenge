# Seidor challenge- API de Uso de Frota

Projeto implementado com NestJS + TypeScript. Embora o enunciado sugira o uso do Express, se optou pelo NestJS, que utiliza o Express internamente como servidor HTTP padrão. Assim, o NestJS oferece toda a robustez do Express, junto com uma estrutura modular, suporte nativo a TypeScript e injeção de dependências, facilitando o desenvolvimento e a manutenção do projeto.

## Como usar

1. Instalar dependências:
```bash
npm install
```

2. Copie variáveis de ambiente:
```bash
cp .env.example .env
# Edite .env conforme necessário (PORT etc)
```

3. Rodar em modo desenvolvimento:
```bash
npm run start:dev
```

A API ficará disponível em `http://localhost:3000`.

4. Rodar testes (unit + coverage):
```bash
npm test
```

5. Rodar testes e2e:
```bash
npm run test:e2e
```

6. Rodando com Docker Compose
```bash
docker-compose up --build
```

## Endpoints

- POST /cars
- GET /cars
- GET /cars/:id
- PUT /cars/:id
- DELETE /cars/:id

- POST /drivers
- GET /drivers
- GET /drivers/:id
- PUT /drivers/:id
- DELETE /drivers/:id

- POST /usages
- POST /usages/:id/finish
- GET /usages

Persistência em memória. Regras: um carro só pode ser usado por um motorista por vez; um motorista só pode usar um carro por vez.


### Observações importantes sobre regras de negócio

Para garantir o cumprimento da regra de negócio:

> Um automóvel só pode ser utilizado por um motorista por vez.  
> Um motorista que já esteja utilizando um automóvel não pode utilizar outro ao mesmo tempo.

A utilização de um carro só será considerada **finalizada** quando for feito o encerramento explícito com o endpoint: `/usages/:id/finish`

Enquanto esse endpoint **não for chamado**, o carro e o motorista continuarão sendo considerados "em uso", e novas utilizações com eles não serão permitidas.

Portanto:
- **Use `/usages/:id/finish`** para encerrar uma utilização.
- Após a finalização, o carro e o motorista estarão disponíveis novamente para novos usos.
