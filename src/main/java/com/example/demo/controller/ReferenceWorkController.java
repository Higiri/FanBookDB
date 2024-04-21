package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.ReferenceWork;
import com.example.demo.service.ReferenceWorkService;

@Controller
public class ReferenceWorkController {

	@Autowired
	ReferenceWorkService service;

	@GetMapping("/reference_work/")
	public String show(Model model) {
		List<ReferenceWork> reference_workList = service.findAll();
		model.addAttribute("reference_workList", reference_workList);
		return "reference_work/top";
	}

	@GetMapping("/reference_work/add")
	public String create(Model model) {
		model.addAttribute("reference_works", new ReferenceWork());
		return "reference_work/add";
	}

	@PostMapping("/reference_work/result")
	public String saveReference(@ModelAttribute ReferenceWork reference_work, Model model) {

		// serviceクラスのinsertメソッドを呼び出し、DBに入力値を登録
		service.insert(reference_work);
		return "reference_work/result";
	}

	@GetMapping("/getReferenceWorks/")
	public ResponseEntity<List<ReferenceWork>> getCategories() {
		List<ReferenceWork> referenceWorkList = service.findAll();
		if (referenceWorkList != null) {
			return new ResponseEntity<>(referenceWorkList, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
