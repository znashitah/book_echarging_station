# Use the official OpenJDK 21 base image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot application JAR file to the container
COPY target/svc.echarger-0.0.1-SNAPSHOT.jar /app/svc.echarger-0.0.1-SNAPSHOT.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/svc.echarger-0.0.1-SNAPSHOT.jar"]
