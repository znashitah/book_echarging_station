package de.hfu.svc.echarger.entity;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "SCHEDULE", schema = "APP_DB2")
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment the scheduleId
	@Column(name = "SCHEDULEID")
	private Integer scheduleId;

	@Column(name = "STARTTIME")
	private LocalTime startTime;

	@Column(name = "ENDTIME")
	private LocalTime endTime;

	@Column(name = "DAY")
	private Integer day;

	@ManyToOne
	@JoinColumn(name = "CHARGINGSTATION_STATIONID", referencedColumnName = "STATIONID")
	private ChargingStation chargingStation; // Assuming ChargingStation is another entity class

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

	public ChargingStation getChargingStation() {
		return chargingStation;
	}

	public void setChargingStation(ChargingStation chargingStation) {
		this.chargingStation = chargingStation;
	}
}
