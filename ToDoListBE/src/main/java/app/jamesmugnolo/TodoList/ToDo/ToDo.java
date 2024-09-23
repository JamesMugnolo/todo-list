package app.jamesmugnolo.TodoList.ToDo;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.Objects;

public final class ToDo {


    private  Integer id;
    private  @NotEmpty String title;
    private  @NotNull String description;
    private  @NotNull Date completeBy;
    private @NotNull Status status;

    public ToDo(Integer id, @NotEmpty String title, @NotNull String description, @NotNull Date completeBy, @NotNull Status status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completeBy = completeBy;
        this.status = status;
    }

    public @NotNull Status getStatus() {
        return status;
    }

    public @NotNull Date getCompleteBy() {
        return completeBy;
    }

    public @NotNull String getDescription() {
        return description;
    }

    public @NotEmpty String getTitle() {
        return title;
    }

    public Integer getId() {
        return id;
    }
    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (ToDo) obj;
        return Objects.equals(this.id, that.id) &&
                Objects.equals(this.title, that.title) &&
                Objects.equals(this.description, that.description) &&
                Objects.equals(this.completeBy, that.completeBy) &&
                Objects.equals(this.status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, completeBy, status);
    }

    @Override
    public String toString() {
        return "ToDo[" +
                "id=" + id + ", " +
                "title=" + title + ", " +
                "description=" + description + ", " +
                "completeBy=" + completeBy + ", " +
                "status=" + status + ']';
    }


}
