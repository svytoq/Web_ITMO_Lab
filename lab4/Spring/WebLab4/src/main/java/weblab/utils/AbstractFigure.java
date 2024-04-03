package com.cemetiere.weblab.utils;

@FunctionalInterface
public interface AbstractFigure {
    public boolean accept(FigureVisitor visitor);
}