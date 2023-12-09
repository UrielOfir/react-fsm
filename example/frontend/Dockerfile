FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

# build image by running: sudo docker build -t elevator-app-frontend .
# run container by running: sudo docker run -p 3000:3000 -d elevator-app-frontend