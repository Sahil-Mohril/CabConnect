package com.project.cabconnect.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers()
    {
        return ResponseEntity.ok(userService.getAllUsers());
        
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id)
    {
        return ResponseEntity.ok(userRepository.findByUserId(id));
    }
    @GetMapping("/{id}/location")
    public ResponseEntity<LocationDTO> getUserLocation(@PathVariable int id)
    {
        User user=userRepository.findByUserId(id);
        LocationDTO location=new LocationDTO(user.getUserLat(),user.getUserLong());
        return ResponseEntity.ok(location);
    }

}

