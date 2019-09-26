# Continuous integration (CI)
Nossa integração contínua usando bitbucket e expo.

## Como funciona
- O CI é iniciado após um evento de push aos branches de `dev`, `alpha` ou `master` (production)
- Em `alpha` ou `master`, preenchemos os arquivos de `config.env.json` e `app.env.json` com dados dos "environment variables" configurados no bitbucket
- Usamos a CLI do expo (`exp`) para entrar na conta da Mutual e publicar o aplicativo

## URLS dos nossos apps no expo
- https://expo.io/@mutualr/mutualalpha (alpha)
- https://expo.io/@mutualr/mutual (production)

## Expo para produção
Automaticamente, ao atualizar o aplicativo expo de produção, nossos usuários receberão essa atualização sem terem que baixer ela pelo store.
