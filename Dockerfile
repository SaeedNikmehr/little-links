FROM node

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node","/home/app/app.js"]