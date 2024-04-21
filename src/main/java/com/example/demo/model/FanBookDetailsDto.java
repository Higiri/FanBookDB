package com.example.demo.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class FanBookDetailsDto {
	private Integer id;
	private String title;
	private String title_kana;
	private String author;
	private String author_kana;
	private String circleName;
	private Event event;
	private LocalDate date;
	private Category category;
	private ReferenceWork referenceWork;
	private Picture picture;
	private Boolean is_official_creator;
	private Boolean is_collaboration;
	private Boolean is_adult;
	private String genre;
	private String summary;
	private String memo;
	private String url;
}
