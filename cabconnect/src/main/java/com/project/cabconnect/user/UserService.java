package com.project.cabconnect.user;

import java.util.List;
import java.util.Optional;

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
    // public Optional<User> getCurrentUser(int userId)
    // {
    //     return userRepository.findByUserId(userId);
    // }
    public int updateUserLocation(int userId,double lat,double lng)
    {
        return userRepository.updateUserLocation(userId, lat, lng);
    }
    public User getUserById(int userId)
    {
        return userRepository.findByUserId(userId);
    }
    public User verifyUser(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmailId(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getUserPassword().equals(password)) {
                return user; 
            }
        }
        return null; 
    }
}
