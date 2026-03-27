# Etapa 1: Construir el proyecto
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Entramos a la subcarpeta antes de construir
RUN cd voluntariado && mvn clean package -DskipTests

# Etapa 2: Encender el servidor
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Sacamos el archivo .jar de la subcarpeta
COPY --from=build /app/voluntariado/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
