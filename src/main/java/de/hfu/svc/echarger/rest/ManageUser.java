package de.hfu.svc.echarger.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import de.hfu.svc.echarger.dto.UserDTO;
import de.hfu.svc.echarger.entity.User;
import de.hfu.svc.echarger.service.UserService;

@RestController
@RequestMapping("/users")
public class ManageUser {

	private static List<String> users = new ArrayList<>();

	@Autowired
	private UserService userService;

	@GetMapping
	public List<String> getAllUsers() {
		users.add("Usman");
		users.add("Nashitah");
		users.add("Micheal");
		return users;
	}

	@GetMapping("/db")
	public List<User> getAllUsers2() {
		return userService.getAllUsers();
	}

	@GetMapping("/db/{userId}")
	public User getUserById(@PathVariable Integer userId) {
		return userService.getUserById(userId);
	}

	@PostMapping
	public String addUser(@RequestBody User user) {
		System.out.println(new Gson().toJson(user));
		userService.addUser(user);
		return "User created successfully: userId" + user.getUserId();
	}

	@DeleteMapping("/{userId}")
	public String deleteUser(@PathVariable Integer userId) {
		boolean isRemoved = userService.deleteUser(userId);
		if (!isRemoved) {
			return "Error: User not found with userId " + userId;
		}
		return "User deleted successfully: userId " + userId;
	}

	@PostMapping("/login")
	public User loginUser(@RequestBody UserDTO userDTO) {
		User user = userService.loginUser(userDTO.getEmail(), userDTO.getPassword());
		if (user != null) {
			return user;
		} else {
			throw new RuntimeException("Invalid email or password");
		}
	}

}