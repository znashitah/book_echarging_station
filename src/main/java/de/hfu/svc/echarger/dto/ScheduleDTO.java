package de.hfu.svc.echarger.dto;

import java.time.LocalTime;

public class ScheduleDTO {

	private Integer scheduleId;
	private LocalTime startTime;
	private LocalTime endTime;
	private Integer day;
	private Integer chargingStationId; // This assumes you want to include just the ID of the ChargingStation

	// Default constructor
	public ScheduleDTO() {
	}

	// Parameterized constructor
	public ScheduleDTO(Integer scheduleId, LocalTime startTime, LocalTime endTime, Integer day,
			Integer chargingStationId) {
		this.scheduleId = scheduleId;
		this.startTime = startTime;
		this.endTime = endTime;
		this.day = day;
		this.chargingStationId = chargingStationId;
	}

	// Getters and Setters
	public Integer getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public Integer getDay() {
		return day;
	}

	public void setDay(Integer day) {
		this.day = day;
	}

	public Integer getChargingStationId() {
		return chargingStationId;
	}

	public void setChargingStationId(Integer chargingStationId) {
		this.chargingStationId = chargingStationId;
	}
}
