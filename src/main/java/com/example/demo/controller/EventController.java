package com.example.demo.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.Category;
import com.example.demo.model.Event;
import com.example.demo.service.EventService;

@Controller
public class EventController {

	@Autowired
	EventService service;

	@GetMapping("/event/")
	public String show(Model model) {
		List<Event> eventList = service
				.findAll()
				.stream()
				.sorted(Comparator
						.comparing(Event::getDate, Comparator.nullsFirst(Comparator.naturalOrder()))
						.thenComparing(Event::getId))
				.toList();
		model.addAttribute("eventList", eventList);
		return "event/top";
	}

	@GetMapping("/event/add")
	public String create(Model model) {
		model.addAttribute("event", new Category());
		return "event/add";
	}

	@PostMapping("/event/result")
	public String saveEvent(@ModelAttribute Event event, Model model) {

		// serviceクラスのinsertメソッドを呼び出し、DBに入力値を登録
		service.insert(event);
		return "event/result";
	}

	@GetMapping("/getEvents/")
	public ResponseEntity<List<Event>> getEvents() {
		List<Event> categoryList = service.findAll();
		if (categoryList != null) {
			return new ResponseEntity<>(categoryList, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
