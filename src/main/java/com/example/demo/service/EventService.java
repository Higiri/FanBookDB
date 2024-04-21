package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EventService {

	@Autowired
	EventRepository repository;

	// データベースよりフォーラム(掲示板)の一覧を取得
	public List<Event> findAll() {
		return repository.findAll();
	}

	// データベースに値を登録
	public void insert(Event event) {
		repository.save(event);
	}

}
