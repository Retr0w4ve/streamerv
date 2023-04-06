FROM node:latest
WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install
COPY . .
RUN npm install lame
RUN npm install icy
RUN npm install stream
CMD ["npm", "start"]