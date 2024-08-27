package de.hfu.svc.echarger.repository;

import org.springframework.data.repository.CrudRepository;

import de.hfu.svc.echarger.entity.ChargingStation;

public interface ChargingStationRepository extends CrudRepository<ChargingStation, Integer> {

}
