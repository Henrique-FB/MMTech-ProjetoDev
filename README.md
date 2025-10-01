# ProjetoMM-Tech

Proposta escolhida: B -> Sistema de Planejamento de Viagens

## Construindo e rodando:
Necessário que Docker compose esteja instalado na máquina
- Entre na pasta do my-app (`cd my-app`)
- Edite o arquivo docker-compose.yaml e adicione sua key da API do google maps (necessário)
    - na linha 29: `GOOGLE_API_KEY: your_google_api_key_here`
- Rodar `docker compose build`
- Rodar `docker compose up`
- Esperar alguns segundos para que a base de dados seja populada
- Entrar no link http://localhost:4173
