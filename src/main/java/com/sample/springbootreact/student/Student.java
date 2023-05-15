package com.sample.springbootreact.student;

import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private long id;
    private String name;
    private String email;
    private Gender gender;
}
