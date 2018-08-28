FROM node:8.11.4-jessie

# Install the PostgreSQL client
RUN apt-get update && \
   apt-get install -y --no-install-recommends \
   postgresql-client dos2unix && \
   rm -rf /var/lib/apt/lists/*

# Add the entrypoint.sh
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN dos2unix /usr/local/bin/docker-entrypoint.sh && \
   chmod a+x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Install YARN
RUN npm install -g yarn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "run", "dev" ]

EXPOSE 9000
