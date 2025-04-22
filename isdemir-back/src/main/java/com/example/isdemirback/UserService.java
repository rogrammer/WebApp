package com.example.isdemirback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public int saveUser(User user) {
        return userRepository.saveUser(user);
    }

    public User getUserById(Integer registerNo) {
        return userRepository.getUserById(registerNo);
    }

    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public void deleteUser(Integer registerNo) {
        userRepository.deleteUserById(registerNo);
    }

    public void updateUser(User user) {
        userRepository.updateUser(user);
    }
}
