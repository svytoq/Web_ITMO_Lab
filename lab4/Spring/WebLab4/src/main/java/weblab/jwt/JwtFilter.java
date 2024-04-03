package com.cemetiere.weblab.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final static String AUTH_PREFIX = "Bearer ";
    private final static String AUTH_HEADER = "Authorization";
    private final AuthenticationManager manager;

    @Autowired
    public JwtFilter(AuthenticationManager manager) {
        this.manager = manager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String bearer = extractBearerToken(request);

        if (!bearer.isEmpty()) {
            final JwtAuthentication auth = new JwtAuthentication();
            auth.setToken(bearer);
            manager.authenticate(auth);

            if (auth.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(request, response);
    }

    private String extractBearerToken(HttpServletRequest request) {
        final String headerContent = request.getHeader(AUTH_HEADER);

        if (headerContent == null) return "";

        if (!headerContent.startsWith(AUTH_PREFIX)) return "";

        return headerContent.substring(AUTH_PREFIX.length());
    }
}
