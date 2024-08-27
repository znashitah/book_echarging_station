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

import de.hfu.svc.echarger.entity.ChargingStation;
import de.hfu.svc.echarger.service.ChargingStationService;

@RestController
@RequestMapping("/chargingstations")

public class ManageChargingStation {
	private static List<String> chargingstations = new ArrayList<>();

	@Autowired
	private ChargingStationService chargingStationService;

	@GetMapping
	public List<String> chargingStations() {
		chargingstations.add("M1");
		chargingstations.add("M2");
		chargingstations.add("M3");
		return chargingstations;
	}

	@GetMapping("/db")
	public List<ChargingStation> getAllchargingstations2() {
		return chargingStationService.getAllChargingStation();
	}

	@PostMapping
	public String addUser(@RequestBody ChargingStation chargingstations) {
		System.out.println(new Gson().toJson(chargingstations));
		chargingStationService.addChargingStation(chargingstations);
		return "ChargingStation is created successfully: chargingStationId" + chargingstations.getStationId();
	}

	@DeleteMapping("/{chargingStationId}")
	public String deleteChargingStation(@PathVariable Integer chargingStationId) {
		boolean isRemoved = chargingStationService.deleteChargingStation(chargingStationId);
		if (!isRemoved) {
			return "Error: User not found with userId " + chargingStationId;
		}
		return "User deleted successfully: userId " + chargingStationId;
	}

}
