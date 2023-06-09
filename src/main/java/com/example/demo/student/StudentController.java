package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
//import java.util.Arrays;
import javax.validation.Valid;
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
    public void addStudent(@Valid @RequestBody Student student) {

        if (studentService.existsByEmailId(student.getEmail())) {
            throw new BadRequestException("Email id already exists");
        } else {
            studentService.addStudent(student);
        }
    }

    @RequestMapping(path = "api/v1/students", method = RequestMethod.DELETE)
    public void deleteStudent(@RequestBody Student student) {
        if (studentService.existsById(student.getId())) {
            studentService.deleteStudent(student.getId());
        } else {
            throw new BadRequestException("Student Dont exists");
        }
    }

    @RequestMapping(path = "api/v1/students", method = RequestMethod.PUT)
    public void updateStudent(@RequestBody Student student) {
        if (studentService.existsById(student.getId()) && !studentService.existsByEmailId(student.getEmail())) {
            studentService.updateStudent(student);
        } else {
            throw new BadRequestException("Student Dont exists");
        }
    }
}
