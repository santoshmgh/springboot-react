package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM Student s WHERE s.email = ?1")
    Boolean exitsByEmailId(String email);

    @Modifying
    @Query("UPDATE Student s SET s.name = :name, s.email = :email, s.gender = :gender WHERE s.id = :id")
    int updateStudent(@Param("name")String name, @Param("email")String email, @Param("gender")Gender gender, @Param("id")long id);
}
