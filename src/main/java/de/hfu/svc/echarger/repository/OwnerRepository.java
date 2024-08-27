package de.hfu.svc.echarger.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.hfu.svc.echarger.entity.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Integer> {

}
