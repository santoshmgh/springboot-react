package com.example.demo.student;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(@RequestBody Student student) {
        //add if email id exists later
        studentRepository.save(student);
    }

    public boolean existsByEmailId(String email){
        return  studentRepository.exitsByEmailId(email);
    }

    public boolean existsById(long id){
        return studentRepository.existsById(id);
    }

    public void deleteStudent(long id) {
        studentRepository.deleteById(id);
    }

}
