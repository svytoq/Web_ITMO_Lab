package com.cemetiere.weblab.auth;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    @Query("select count(u) from Attempt u where u.user.username  = ?1")
    long attemptsCountByUsername(String username);

    User findByUsername(String username);
}