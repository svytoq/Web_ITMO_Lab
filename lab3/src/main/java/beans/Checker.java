package beans;




import javax.enterprise.context.SessionScoped;


import javax.inject.Named;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.io.Serializable;
import java.util.Set;
import java.util.logging.Logger;

@SessionScoped
@Named("checker")
public class Checker implements Serializable {

    private static final Logger log = Logger.getLogger(Checker.class.toString());

    public boolean checkHit(double x, double y, double r){
        log.info("Checking x= " + x + " y=" + y + " " + " r="+r);
        return checkCircle(x, y, r) || checkRectangle(x, y, r) || checkTriangle(x, y, r);
    }

    public boolean isValid(Point point){
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<Point>> violations = validator.validate(point);
        if (violations.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    private boolean checkCircle(double x, double y, double r){
        double rr = Math.sqrt(x*x+y*y);
        boolean result = x<=0 && y>=0 && rr<=((double)r/2);
        return result;
    }

    private boolean checkRectangle(double x, double y, double r){
        return x>=0 && y<=0 && y>=-((double)r)/2 && x<=((double)r);
    }

    private boolean checkTriangle(double x, double y, double r){
        return x<=0 && y<=0 && y>=(-x-r);
    }
}