package de.hfu.svc.echarger.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "CHARGINGSTATION")
public class ChargingStation {

	@Id
	@Column(name = "STATIONID")
	private Integer stationId;

	@Column(name = "LOCATION")
	private String location;

	@Column(name = "PRICE")
	private BigDecimal price;

	@Column(name = "CONTACT")
	private String contact;

	@ManyToOne
	@JoinColumn(name = "USER_USERID", referencedColumnName = "USERID")
	// @JsonIgnore
	private User user; // Assuming User is another entity class

	// Getters and Setters
	public Integer getStationId() {
		return stationId;
	}

	public void setStationId(Integer stationId) {
		this.stationId = stationId;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
