package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "reference_works")
public class ReferenceWork {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	@NotBlank(message = "作品名を入力してください")
	@Column(name = "name")
	private String name;
	@NotBlank(message = "作品名(かな)を入力してください")
	@Column(name = "kana")
	private String kana;
}
