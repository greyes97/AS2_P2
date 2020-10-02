package main.webapp.controller;

import com.google.gson.Gson;
import main.webapp.model.dao.ArticleDao;
import main.webapp.model.dao.IArticleDao;
import main.webapp.model.entity.ArticleEntity;
import main.webapp.model.service.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "detailMaster", urlPatterns = "/api/detailMaster")
public class SaleDetailController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        Gson gson = new Gson();
        IArticleDao dao = new ArticleDao();

        try(PrintWriter out = resp.getWriter()) {
            if(req.getParameter("idArticle")==null){
                IDetailMasterService service = new DetailMasterService();
                out.println(service.getListDetailM(req.getParameter("keySale")));
            }else {
                ArticleEntity entity =dao.getArticle(Integer.parseInt(req.getParameter("idArticle")));
                String json = gson.toJson(entity);
                out.println(json);
            }

        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        BufferedReader reader = req.getReader();
        IDetailMasterService detailMas = new DetailMasterService();
        try(PrintWriter out = resp.getWriter()) {
            out.println(detailMas.saveDetailMaster(reader));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        IDetailMasterService service = new DetailMasterService();
        try(PrintWriter out = resp.getWriter()) {
            out.println(service.deleteDetailM(req.getParameter("key"),Integer.parseInt(req.getParameter("idSaleDetail"))));
        }
    }
}
