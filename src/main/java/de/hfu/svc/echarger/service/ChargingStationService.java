package de.hfu.svc.echarger.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.hfu.svc.echarger.entity.ChargingStation;
import de.hfu.svc.echarger.entity.User;
import de.hfu.svc.echarger.repository.ChargingStationRepository;
import de.hfu.svc.echarger.repository.UserRepository;

@Service
public class ChargingStationService {

	@Autowired
	private ChargingStationRepository chargingStationRepository;

	@Autowired
	private UserRepository userRepository;

	public ChargingStation getChargingStationById(Integer id) {
		Optional<ChargingStation> chargingStation = chargingStationRepository.findById(id);
		return chargingStation.orElse(null);
	}

	public List<ChargingStation> getAllChargingStation() {
		List<ChargingStation> chargingStationList = new ArrayList<>();
		Iterable<ChargingStation> chargingStationIterable = chargingStationRepository.findAll();
		chargingStationIterable.forEach(chargingStationList::add);
		return chargingStationList;
	}

	public void addChargingStation(ChargingStation chargingStation) {
		chargingStationRepository.save(chargingStation);
	}

	public boolean deleteChargingStation(Integer id) {
		chargingStationRepository.deleteById(id);
		return true;

	}

	public List<ChargingStation> getChargingStationByUserId(Integer userId) {
		Optional<User> user = userRepository.findById(userId);

		List<ChargingStation> chargingStations = chargingStationRepository.findByUser(user.get());
		return chargingStations;

	}

}
