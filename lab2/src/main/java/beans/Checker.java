package beans;

import utils.Query;

import javax.ejb.DependsOn;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.math.BigDecimal;
import java.util.logging.Logger;

@Startup
@DependsOn("ClientData")
@Singleton
public class Checker{

    private static final Logger log = Logger.getLogger(Checker.class.toString());

    public boolean checkHit(int x, double y, int r){
        log.info("Checking x= " + x + " y=" + y + " " + " r="+r);
        Query query = new Query(new BigDecimal(x), new BigDecimal(y), new BigDecimal(r), null);
        return query.getResult();
    }
}