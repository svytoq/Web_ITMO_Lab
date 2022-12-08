package beans;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.faces.bean.ManagedBean;

import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@ApplicationScoped
@Named(value = "point")
@NoArgsConstructor
@AllArgsConstructor
public class Point implements Serializable {

    @Inject
    private DBManager data;
    @Inject
    private Checker checker;

    @Min(-2) @Max(2)
    private double x;
    @Min(-3) @Max(5)
    private double y;
    @Min(2) @Max(5)
    private double r;

    public void submit() {
        final long start = System.nanoTime();
        final boolean res = checkHit() ;
        final boolean validate = isValid();

        Result result = new Result();
        result.setX(x);
        result.setY(y);
        result.setR(r);
        result.setHitFact(res);
        result.setCurrentTime(getDate());
        result.setExecutionTime(String.format("%.6f", (System.nanoTime() - start) * 10e-9).replace(",", "."));
        data.addResult(result);
    }

    public boolean checkHit(){
        return checker.checkHit(x, y, r);
    }

    public boolean isValid(){
        return checker.isValid(this);
    }

    public String getDate(){
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        return formatter.format(date);
    }

}
