package de.hfu.svc.echarger.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.hfu.svc.echarger.dto.ScheduleDTO;
import de.hfu.svc.echarger.entity.ChargingStation;
import de.hfu.svc.echarger.entity.Schedule;
import de.hfu.svc.echarger.service.ChargingStationService;
import de.hfu.svc.echarger.service.ScheduleService;

@RestController
@RequestMapping("/schedules")
public class ManageSchedule {

	@Autowired
	private ScheduleService scheduleService;

	@Autowired
	private ChargingStationService chargingStationService;

	// Get all schedules
	@GetMapping
	public List<Schedule> getAllSchedules() {
		return scheduleService.getAllSchedules();
	}

	// Get schedules by charging station id
	@GetMapping("/station/{stationId}")
	public List<Schedule> getSchedulesByStationId(@PathVariable Integer stationId) {
		return scheduleService.getSchedulesByStationId(stationId);
	}

	// Add a new schedule
	@PostMapping
	public String addSchedule(@RequestBody ScheduleDTO scheduleDto) {
		// Fetch the ChargingStation entity using the provided ID
		ChargingStation chargingStation = chargingStationService
				.getChargingStationById(scheduleDto.getChargingStationId());

		if (chargingStation == null) {
			// Handle the case where the ChargingStation is not found
			return "Charging Station not found with ID: " + scheduleDto.getChargingStationId();
		}

		// Convert ScheduleDTO to Schedule entity
		Schedule schedule = new Schedule();
		schedule.setStartTime(scheduleDto.getStartTime());
		schedule.setEndTime(scheduleDto.getEndTime());
		schedule.setDay(scheduleDto.getDay());
		schedule.setChargingStation(chargingStation);

		// Save the Schedule entity using the ScheduleService
		scheduleService.addSchedule(schedule);

		// Return a success message with the saved Schedule ID
		return "Schedule is created successfully: scheduleId " + schedule.getScheduleId();
	}

	// Delete a schedule by schedule id
	@DeleteMapping("/{scheduleId}")
	public String deleteSchedule(@PathVariable Integer scheduleId) {
		boolean isRemoved = scheduleService.deleteSchedule(scheduleId);
		if (!isRemoved) {
			return "Error: Schedule not found with scheduleId " + scheduleId;
		}
		return "Schedule deleted successfully: scheduleId " + scheduleId;
	}

}
