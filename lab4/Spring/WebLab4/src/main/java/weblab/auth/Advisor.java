package com.cemetiere.weblab.auth;


import com.cemetiere.weblab.exceptions.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class Advisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IncorrectUsernameException.class)
    public ResponseEntity<?> handleIncorrectUsername(IncorrectUsernameException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<?> handleIncorrectPassword() {
        return ResponseEntity.badRequest().body("Incorrect password");
    }
    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<?> handleUserExists() {
        return ResponseEntity.badRequest().body("User already exists");
    }
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<?> handleInvalidToken() {
        return ResponseEntity.status(403).body("Invalid token");
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound() {
        return ResponseEntity.status(404).body("User was not found");
    }

}