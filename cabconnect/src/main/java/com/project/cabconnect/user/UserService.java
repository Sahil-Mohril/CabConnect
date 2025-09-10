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
        return userRepository.findByUserMailId(user.getEmailId()).orElseGet(()->userRepository.save(user));
    }
    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }
}
