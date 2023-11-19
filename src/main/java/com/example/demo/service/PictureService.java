package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Picture;
import com.example.demo.repository.PictureRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PictureService {

	@Autowired
	PictureRepository repository;

	// データベースよりフォーラム(掲示板)の一覧を取得
	public List<Picture> findAll() {
		return repository.findAll();
	}

	// データベースに値を登録
	public void insert(Picture picture) {
		repository.save(picture);
	}

}
