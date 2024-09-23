package app.jamesmugnolo.TodoList.User;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:4200","http://192.168.137.1:8081","http://localhost","https://nginx.jmtodolist.com"})
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
