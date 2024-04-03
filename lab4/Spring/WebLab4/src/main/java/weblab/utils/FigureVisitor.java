package com.cemetiere.weblab.utils;

import com.cemetiere.weblab.beans.FigureCollector;

public interface FigureVisitor {
    public boolean visit(Circle circle);
    public boolean visit(Rectangle rectangle);
    public boolean visit(Triangle triangle);
    public boolean visit(FigureCollector figureCollector);
    public void setCoordinates(double x, double y, double r);
}