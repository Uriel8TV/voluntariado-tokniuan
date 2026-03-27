FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Le decimos a Render que entre a la carpeta antes de cocinar
RUN cd voluntariado && mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/voluntariado/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
