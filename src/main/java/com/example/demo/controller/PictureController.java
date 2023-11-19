package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.Category;
import com.example.demo.model.Picture;
import com.example.demo.service.PictureService;

@Controller
public class PictureController {

	@Autowired
	PictureService service;

	@GetMapping("/picture/")
	public String show(Model model) {
		List<Picture> categoryList = service.findAll();
		model.addAttribute("categoryList", categoryList);
		return "picture/top";
	}

	@GetMapping("/picture/add")
	public String create(Model model) {
		model.addAttribute("category", new Category());
		return "picture/add";
	}

	@PostMapping("/picture/result")
	public String saveCategory(@ModelAttribute Picture picture, Model model) {

		// serviceクラスのinsertメソッドを呼び出し、DBに入力値を登録
		service.insert(picture);
		return "picture/result";
	}

}
