package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
//import java.util.Arrays;
import java.util.List;

@RestController
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @RequestMapping(path = "api/v1/students")
    public List<Student> getAllStudents() {
        //1. static data
        //return Arrays.asList(
        //        new Student(1L, "Alex", "alex@gmail.com", Gender.MALE),
        //        new Student(2L, "Willam", "William.smith@gmail.com", Gender.MALE)
        //);

        //2. handle server error
        //throw new IllegalArgumentException("Oops some error");
        return studentService.getAllStudents();
    }

    @RequestMapping(path = "api/v1/students", method = RequestMethod.POST)
    public void addStudent(@RequestBody Student student) {

        if (studentService.existsByEmailId(student.getEmail())) {
            throw new BadRequestException("Email id already exists");
        } else {
            studentService.addStudent(student);
        }
    }

    @RequestMapping(path = "api/v1/students", method = RequestMethod.DELETE)
    public void deleteStudent(@RequestBody Student student) {
        if (studentService.existsById(student.getId())) {
            throw new BadRequestException("Student Dont exists");
        } else {
            studentService.deleteStudent(student.getId());
        }
    }
}
