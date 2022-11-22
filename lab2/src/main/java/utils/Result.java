package utils;

import java.io.Serializable;

public class Result implements Serializable {
    private final double x;
    private final double y;
    private final double r;
    private final String currentTime;
    private final String executionTime;
    private final boolean hitFact;

    public Result(double x, double y, double r, String currentTime, String executionTime, boolean hitFact) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
        this.hitFact = hitFact;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public boolean getHitFact() {
        return hitFact;
    }
}
