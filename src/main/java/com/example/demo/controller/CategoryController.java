package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.Category;
import com.example.demo.service.CategoryService;

@Controller
public class CategoryController {

	@Autowired
	CategoryService service;

	@GetMapping("/category/")
	public String show(Model model) {
		List<Category> categoryList = service.findAll();
		model.addAttribute("categoryList", categoryList);
		return "category/top";
	}

	@GetMapping("/category/add")
	public String create(Model model) {
		model.addAttribute("category", new Category());
		return "category/add";
	}

	@PostMapping("/category/result")
	public String saveCategory(@ModelAttribute Category category, Model model) {

		// serviceクラスのinsertメソッドを呼び出し、DBに入力値を登録
		service.insert(category);
		return "category/result";
	}

}
