package com.cemetiere.weblab.beans;

import com.cemetiere.weblab.utils.Circle;
import com.cemetiere.weblab.utils.FigureVisitor;
import com.cemetiere.weblab.utils.Rectangle;
import com.cemetiere.weblab.utils.Triangle;

import java.io.Serializable;

/**
 * Figure visitor that checks hits.
 */


public class Checker implements FigureVisitor, Serializable {
    private double x;
    private double y;
    private double r;
    @Override
    public void setCoordinates(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;
    }
    @Override
    public boolean visit(Circle circle) {
        double rr = Math.sqrt(x*x+y*y);
        return (x>=0 && y>=0 && rr<=((double)r));
    }
    @Override
    public boolean visit(Rectangle rectangle) {
        return x<=0 && y>=0 && y<=((double)r) && x>=-((double)r)/2;
    }
    @Override
    public boolean visit(Triangle triangle) {
        return x>=0 && y<=0 && y>=(x-r);
    }
    @Override
    public boolean visit(FigureCollector figureCollector) {
        return true;
    }
}