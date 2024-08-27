package de.hfu.svc.echarger.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.hfu.svc.echarger.entity.User;
import de.hfu.svc.echarger.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User getUserById(Integer id) {
		Optional<User> user = userRepository.findById(id);
		return user.orElse(null);
	}

	public List<User> getAllUsers() {
		List<User> usersList = new ArrayList<>();
		Iterable<User> usersIterable = userRepository.findAll();
		usersIterable.forEach(usersList::add);
		return usersList;
	}

	public void addUser(User user) {
		userRepository.save(user);
	}

	public boolean deleteUser(Integer id) {
		userRepository.deleteById(id);
		return true;

	}

}
