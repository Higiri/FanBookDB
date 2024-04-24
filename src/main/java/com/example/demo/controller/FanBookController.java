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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.Category;
import com.example.demo.model.Event;
import com.example.demo.model.FanBook;
import com.example.demo.model.Picture;
import com.example.demo.model.ReferenceWork;
import com.example.demo.service.CategoryService;
import com.example.demo.service.EventService;
import com.example.demo.service.FanBookService;
import com.example.demo.service.PictureService;
import com.example.demo.service.ReferenceWorkService;

@Controller
public class FanBookController {

	@Autowired
	private FanBookService service;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ReferenceWorkService referenceWorkService;
	@Autowired
	private PictureService pictureService;
	@Autowired
	private EventService eventService;

	@GetMapping("/")
	public String show(Model model) {
		List<FanBook> fanBookList = service
				.findAll()
				.stream()
				.sorted(Comparator
						.comparing((FanBook fb) -> !fb.getIs_official_creator())
						.reversed()
						.thenComparing(FanBook::getIs_collaboration)
						.reversed()
						.thenComparing(s -> s.getReference_work().getKana())
						.thenComparing(FanBook::getAuthor_kana)
						.thenComparing(FanBook::getDate)
						.thenComparing(FanBook::getTitle))
				.toList();
		fanBookList
				.stream()
				.filter(s -> s.getSummary() != null)
				.forEach(fanBook -> {
					fanBook.setSummary(toLineSeparateText(fanBook.getSummary()));
				});
		model.addAttribute("fanBookList", fanBookList);

		List<Category> categories = categoryService.findAll();
		model.addAttribute("categories", categories);

		List<ReferenceWork> reference_works = referenceWorkService.findAll();
		model.addAttribute("reference_works", reference_works);

		List<Event> events = eventService.findAll();
		model.addAttribute("events", events);

		return "fanBook/top";
	}

	@GetMapping("/table")
	public String showTable(Model model) {
		List<FanBook> fanBookList = service
				.findAll()
				.stream()
				.sorted(Comparator
						.comparing(FanBook::getCircle_name)
						.thenComparing(s -> s.getCategory().getId())
						.thenComparing(FanBook::getAuthor)
						.thenComparing(FanBook::getDate)
						.thenComparing(FanBook::getTitle))
				.toList();
		model.addAttribute("fanBookList", fanBookList);
		return "fanBook/table";
	}

	@GetMapping("/regist")
	public String create(Model model) {
		FanBook fanBook = new FanBook();
		model.addAttribute("fanBook", fanBook);

		List<Category> categories = categoryService.findAll();
		model.addAttribute("categories", categories);

		List<ReferenceWork> reference_works = referenceWorkService.findAll();
		model.addAttribute("reference_works", reference_works);

		return "fanBook/regist";
	}

	@PostMapping("/result")
	public String saveFanBook(@ModelAttribute FanBook fanBook, Model model) {
		service.insert(fanBook);

		Picture picture = new Picture();
		picture.setId(fanBook.getId());
		picture.setFilename(String.format("%03d", fanBook.getId()) + ".jpg");
		picture.setFilepath("/images/");
		pictureService.insert(picture);

		fanBook.setPicture(picture);
		service.insert(fanBook);

		return "fanBook/result";
	}

	@GetMapping("/id={id}")
	public String update(Model model, @PathVariable Integer id) {
		FanBook fanBook = service.findById(id);
		model.addAttribute("fanBook", fanBook);

		List<Category> categories = categoryService.findAll();
		model.addAttribute("categories", categories);

		List<ReferenceWork> reference_works = referenceWorkService.findAll();
		model.addAttribute("reference_works", reference_works);

		return "fanBook/update";
	}

	@GetMapping("/getFanBookData/{id}")
	public ResponseEntity<FanBook> getFanBookData(@PathVariable Integer id) {
		FanBook fanBook = service.findById(id);

		if (fanBook != null) {
			return new ResponseEntity<>(fanBook, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public String toLineSeparateText(String str) {
		return str.replaceAll("\r\n|\r|\n", "<br>");
	}

}
