package com.cemetiere.weblab.point;

import com.cemetiere.weblab.auth.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PointAttemptRepository extends CrudRepository<Attempt, Long> {
    List<Attempt> findAllByUser(User user);
}