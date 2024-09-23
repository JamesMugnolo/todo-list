package app.jamesmugnolo.TodoList.ToDo;

import app.jamesmugnolo.TodoList.User.User;
import app.jamesmugnolo.TodoList.User.UserRepository;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;



@RestController
@CrossOrigin(origins = {"http://localhost:4200","http://192.168.137.1:8081","http://localhost","https://nginx.jmtodolist.com"})
@RequestMapping("/api/todos")
public class ToDoController {

    private final ToDoRepository todoRepository;
    private final UserRepository userRepository;

    public ToDoController(ToDoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    Optional<User> FindUserIdWithUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @GetMapping("/{username}")
    ResponseEntity findAll(@PathVariable String username) {
        Optional<User> user = FindUserIdWithUsername(username);
        if(user.isEmpty())
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        List<ToDo> todos = todoRepository.findAll(user.get().id());

        if(todos != null) {
            for(ToDo todo: todos) {
                if(formatDate(todo.getCompleteBy()).before(formatDate(new Date())) && todo.getStatus() == Status.IN_PROGRESS) {
                    todo.setStatus(Status.LATE);
                    todoRepository.update(todo,todo.getId());
                }
            }
        }
        return new ResponseEntity<List<ToDo>>(todos,HttpStatus.OK);
    }
    Date formatDate(Date date)  {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return dateFormat.parse(dateFormat.format(date));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    //post
    @PostMapping("/{username}")
    ResponseEntity create(@Valid @RequestBody ToDo todo,@PathVariable String username) {
        Optional<User> user = FindUserIdWithUsername(username);
        if(user.isEmpty())
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        Integer id = todoRepository.create(todo,user.get().id());

        return new ResponseEntity<>(id,HttpStatus.CREATED);
    }

    //put
    @PutMapping("/{id}/user/{username}")
    ResponseEntity update(@Valid @RequestBody ToDo todo, @PathVariable Integer id,@PathVariable String username) {
        Optional<User> user = FindUserIdWithUsername(username);
        if(user.isEmpty())
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        todoRepository.update(todo,id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //delete
    @DeleteMapping("/{id}/user/{username}")
    ResponseEntity delete(@PathVariable("id") Integer id,@PathVariable("username") String username) {
        Optional<User> user = FindUserIdWithUsername(username);
        if(user.isEmpty())
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        todoRepository.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
