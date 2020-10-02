package main.webapp.model.dao;

import main.webapp.model.entity.SaleEntity;

import java.util.List;

public interface ISaleDao {
    public SaleEntity saveSale(SaleEntity entity);
    public boolean deleteSale(String idSale);
    public SaleEntity updateSale(SaleEntity entity);
    public List<SaleEntity> getSales();
}
