package com.example.demo.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class FanBookDetailsDto {
	private Integer id;
	private String title;
	private String author;
	private String circleName;
	private LocalDate date;
	private Category category;
	private ReferenceWork referenceWork;
	private Picture picture;
	private Boolean isAdult;
	private String genre;
}
