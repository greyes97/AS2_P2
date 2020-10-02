package main.webapp.model.dao;

import main.webapp.model.entity.ArticleEntity;
import main.webapp.model.entity.SaleDetailEntity;

import java.util.List;

public interface ISaleDetailDao {
    public List<SaleDetailEntity> saveSale(SaleDetailEntity entity);
    public List<SaleDetailEntity> deleteDetail(int idSaleDetail,String idSale);
}
