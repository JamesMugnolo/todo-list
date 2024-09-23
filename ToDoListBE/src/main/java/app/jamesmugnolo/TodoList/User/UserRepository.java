package app.jamesmugnolo.TodoList.User;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    private final JdbcClient jdbcClient;

    public UserRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }
    public Optional<User> findByUsername(String username) {
        return jdbcClient.sql("select * FROM ToDoUser WHERE username = :username").param("username", username).query(User.class).optional();
    }
    public boolean create(String username) {
        try {
            jdbcClient.sql("INSERT INTO ToDoUser (username) values(?)")
                    .params(List.of(username)).update();
            return true;
        } catch(Exception ex) {
            return false;
        }

    }
}
