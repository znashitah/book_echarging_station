package de.hfu.svc.echarger.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.hfu.svc.echarger.entity.ChargingStation;
import de.hfu.svc.echarger.entity.Schedule;
import de.hfu.svc.echarger.repository.ChargingStationRepository;
import de.hfu.svc.echarger.repository.ScheduleRepository;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	@Autowired
	private ChargingStationRepository chargingStationRepository;

	// Get a schedule by its ID
	public Schedule getScheduleById(Integer id) {
		Optional<Schedule> schedule = scheduleRepository.findById(id);
		return schedule.orElse(null);
	}

	// Get all schedules
	public List<Schedule> getAllSchedules() {
		List<Schedule> scheduleList = new ArrayList<>();
		Iterable<Schedule> scheduleIterable = scheduleRepository.findAll();
		scheduleIterable.forEach(scheduleList::add);
		return scheduleList;
	}

	// Add a new schedule
	public void addSchedule(Schedule schedule) {
		scheduleRepository.save(schedule);
	}

	// Delete a schedule by ID
	public boolean deleteSchedule(Integer id) {
		scheduleRepository.deleteById(id);
		return true;
	}

	// Get schedules by charging station ID
	public List<Schedule> getSchedulesByStationId(Integer stationId) {
		Optional<ChargingStation> chargingStation = chargingStationRepository.findById(stationId);
		if (chargingStation.isPresent()) {
			return scheduleRepository.findByChargingStation(chargingStation.get());
		}
		return new ArrayList<>();
	}
}
