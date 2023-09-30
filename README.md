# CodePipeline
 Caso de uso de app React com AWS CodePipeline, CodeBuild, CodeCommit

 - Iniciando Projeto
 ### npx create-react-app sample-repo
 ou
 ### yarn create react-app sample-repo

- AWS CODE COMMIT
- Criar repositório , em Origem CodeCommit , Repositórios , clique em criar repositório, exemplo nome : sample-repo , sem configuração opcional.
 - Ao criar o repositório vai aparecer as intruçoes de Etapas de conexão para vincular o git instalado no seu computador/vscode 
 - tutorial vincular git no repositório , necessário criar credenciais de acesso HTTPS ao CodeCommit.
 - https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-gc.html?icmpid=docs_acc_console_connect_np
 - tutorial git em 2 repositórios , no caso estou usando repositório Github e repositório codecommit , a cada git push os 2 são atualizados
 - https://pt.stackoverflow.com/questions/362260/como-manter-um-projeto-em-2-repositórios
 - feito o vinculo com o git já é possivel faze o primeiro git push e enviar o projeto ao repositório.
  
- AWS S3
 - Próximo passo é criar um bucket s3 na AWS onde será feito o upload desse projeto e suas atualizações.
 - Criar nome para o bucket , deixar com acesso publico.
 - Para evitar o erro na build ' An error occurred (AccessControlListNotSupported) when calling the PutObject operation: The bucket does not allow ACLs'  é necessário configurar no s3 a Propriedade de objeto ou object ownership e selecionar ' ACLs habilitadas '  no menu de permissões e na propriedade de objeto deixar como ' Autor do objeto' .
 - O objetivo do bucket é receber o código transpilado/compilado do react.js  pelo AWS CodeCommit.
- Próximo passo é criar um arquivo yml no projeto e fazer o upload dele para  o repositório CodeCommit o arquivo será responsavel pelo build no AWS CodeBuild e copiar os dados para o S3.
  - criar arquivo , buildspec.yml  ele terá os parametros que vai especificar as fases que o build vai percorrer e criar os conteudos para o S3 via codecommit e codebuild, o arquivo yml precisa estar corretamente formatado nos padrões com espaçamento correto.
  - buildspec é o nome padrão que o codebuild vai buscar no diretório raiz do projeto.
  - 1º fase do buildspec instalar o runtime version node js v18 e depois criar o comando de instalar as dependências do projeto node ' npm install ' . 
  - proxima etapa é o build , comando 'npm run script build'  , ele será responsavel por transpilar o conteúdo do projeto para produção.
  - post build ultima fase , o comando que vai ser executado será um comando do AWS CLI que ja vem integrado no AWS CodeBuild , 'aws s3 cp build'  copiar tudo que está na pasta do build para o bucket s3 ' nome do bucket  ' de forma recursiva '--recursive ' ou sejá funçao recursiva que faz uma ou mais chamadas a ela mesma ,várias chamadas de cópias de vários arquivos e em seguida o paramêtro de permissão ao publico '--acl public read' sendo que no s3 já foi habilitado Acls.

- AWS PIPELINE
 - próximo passo criar a pipeline e iniciar a esteira de automação de desenvolvimento.
 - em pipeline  , Create Pipeline , configurações padrões , em source , colocar AWS CODECOMMIT , nome do repositório selecionar o sample-repo e a ramificação main . chance detection = aws codepipeline , artefato de saida = padrão , build provider = codebuild , create project , criar nome , environment - managed image - operating system - amazon linux 2 , runtime  = standard , image = standard 3.0 .  concluir tudo nas opções padroes , continue to codepipeline, compilação única ,  next , skip deploy stage pois já foi criado no buildspec.yml os stagios de deploy , create pipeline.
 - adicionar IAM ROLE para permitir o codebuild possa acessar o s3. em funções ou roles , selecionar o codebuild service role que tem o nome que criamos no codebuild. exemplo : ' codebuild-ReactWebBuild-service-role ' no lado direito clicar em adicionar permissões e anexar politicas, attach policies  ' AmazonS3FullAccess ' 
 - agora retornar para codepipeline e clicar na pipeline criada,' ReactAppPipeline '  clicar em Lançar Alteração / Release change .
 - apartir de agora no s3 já é possivel identicar os arquivos da build sendo atualizados a cada git push que for feito e lá encontramos o arquivo index.html que tem  a url que pode ser acessada publicamente conforme link abaixo.

  ### projeto online : https://fbs-dev-app.s3.amazonaws.com/index.html


  