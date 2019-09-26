# Mutual App

Código em react native para o aplicativo principal da Mutual

## Instalando
- Clone o repo
- `yarn install`
- Talvez tenha que instalar o [watchman](https://facebook.github.io/watchman/docs/install.html) para funcionar

## Rodando
- `yarn dev`

## Estrutura de diretórios
- `src/components`: Componentes compartilhados globalmente
- `src/store`: Folders do redux
- `src/services`: Funções utilitárias específicas da nossa aplicação
- `src/utils`: Funções utilitárias genéricas
- `src/UI`: Nossa biblioteca de componentes de UI
- `src/views/Intro`: Telas do login, onboarding ou cadastro
- `src/views/Main`: Telas da aplicação principal

## Criando um novo componente
Todo componente deve ficar em seu próprio diretório. Ele deve ser implementado em um arquivo que compartilha o seu nome. Crie um arquivo `index.ts` nesse diretório que só exporta o componente.
Ex:
- `Foo/`: diretório
- `Foo/Foo.tsx`: componente
- `Foo/index.ts`: arquivo que só exporta `./Foo.tsx`

## API

[http://mutual-api-doc.surge.sh](http://mutual-api-doc.surge.sh)