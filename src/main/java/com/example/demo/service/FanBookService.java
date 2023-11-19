package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.FanBook;
import com.example.demo.model.FanBookDetailsDto;
import com.example.demo.repository.FanBookRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FanBookService {

	@Autowired
	FanBookRepository repository;

	// データベースよりフォーラム(掲示板)の一覧を取得
	public List<FanBook> findAll() {
		return repository.findAll();
	}

	// データベースに値を登録
	public void insert(FanBook fanBook) {
		repository.save(fanBook);
	}

	public FanBook findById(Integer id) {
		return repository.findById(id).orElse(null);
	}

	public FanBookDetailsDto getFanBookDetails(Integer fanBookId) {
		// fanBookIdに基づいて詳細情報を取得
		Optional<FanBook> fanBookOptional = repository.findById(fanBookId);

		if (fanBookOptional.isPresent()) {
			// FanBookが見つかった場合、FanBookDetailsDtoに詰め替えて返す
			FanBook fanBook = fanBookOptional.get();
			FanBookDetailsDto fanBookDetailsDto = new FanBookDetailsDto();
			fanBookDetailsDto.setTitle(fanBook.getTitle());
			fanBookDetailsDto.setAuthor(fanBook.getAuthor());
			// 他のフィールドも同様に設定

			return fanBookDetailsDto;
		} else {
			// FanBookが見つからなかった場合はnullを返す
			return null;
		}
	}
}
