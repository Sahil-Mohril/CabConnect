package com.project.cabconnect.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    public User addUser(User user)
    {
        if(userRepository.existsByEmailId(user.getEmailId()))
        return userRepository.findByEmailId(user.getEmailId()).get();
        return userRepository.save(user);
    }
    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }
}
