package beans;


import lombok.*;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity(name="resultats")
@Table(name="resultats", schema = "s282509")
public class Result implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="PointsIdSequns")
    @SequenceGenerator(name="PointsIdSequns", sequenceName="points_id_sequns", allocationSize = 1)
    private Long id;

    private double x;

    private double y;


    private double r;

    private String currentTime;
    private String executionTime;

    private boolean hitFact;

    public Result(Long id, double x, double y, double r, String currentTime, String executionTime, boolean hitFact) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
        this.hitFact = hitFact;
    }

    public Result() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }

    public boolean isHitFact() {
        return hitFact;
    }

    public void setHitFact(boolean hitFact) {
        this.hitFact = hitFact;
    }




}

