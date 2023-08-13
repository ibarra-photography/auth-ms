# Use the official MongoDB image as the base image
FROM mongo:latest

# Define build arguments with default values
ARG MONGO_INITDB_ROOT_USERNAME=admin
ARG MONGO_INITDB_ROOT_PASSWORD=admin

# Set environment variables
ENV MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME
ENV MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD
ENV MONGO_INITDB_DATABASE=auth-db

# Copy custom configuration files (if needed)
# COPY mongod.conf /etc/mongod.conf

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["mongod"]
