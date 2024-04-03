package com.cemetiere.weblab.beans;
import java.io.Serializable;
import java.util.stream.Stream;
import com.cemetiere.weblab.utils.*;



/**
 *  Collects all figures and accepts visitor to each of them
 */
public class FigureCollector implements AbstractFigure, Serializable {
    AbstractFigure[] figures;
    public FigureCollector(){
        this.figures = new AbstractFigure[]{
                new Circle(),
                new Rectangle(),
                new Triangle()
        };
    }

    @Override
    public boolean accept(FigureVisitor visitor) {
        return Stream.of(figures).anyMatch(figure -> figure.accept(visitor));
    }

}