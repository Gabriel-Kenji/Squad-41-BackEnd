# Estágio Único: Imagem de Produção para JavaScript

# 1. Imagem Base
# Usamos uma imagem 'alpine' do Node 18, que é leve e ideal para produção.
FROM node:18-alpine

# 2. Diretório de Trabalho
# Define o diretório de trabalho dentro do contêiner.
WORKDIR /usr/src/app

# 3. Instalação de Dependências
# Copia os arquivos de manifesto e instala APENAS as dependências de produção.
COPY package*.json ./
RUN npm ci --omit=dev

# 4. Copia do Código da Aplicação
# Copia o restante do código-fonte para o diretório de trabalho.
COPY . .

# 5. Exposição da Porta
# Expõe a porta que a aplicação vai usar (configurada no app.js).
EXPOSE 3000

# 6. Comando de Inicialização
# Define o comando para iniciar a aplicação quando o contêiner for executado.
CMD [ "npm", "start" ]