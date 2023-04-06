FROM node:18
WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install
COPY . .
RUN npm install node-lame
RUN npm install icy
CMD ["npm", "start"]