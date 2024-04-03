package com.cemetiere.weblab.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtProvider implements AuthenticationProvider {
    private final UserDetailsService service;
    private final JwtUtils jwtUtils;

    @Autowired
    public JwtProvider(JwtUtils jwtUtils, UserDetailsService service) {
        this.service = service;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        final JwtAuthentication jwt = (JwtAuthentication) authentication;
        final String token = jwt.getCredentials().toString();

        if (jwtUtils.validateAccessToken(token)) {
            try {
                UserDetails user = service.loadUserByUsername(jwtUtils.getClaims(token).getSubject());
                jwt.setUser(user);
                authentication.setAuthenticated(true);
            } catch (UsernameNotFoundException e) {
                jwt.setUser(null);
                authentication.setAuthenticated(false);
            }
        }

        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JwtAuthentication.class);
    }
}
