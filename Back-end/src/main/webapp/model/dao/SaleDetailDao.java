package main.webapp.model.dao;

import main.webapp.model.entity.ArticleEntity;
import main.webapp.model.entity.SaleDetailEntity;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class SaleDetailDao implements ISaleDetailDao {
    ConexionSingleton conexion = ConexionSingleton.getInstance();
    @Override
    public List<SaleDetailEntity> saveSale(SaleDetailEntity entity) {
        List<SaleDetailEntity> listDetail = new ArrayList<>();
        try{
            String query="insert into saleDetail(idSale,idArticle,quantity,totalSale) values(?,?,?,?)";
            conexion.openConection();
            PreparedStatement pr = (PreparedStatement) conexion.connection.prepareStatement(query);
            pr.setString(1,entity.getIdSale());
            pr.setInt(2,entity.getIdAticle());
            pr.setInt(3,entity.getQuantity());
            pr.setFloat(4,entity.getTotalSale());
            pr.executeUpdate();

           listDetail = getList(entity.getIdSale());

        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return listDetail;
    }

    @Override
    public List<SaleDetailEntity> deleteDetail(int idSaleDetail, String idSale) {
        List<SaleDetailEntity> list = new ArrayList<>();
        try {
            String query = "delete from saleDetail where idSaleDetail = ?";
            conexion.openConection();
            PreparedStatement pr = conexion.connection.prepareStatement(query);
            pr.setInt(1,idSaleDetail);
            pr.executeUpdate();

            list = getList(idSale);
        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return list;
    }

    public List<SaleDetailEntity> getList(String idSale){

        List<SaleDetailEntity> list = new ArrayList<>();
        String query = "select sa.idSaleDetail, ar.name, sa.idSale, sa.quantity, ar.price ,sa.totalSale from saleDetail sa inner join articles as ar on \n" +
                     "ar.idArticle = sa.idArticle where idSale ="+"'"+idSale+"'";
        try {
            conexion.openConection();
            ResultSet rs = conexion.connection.createStatement().executeQuery(query);
            while (rs.next()){
                SaleDetailEntity detail = new SaleDetailEntity();
                detail.setIdSaleDetail(rs.getInt("idSaleDetail"));
                detail.setArticle(rs.getString("name"));
                detail.setIdSale(rs.getString("idSale"));
                detail.setQuantity(rs.getInt("quantity"));
                detail.setPrice(rs.getFloat("price"));
                detail.setTotalSale(rs.getFloat("totalSale"));
                list.add(detail);
            }
        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return list;
    }
}
