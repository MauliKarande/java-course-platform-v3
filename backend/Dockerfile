# Use official OpenJDK base image
FROM openjdk:17-jdk-slim

# Set working directory in the container
WORKDIR /app

# Copy ONLY the backend folder contents into the image
COPY . .

# Give mvnw execute permission and build the app
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Expose backend port
EXPOSE 8080

# Run the Spring Boot app
CMD ["java", "-jar", "target/*.jar"]
