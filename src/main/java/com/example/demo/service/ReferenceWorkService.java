package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.ReferenceWork;
import com.example.demo.repository.ReferenceWorkRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReferenceWorkService {

	@Autowired
	ReferenceWorkRepository repository;

	// データベースよりフォーラム(掲示板)の一覧を取得
	public List<ReferenceWork> findAll() {
		return repository.findAll();
	}

	// データベースに値を登録
	public void insert(ReferenceWork reference) {
		repository.save(reference);
	}
}
