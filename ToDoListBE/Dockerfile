FROM openjdk:22
VOLUME /tmp
EXPOSE 8080
COPY target/TodoList-0.0.1-SNAPSHOT.jar ToDoList.jar
ENTRYPOINT ["java","-jar","/ToDoList.jar"]