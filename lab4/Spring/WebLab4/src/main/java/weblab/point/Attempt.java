package com.cemetiere.weblab.point;

import com.cemetiere.weblab.auth.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode

@Entity
@Table(name="point_attempts")
public class Attempt {
    @Id
    @GeneratedValue
    private long id;
    private double x;
    private double y;
    @Min(1)
    private double r;
    @Column(name="attempt_time", nullable=false)
    private long attemptTime;
    @Column(name="process_time", nullable = false)
    private double processTime;
    @Column(nullable = false)
    private boolean success;
    @JsonIgnore
    @ManyToOne(fetch=FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name="username", nullable = false)
    private User user;


}