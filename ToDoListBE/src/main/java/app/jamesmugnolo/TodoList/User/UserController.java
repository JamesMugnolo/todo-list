package app.jamesmugnolo.TodoList.User;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = {"http://localhost:4200","http://192.168.137.1:8081","http://localhost","https://todos.jm-projects.com"})
@RequestMapping("/api/users")
public class UserController {
 private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    Optional<User> findByUsername(@PathVariable String username ) {
        return userRepository.findByUsername(username);
    }

    @PostMapping("/sign-in")
    ResponseEntity signin(@Valid @RequestBody User user) {

        if (findByUsername(user.username()).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else  return new ResponseEntity<>(HttpStatus.OK);
    }
    //post
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    ResponseEntity create(@Valid @RequestBody String username) {
        if(userRepository.create(username) == true) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
