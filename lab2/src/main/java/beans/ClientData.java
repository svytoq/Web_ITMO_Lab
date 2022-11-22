package beans;

import utils.Result;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.enterprise.context.SessionScoped;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Startup
@Singleton
public class ClientData implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private List<Result> results = List.of();
    public List<Result> getData(){
        return results;
    }
    public void setData(ArrayList<Result> results){
        this.results = results;
    }
    public void addData(Result result){
        results.add(result);
    }

}