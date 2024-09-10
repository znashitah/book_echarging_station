package de.hfu.svc.echarger.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import de.hfu.svc.echarger.entity.ChargingStation;
import de.hfu.svc.echarger.entity.Schedule;

public interface ScheduleRepository extends CrudRepository<Schedule, Integer> {
	// Find all schedules by the associated charging station
	List<Schedule> findByChargingStation(ChargingStation chargingStation);
}
