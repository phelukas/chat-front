# Use a imagem oficial do Node.js baseada no Alpine
FROM node:alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de definição do projeto (package.json e yarn.lock)
COPY package.json yarn.lock ./

# Instala as dependências usando o Yarn
RUN yarn install

# Copia o restante dos arquivos do seu projeto
COPY . .

# Constrói o aplicativo para produção
RUN yarn build

# Instala globalmente o serve para servir o aplicativo construído
RUN yarn global add serve

# Comando para servir o aplicativo na porta 3000 usando serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Expõe a porta 3000 para ser acessível fora do contêiner
EXPOSE 3000
