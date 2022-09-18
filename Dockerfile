FROM alpine
RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
#TODO for db_data mount
EXPOSE 8080
CMD ["npm", "start"]