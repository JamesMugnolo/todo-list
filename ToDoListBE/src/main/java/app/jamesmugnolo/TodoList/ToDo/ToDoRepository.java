package app.jamesmugnolo.TodoList.ToDo;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import java.sql.PreparedStatement;
import java.util.List;


@Repository
public class ToDoRepository {
    private final JdbcClient jdbcClient;
    private final JdbcTemplate jdbcTemplate;
    public ToDoRepository(JdbcClient jdbcClient,JdbcTemplate jdbcTemplate) {
        this.jdbcClient = jdbcClient;
        this.jdbcTemplate = jdbcTemplate;
    }
    public List<ToDo> findAll(Integer userId) {
        return jdbcClient.sql("select * FROM ToDo WHERE userid = :id").param("id",userId).query(ToDo.class).list();
    }
    public Integer create(ToDo todo,Integer userId) {
        KeyHolder todoKeys = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement("INSERT INTO ToDo (userid,title,description,completeBy,status) values(?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1,userId);
            ps.setString(2,todo.getTitle());
            ps.setString(3,todo.getDescription());
            ps.setDate(4, new java.sql.Date(todo.getCompleteBy().getTime()));
            ps.setString(5,todo.getStatus().toString());
            return ps;
        },todoKeys);
        return (Integer) todoKeys.getKeys().get("id");
    }
    public void update(ToDo todo,Integer id) {
        var updated = jdbcClient.sql("UPDATE ToDo SET title = ?, description = ?, completeBy = ?, status = ? WHERE id = ?")
                .params(List.of(todo.getTitle(),todo.getDescription(),todo.getCompleteBy(),todo.getStatus().name(),id)).update();
        Assert.state(updated == 1,"failed to update ToDo: " + todo.getTitle());
    }
    public void delete(Integer id) {
        var updated = jdbcClient.sql("DELETE FROM ToDo WHERE id = :id").param("id",id).update();
        Assert.state(updated == 1,"failed to Delete ToDo with ID of " + id);
    }
}
