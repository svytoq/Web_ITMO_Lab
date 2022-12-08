package beans;




import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Named(value = "dbManager")
@Transactional
public class DBManager {
    private List<Result> results;
    @PersistenceContext(unitName = "db")
    private EntityManager em;


    public DBManager(){
        results = new ArrayList<>();
    }

    @PostConstruct
    public void init(){
        results.addAll(em.createQuery("SELECT a FROM resultats a", Result.class).getResultList());
    }

    public List<Result> getResults() {
        return results;
    }

    synchronized public void addResult(Result res){
        results.add(res);
        em.persist(res);
        updateResult();
    }

    public void updateResult(){
        results.clear();
        init();
    }
}