package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryService {

	@Autowired
	CategoryRepository repository;

	// データベースよりフォーラム(掲示板)の一覧を取得
	public List<Category> findAll() {
		return repository.findAll();
	}

	// データベースに値を登録
	public void insert(Category category) {
		repository.save(category);
	}

}
