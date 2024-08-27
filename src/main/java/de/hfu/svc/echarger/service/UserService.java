package de.hfu.svc.echarger.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.hfu.svc.echarger.entity.Customer;
import de.hfu.svc.echarger.entity.Owner;
import de.hfu.svc.echarger.entity.User;
import de.hfu.svc.echarger.entity.User.UserType;
import de.hfu.svc.echarger.repository.CustomerRepository;
import de.hfu.svc.echarger.repository.OwnerRepository;
import de.hfu.svc.echarger.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private OwnerRepository ownerRepository;

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

	public boolean deleteUser(Integer id) {
		userRepository.deleteById(id);
		return true;

	}

	public void addUser(User user) {
		userRepository.save(user);

		if (user.getType() == UserType.CUSTOMER) {
			Customer customer = new Customer();
			customer.setUser(user);
			customerRepository.save(customer);
		} else if (user.getType() == UserType.OWNER) {
			Owner owner = new Owner();
			// owner.setOwnerId(1);
			owner.setUser(user);
			ownerRepository.save(owner);
		}
	}

}
