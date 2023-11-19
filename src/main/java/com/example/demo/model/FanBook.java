package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "fanbooks")
public class FanBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	@Column(name = "title")
	private String title;
	@Column(name = "author")
	private String author;
	@Column(name = "circle_name")
	private String circle_name;
	@Column(name = "date")
	private LocalDate date;
	@ManyToOne
	@JoinColumn(name = "category", referencedColumnName = "id")
	private Category category;
	@ManyToOne
	@JoinColumn(name = "reference", referencedColumnName = "id")
	private ReferenceWork reference_work;
	@ManyToOne
	@JoinColumn(name = "picture", referencedColumnName = "id")
	private Picture picture;
	@Column(name = "is_adult")
	private Boolean is_adult;
	@Column(name = "genre")
	private String genre;
}
