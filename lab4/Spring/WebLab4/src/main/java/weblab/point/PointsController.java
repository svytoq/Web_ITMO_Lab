package com.cemetiere.weblab.point;

import com.cemetiere.weblab.auth.User;
import com.cemetiere.weblab.beans.Checker;
import com.cemetiere.weblab.beans.FigureCollector;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/points")
@RequiredArgsConstructor
public class PointsController {
    private final Checker checker;
    private final FigureCollector figureCollector;
    private final PointAttemptRepository repository;

    @GetMapping
    public Iterable<Attempt> getPoints(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return repository.findAllByUser(user);
    }

    @PostMapping
    public Iterable<Attempt> submitPoints(@RequestBody Point point){
        //Validate
        final long start = System.nanoTime();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getDetails();
        Attempt attempt = new Attempt();
        attempt.setX(point.x());
        attempt.setY(point.y());
        attempt.setR(point.r());
        attempt.setUser(user);
        attempt.setAttemptTime(System.currentTimeMillis());
        attempt.setSuccess(checkHit(point.x(), point.y(), point.r()));
        attempt.setProcessTime(System.nanoTime() - start);
        repository.save(attempt);
        return getPoints();
    }
    public boolean checkHit(double x, double y, double r){
        checker.setCoordinates(x, y, r);
        return figureCollector.accept(checker);
    }
}
