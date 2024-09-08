package de.hfu.svc.echarger.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import de.hfu.svc.echarger.entity.ChargingStation;
import de.hfu.svc.echarger.entity.User;

public interface ChargingStationRepository extends CrudRepository<ChargingStation, Integer> {
	// Find all charging stations by the user
	List<ChargingStation> findByUser(User user);
}
