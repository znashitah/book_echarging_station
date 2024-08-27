package de.hfu.svc.echarger.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.hfu.svc.echarger.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}
