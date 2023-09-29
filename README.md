# CodePipeline
 Caso de uso de app React usando AWS CodePipeline, CodeBuild, CodeCommit

 - iniciando projeto

 ### yarn create react-app sample-repo
 ou
 ### npx create-react-app sample-repo

- AWS S3
 - proximo passo é criar um bucket s3 na aws onde vai será feito o upload desse projeto e suas atualizações
criar nome para o bucket , deixar com acesso publico.
 - o objetivo do bucket é receber o codigo transpilado ou compilado do react.js  pelo aws code commit

- AWS CODE COMMIT
  - criar um arquivo yml no projeto e fazer o upload dele para  o repositório code commit o arquivo será responsavel pelo build  no aws code build e copiar os dados para o S3.
  - criar arquivo , buildspec.yml  ele terá os parametros que vai especificar as fases que o build vai percorrer e criar os conteudos para o S3 via codecommit e codebuild.    obs : https://www.yamllint.com  esse link ajuda a validar seu arquivo yml para respeitar os espaços na formataçao do arquivo ou usar extensão yaml sort.
  - buildspec 1º fase vai instalar o runtime version node js v12 e depois criar o comando de instalar as dependencias do projeto node ' npm install ' . 
  - proxima etapa é o build da solução , comando 'npm run script build'  , ele será responsavel por transpilar o conteudo do projeto para produção.
  - post build ultima fase , o comando que vai ser executado será um comando do aws cli que ja vem integrado no aws codebuild , 'aws s3 cp build'  copiar tudo que está na pasta do build para o bucket s3 ' nome do bucket  ' de forma recursiva '--recursive '  e de permissão ao publico '--acl public read'.
  - obs: o projeto ja deve ter o git configurado no repositório codecommit para receber as atualizações. 
  - tutorial vincular git no repositorio https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-gc.html?icmpid=docs_acc_console_connect_np
  - tutorial git em 2 repositorios , no caso estou usando repositório git e repositorio codecommit
    https://pt.stackoverflow.com/questions/362260/como-manter-um-projeto-em-2-repositórios

- AWS PIPELINE
 - próximo passo criar a pipeline para transpilar o codebuild
 - em pipeline  , Create Pipeline , configuraçoes padroes , em source , colocar AWS CODECOMMIT , nome do repositorio selecionar o sample-repo e a ramificação main . chance detection = aws codepipeline , artefato de saida = padrão , build provider = codebuild , create project , criar nome , environment - managed image - operating system - amazon linux 2 , runtime  = standard , image = standard 3.0 .  concluir tudo nas opções padroes , continue to codepipeline, compilação única ,  next , skip deploy stage , ja foi criado no buildspec.yml . create pipeline.
 - adicionar IAM ROLE para permitir o codebuild possa acessar o s3. em funções ou roles , selecionar o codebuild service role que tem o nome que criamos no codebuild. exemplo : ' codebuild-ReactWebBuild-service-role ' no lado direito clicar em adicionar permissões e anexar politicas, attach policies  ' AmazonS3FullAccess ' 
 - agora retornar para codepipeline e clicar na pipeline criada,' ReactAppPipeline '  clicar em Lançar Alteração / Release change .

  ### projeto online : https://fbs-dev-app.s3.amazonaws.com/


  