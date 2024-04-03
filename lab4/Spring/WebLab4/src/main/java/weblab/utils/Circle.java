package com.cemetiere.weblab.utils;


public class Circle implements AbstractFigure{

    @Override
    public boolean accept(FigureVisitor visitor){
        return visitor.visit(this);
    }

}