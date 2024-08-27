package de.hfu.svc.echarger.entity;

import java.io.Serializable;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "USER", schema = "APP_DB2")
public class User implements Serializable {

	@Id
	// @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USERID", nullable = false)
	private Integer userId;

	@Column(name = "FNAME", length = 45)
	private String firstName;

	@Column(name = "LNAME", length = 45)
	private String lastName;

	@Column(name = "EMAIL", length = 45)
	private String email;

	@Enumerated(EnumType.STRING)
	@Column(name = "TYPE", nullable = false)
	private UserType type;

	@Column(name = "PASSWORD", length = 45)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(name = "GENDER")
	private Gender gender;

	@Column(name = "DOB")
	private Integer dob;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Customer customer;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Owner owner;

	// Getters and Setters

	// Getters and Setters

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserType getType() {
		return type;
	}

	public void setType(UserType type) {
		this.type = type;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Integer getDob() {
		return dob;
	}

	public void setDob(Integer dob) {
		this.dob = dob;
	}

	// Enums for TYPE and GENDER

	public enum UserType {
		CUSTOMER, OWNER
	}

	public enum Gender {
		FEMALE, MEN
	}
}
