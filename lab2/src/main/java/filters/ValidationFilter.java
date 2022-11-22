package filters;

import beans.ValidationBean;

import javax.ejb.EJB;
import javax.servlet.*;
import java.io.IOException;

public class ValidationFilter implements Filter {
    private final String path = "/error";

    @EJB
    private ValidationBean validator;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        var servletContext = request.getServletContext();
        RequestDispatcher requestDispatcher = servletContext.getRequestDispatcher(path);
        if (validator.validate(request.getParameter("x"), request.getParameter("y"), request.getParameter("r"))){
            chain.doFilter(request, response);
        } else {
            requestDispatcher.forward(request, response);
        }
    }

    @Override
    public void destroy() {
    }
}

interface SomeInt{
    void fun();
}

class SomeIntImpl implements SomeInt {

    @Override
    public void fun() {
        System.out.println("...");
    }
}

class External {

    private final SomeInt inte;

    External(SomeInt inte) {
        this.inte = inte;
    }


    public void call(){
        inte.fun();
    }

}