FROM node:16

# Create app directory
WORKDIR /usr/src/app



RUN apt update && apt install rsync -y

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Add wait-for-it script
COPY wait-for-it.sh /usr/src/app/
RUN chmod +x /usr/src/app/wait-for-it.sh

# Add entrypoint script
COPY entrypoint.sh /usr/src/app/
RUN chmod +x /usr/src/app/entrypoint.sh

# Copy the .env file
COPY .env /usr/src/app/.env

# Build the TypeScript code
RUN npm run compile

# Expose the port the app runs on
EXPOSE 3000

RUN chown -R 1001:0 /usr/src/app && chmod -R g=u /usr/src/app
USER 1001

# Use the entrypoint script to start the app
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
CMD ["npm", "run", "start"]
