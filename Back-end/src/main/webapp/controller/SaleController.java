package main.webapp.controller;

import com.google.gson.Gson;
import main.webapp.model.dao.ISaleDao;
import main.webapp.model.dao.SaleDao;
import main.webapp.model.service.ILoginService;
import main.webapp.model.service.ISaleService;
import main.webapp.model.service.LoginService;
import main.webapp.model.service.SaleService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name="sale", urlPatterns = "api/sales")
public class SaleController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        ILoginService service = new LoginService();
        ISaleService serv = new SaleService();

        try(PrintWriter out = resp.getWriter()) {
            if(req.getParameter("key")== null){
                out.println(serv.listSales());
            }else{
                out.println(service.validateDetailMaster(req.getParameter("key")));
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        BufferedReader reader = req.getReader();
        ISaleService service = new SaleService();

        try(PrintWriter out = resp.getWriter()) {
            out.println(service.saveSale(reader));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ISaleDao dao = new SaleDao();
        try(PrintWriter out = resp.getWriter()) {
            out.println(dao.deleteSale(req.getParameter("idSale")));
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        BufferedReader reader = req.getReader();
        ISaleService service = new SaleService();
        try(PrintWriter out = resp.getWriter()) {
            out.println(service.updateSale(reader));
        }
    }
}
