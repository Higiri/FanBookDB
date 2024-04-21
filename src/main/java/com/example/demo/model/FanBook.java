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
	@Column(name = "title_kana")
	private String title_kana;
	@Column(name = "author")
	private String author;
	@Column(name = "author_kana")
	private String author_kana;
	@Column(name = "circle_name")
	private String circle_name;
	@ManyToOne
	@JoinColumn(name = "event", referencedColumnName = "id")
	private Event event;
	@Column(name = "date")
	private LocalDate date;
	@ManyToOne
	@JoinColumn(name = "category", referencedColumnName = "id")
	private Category category;
	@ManyToOne
	@JoinColumn(name = "reference_works", referencedColumnName = "id")
	private ReferenceWork reference_work;
	@ManyToOne
	@JoinColumn(name = "picture", referencedColumnName = "id")
	private Picture picture;
	@Column(name = "is_official_creator")
	private Boolean is_official_creator;
	@Column(name = "is_collaboration")
	private Boolean is_collaboration;
	@Column(name = "is_adult")
	private Boolean is_adult;
	@Column(name = "genre")
	private String genre;
	@Column(name = "summary")
	private String summary;
	@Column(name = "memo")
	private String memo;
	@Column(name = "url")
	private String url;

	public String titleSubstring() {
		if (this.title.length() < 24) {
			return this.title;
		}
		return this.title.substring(0, 23) + "…";
	}

	public String authorSubstring() {
		if (this.author.length() < 16) {
			return this.author;
		}
		return this.author.substring(0, 16) + "…";
	}

}
