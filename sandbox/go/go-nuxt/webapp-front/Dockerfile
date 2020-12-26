FROM node:lts-alpine
WORKDIR /app
COPY . /app
ENV NODE_ENV=production
ENV API_SERVER 'http://34.102.147.86'
ENV HOST 0.0.0.0
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
