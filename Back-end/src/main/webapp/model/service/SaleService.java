package main.webapp.model.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import main.webapp.model.dao.ArticleDao;
import main.webapp.model.dao.IArticleDao;
import main.webapp.model.dao.ISaleDao;
import main.webapp.model.dao.SaleDao;
import main.webapp.model.entity.ArticleEntity;
import main.webapp.model.entity.DetailMasterEntity;
import main.webapp.model.entity.SaleEntity;

import java.io.BufferedReader;
import java.util.List;

public class SaleService implements ISaleService{
    @Override
    public JsonObject saveSale(BufferedReader reader) {

        Gson gson = new Gson();
        SaleEntity entity = gson.fromJson(reader, SaleEntity.class);

        ISaleDao dao = new SaleDao();
        SaleEntity sale = dao.saveSale(entity);

        IArticleDao artDao = new ArticleDao();
        List<ArticleEntity> articles = artDao.getAtiles();

        DetailMasterEntity detailMaster = new DetailMasterEntity();
        detailMaster.setSale(sale);
        detailMaster.setArticles(articles);

        String json = gson.toJson(detailMaster);

        return new JsonParser().parse(json).getAsJsonObject();
    }

    @Override
    public JsonObject updateSale(BufferedReader reader) {

        Gson gson = new Gson();
        SaleEntity entity = gson.fromJson(reader, SaleEntity.class);

        ISaleDao dao = new SaleDao();
        SaleEntity sale = dao.updateSale(entity);
        String json = gson.toJson(sale);

        return new JsonParser().parse(json).getAsJsonObject();
    }

    @Override
    public String listSales() {
        Gson gson = new Gson();
        ISaleDao dao = new SaleDao();
        List<SaleEntity> list = dao.getSales();

        return gson.toJson(list);
    }
}
