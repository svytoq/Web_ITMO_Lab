package servlets;

import beans.DataManagerBean;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {
    @EJB
    private DataManagerBean dataManagerBean;

    @Override
    protected synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        dataManagerBean.checkAndUpdateData(request, getServletContext());
        getServletContext().getRequestDispatcher("/table.jsp").forward(request, response);
    }
}
