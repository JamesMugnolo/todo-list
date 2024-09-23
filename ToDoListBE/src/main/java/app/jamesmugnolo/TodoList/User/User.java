package app.jamesmugnolo.TodoList.User;
import jakarta.validation.constraints.NotEmpty;

public record User(Integer id, @NotEmpty String username) {

    public User(Integer id, String username) {
        this.id = id;
        this.username = username;
    }

    public Integer id() {
        return this.id;
    }

    public @NotEmpty String username() {
        return this.username;
    }

}
