package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Picture;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Integer> {
}
