# Development flow

## Flow normal
1 - Desenvolvedor cria a feature/fix branch a partir da branch `alpha`

2 - Desenvolvedor desenvolve no seu branch

3 - Desenvolvedor faz um pull request no momento que achar oportuno para a `dev`

4 - O reviewer avalia o código do pull request e solicita alterações

5 - Desenvolvedor resolve os problemas levantados pelo reviewer em seu branch e atualiza a pull request

6 - O reviewer aceita a pull request para `dev`

5 - Quando a tarefa é considerada completa deve ser feito uma pull request para `alpha`

6 - Nunca deve ser feito um pull request de `dev`-> `alpha` para não comprometer os passos a seguir

7 - A feature/fix é mergeada na `alpha` e testada exaustivamente, inclusive com testes de transição de ambiente como mudanças de parametro e etc.

8 - Se a feature for reprovada em `alpha`, retorne para o passo 2

9 - Se a feature for aprovada em `alpha`, ela entra para a lista de features que aguardarão para serem publicadas na `master`

10 - A cada release para a master a branch alpha deve ser mergeada na master

11 - Logo após cada release as branches master e alpha devem ser identicas

12 - Nesse momento as features publicadas tem suas features branches fechadas.


## Flow de bug em produção