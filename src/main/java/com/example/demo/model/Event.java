package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "events")
public class Event {
	@Id
	@Column(name = "id")
	private Integer id;
	@Column(name = "date")
	private LocalDate date;
	@Column(name = "name")
	private String name;
	@Column(name = "place")
	private String place;
}
