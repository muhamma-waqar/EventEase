FROM node:22.11.0-alpine AS client
EXPOSE 4200

# Set global npm path
RUN mkdir -p /home/node/.npm-global && \
    mkdir -p /usr/src/app && \
    chown -R node:node /home/node/.npm-global && \
    chown -R node:node /usr/src/app

ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# Install Angular CLI
RUN npm install -g @angular/cli@18.2.11

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first to leverage Docker's cache
COPY package*.json ./

# Install dependencies as root
RUN npm install

# Switch to node user
USER root

# Copy the rest of the application files
COPY . .

# Start the Angular development server
CMD ["ng", "serve", "--port", "4200", "--host", "0.0.0.0", "--disable-host-check", "--poll", "2000"]
