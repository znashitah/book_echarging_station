package de.hfu.svc.echarger.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import de.hfu.svc.echarger.entity.User;

public interface UserRepository extends CrudRepository<User, Integer> {
	Optional<User> findByEmail(String email);
}
