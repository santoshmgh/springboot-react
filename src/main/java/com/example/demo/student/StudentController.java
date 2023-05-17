package com.example.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;
    @RequestMapping(path = "api/v1/students")
    public List<Student> getAllStudents(){
        //return Arrays.asList(
        //        new Student(1L, "Alex", "alex@gmail.com", Gender.MALE),
        //        new Student(2L, "Willam", "William.smith@gmail.com", Gender.MALE)
        //);
        return studentService.getAllStudents();
    }

    @RequestMapping(path = "api/v1/students", method = RequestMethod.POST)
    public void addStudent(@RequestBody Student student){
        studentService.addStudent(student);
    }
}
