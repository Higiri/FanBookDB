package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.ReferenceWork;

@Repository
public interface ReferenceWorkRepository extends JpaRepository<ReferenceWork, Integer> {
}
