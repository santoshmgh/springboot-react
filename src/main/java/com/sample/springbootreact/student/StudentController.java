package com.sample.springbootreact.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@AllArgsConstructor
public class StudentController {

    @RequestMapping(path = "api/v1/students")
    public List<Student> getAllStudents(){
        return Arrays.asList(
                new Student(1L, "Alex", "alex@gmail.com", Gender.MALE),
                new Student(2L, "Willam", "William.smith@gmail.com", Gender.MALE)
        );
    }

}
