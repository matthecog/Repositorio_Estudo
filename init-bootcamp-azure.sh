#!/bin/bash

REPO_NAME="Microsoft_Azure_Cloud_Native_2026"

echo "🚀 Criando estrutura do repositório: $REPO_NAME"

mkdir -p $REPO_NAME
cd $REPO_NAME || exit

# Arquivos raiz
touch README.md ROADMAP.md CHANGELOG.md .gitignore

# Visão geral
mkdir -p 00-visao-geral
touch 00-visao-geral/README.md
touch 00-visao-geral/sobre-o-bootcamp.md
touch 00-visao-geral/tecnologias-utilizadas.md

# Cursos (11)
mkdir -p 01-cursos
touch 01-cursos/README.md

for i in {01..11}; do
  mkdir -p 01-cursos/curso-$i/{codigo,prints}
  touch 01-cursos/curso-$i/README.md
  touch 01-cursos/curso-$i/conteudos.md
done

# Desafios de projeto (6)
mkdir -p 02-desafios-de-projeto
touch 02-desafios-de-projeto/README.md

for i in {01..06}; do
  mkdir -p 02-desafios-de-projeto/projeto-$i/{codigo,prints}
  touch 02-desafios-de-projeto/projeto-$i/README.md
  touch 02-desafios-de-projeto/projeto-$i/arquitetura.md
  touch 02-desafios-de-projeto/projeto-$i/resultados.md
done

# Desafios de código (3)
mkdir -p 03-desafios-de-codigo
touch 03-desafios-de-codigo/README.md

for i in {01..03}; do
  mkdir -p 03-desafios-de-codigo/desafio-$i/solucao
  touch 03-desafios-de-codigo/desafio-$i/README.md
done

# Ambientes
mkdir -p 04-ambientes/azure/{vms,app-services,containers,networking,security}
mkdir -p 04-ambientes/prints
touch 04-ambientes/README.md

# Erros e aprendizados
mkdir -p 05-erros-e-aprendizados
touch 05-erros-e-aprendizados/README.md
touch 05-erros-e-aprendizados/principais-erros.md

# Referências
mkdir -p 06-referencias
touch 06-referencias/links.md
touch 06-referencias/documentacoes.md

echo "✅ Estrutura criada com sucesso!"
