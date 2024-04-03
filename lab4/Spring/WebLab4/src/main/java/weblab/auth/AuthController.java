package com.cemetiere.weblab.auth;

import com.cemetiere.weblab.exceptions.*;
import com.cemetiere.weblab.jwt.JwtPair;
import com.cemetiere.weblab.jwt.JwtRefreshToken;
import com.cemetiere.weblab.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService service;
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwt;


    @GetMapping("/users")
    public Iterable<User> getAllUsers() {
        return repository.findAll();
    }

//    @GetMapping("/users/{username}")
//    public User getUserInfo(@PathVariable String username) {
//        try {
//            return (User) service.loadUserByUsername(username);
//        } catch (UsernameNotFoundException e) {
//            throw new UserNotFoundException();
//        }
//    }
    @GetMapping("/users/{username}")
    public UserDTO getUserInfo(@PathVariable String username){
        UserDTO user = new UserDTO();
        user.setUsername(username);
        user.setAttempts(repository.attemptsCountByUsername(username));
        return user;
    }

    @PostMapping("/login")
    public JwtPair login(@RequestBody AuthRequest request) {
        // Load user or throw exception
        UserDetails user;
        try {
            user = service.loadUserByUsername(request.username());
        } catch (UsernameNotFoundException e) {
            throw new IncorrectUsernameException(request.username());
        }

        if (!encoder.matches(request.password(), user.getPassword())) {
            throw new IncorrectPasswordException();
        }

        return new JwtPair(
                jwt.generateAccessToken(user),
                jwt.generateRefreshToken(user)
        );
    }

    @PostMapping("/refresh")
    public JwtPair refresh(@RequestBody JwtRefreshToken refreshToken) {
        if (jwt.validateRefreshToken(refreshToken.refreshToken())) {
            try {
                UserDetails user = service.loadUserByUsername(jwt.getClaims(refreshToken.refreshToken()).getSubject());
                return new JwtPair(
                    jwt.generateAccessToken(user),
                    jwt.generateRefreshToken(user)
                );
            } catch (UsernameNotFoundException ignored) {}
        }

        throw new InvalidTokenException();
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        // Validate
        if (!request.username().matches("^[a-zA-Z0-9_]{3,10}$")) {
            throw new IncorrectUsernameException(request.username());
        }

        if (!request.password().matches("^[a-zA-Z0-9_]{3,10}$")) {
            throw new IncorrectPasswordException();
        }

        if (repository.existsById(request.username())) {
            throw new UserExistsException();
        }

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(encoder.encode(request.password()));
        repository.save(user);

        return "Success!";
    }
}
