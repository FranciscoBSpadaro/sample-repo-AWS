# CodePipeline
 Caso de uso de app React usando AWS CodePipeline, CodeBuild, CodeCommit

 - iniciando projeto

 yarn create react-app sample-repo
 or
 npx create-react-app sample-repo

- AWS S3
proximo passo é criar um bucket s3 na aws onde vai será feito o upload desse projeto e suas atualizações
criar nome para o bucket , deixar com acesso publico.
meu bucket criou url  https://fbs-dev-app.s3.amazonaws.com/
o objetivo do bucket é receber o codigo transpilado ou compilado do react.js  pelo aws code commit

- AWS CODE COMMIT
  criar um arquivo no code commit que será responsavel pelo build  no aws code build e copiar os dados para o S3
  criar arquivo , buildspec.yml  ele terá os parametros que vai especificar as fases que o build vai percorrer e criar os conteudos para o S3 via codecommit e codebuild.    obs : https://jsonformatter.org/yaml-formatter  ajuda a validar seu arquivo yml para respeitar os espaços na formataçao do arquivo que deve ser respeitado.
  o buildspec 1º fase vai instalar o runtime version node js v12 e depois criar o comando de instalar as dependencias do projetonode ' npm install ' 
  proxima etapa é o build da solução , comando npm run script build , ele será responsavel por transpilar o conteudo do projeto para produção.
  post build ultima fase , o comando que vai ser executado será um comando do aws cli que ja vem integrado no aws codebuild , 'aws s3 cp build'  copiar tudo que está na pasta do build para o bucket s3 ' nome do bucket  ' de forma recursiva '--recursive '  e de permissão ao publico '--acl public read'
  obs: aqui ja deve ter o git configurado no codecommit para receber as atualizações do projeto ' repositorio / sample-repo '
  tutorial vincular git no repositorio ' https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-gc.html?icmpid=docs_acc_console_connect_np '.
  tutorial git em 2 repositorios , no caso estou usando repositorio git e repositorio codecommit
  https://pt.stackoverflow.com/questions/362260/como-manter-um-projeto-em-2-repositórios
  ao fazer o gitclone no repositorio codecommit o vscode pediu as credencias de git codecommit que devem ser  geradas no IAM 
  - exemplo git em 2 repositorios 
   git remote add all https://git-codecommit.us-east-1.amazonaws.com/v1/repos/sample-repo
   git remote set-url --add --push all https://git-codecommit.us-east-1.amazonaws.com/v1/repos/sample-repo