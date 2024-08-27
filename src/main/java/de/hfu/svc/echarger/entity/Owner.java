package de.hfu.svc.echarger.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "OWNER")
public class Owner {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "OWNERID")
	private Integer ownerId;

	@OneToOne
	@JoinColumn(name = "USER_USERID")
	private User user;

	// Constructors
	public Owner() {
	}

	public Owner(User user) {
		this.user = user;
	}

	// Getters and Setters
	public Integer getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Integer ownerId) {
		this.ownerId = ownerId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
