package main.webapp.model.dao;

import main.webapp.model.entity.SaleEntity;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SaleDao implements ISaleDao{
    ConexionSingleton conexion = ConexionSingleton.getInstance();
    PreparedStatement pr;
    @Override
    public SaleEntity saveSale(SaleEntity entity) {

        SaleEntity sale = new SaleEntity();
        try{
            String query = "insert into sales(idSale,customer, nitCustomer, dateSale, idUser, addressCustomer,totalSale) values(?,?,?,?,?,?,?) ";
            conexion.openConection();

            pr = (PreparedStatement) conexion.connection.prepareStatement(query);
            pr.setString(1,entity.getIdSales());
            pr.setString(2,entity.getCustomer());
            pr.setString(3,entity.getNitCustomer());
            pr.setString(4, entity.getDateSale());
            pr.setInt(5, entity.getIdUser());
            pr.setString(6,entity.getAddressCustomer());
            pr.setFloat(7,entity.getSaleTotal());
            pr.executeUpdate();


            String query2 = "select * from sales where idSale ="+"'"+entity.getIdSales()+"'";

            ResultSet rs = conexion.connection.createStatement().executeQuery(query2);
            while (rs.next()){
                setAttributes(rs,sale);
            }

        }catch (Exception e){
            System.out.println(e);
        }
        finally {
            conexion.closeConection();
        }

        return sale;
    }

    @Override
    public boolean deleteSale(String idSale) {
        String query ="delete from saleDetail where idSale = ?";
        try {
            conexion.openConection();
            pr = (PreparedStatement) conexion.connection.prepareStatement(query);
            pr.setString(1,idSale);
            pr.executeUpdate();

            query = "delete from sales where idSale = ?";
            pr = (PreparedStatement) conexion.connection.prepareStatement(query);
            pr.setString(1,idSale);
            pr.executeUpdate();
            conexion.closeConection();
            return true;
        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return false;
    }

    @Override
    public SaleEntity updateSale(SaleEntity entity) {
        SaleEntity sale = new SaleEntity();
        String query="update sales set totalSale =? where idSale='"+entity.getIdSales()+"'";
        try {
            conexion.openConection();
            PreparedStatement pr = (PreparedStatement) conexion.connection.prepareStatement(query);
            pr.setFloat(1,entity.getSaleTotal());
            pr.executeUpdate();

            String query2="select * from sales where idSale='"+entity.getIdSales()+"'";

            ResultSet rs = conexion.connection.createStatement().executeQuery(query2);
            while (rs.next()){
                setAttributes(rs,sale);
            }
        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return sale;
    }

    @Override
    public List<SaleEntity> getSales() {
        List<SaleEntity> list = new ArrayList<>();
        try{
            String query = "select sa.idSale,sa.customer,sa.nitCustomer,sa.dateSale,sa.idUser,ca.fullName as cashierName,sa.addressCustomer,sa.totalSale from sales sa inner join cashiers as ca on \n" +
                    "ca.idUser = sa.idUser";
            conexion.openConection();
            ResultSet rs = conexion.connection.createStatement().executeQuery(query);
            while (rs.next()){
                SaleEntity entity = new SaleEntity();
                setAttributes(rs,entity);
                entity.setNameCashier(rs.getString("cashierName"));
                list.add(entity);
            }
        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return list;
    }

    private void setAttributes(ResultSet rs, SaleEntity entity) throws SQLException {
        entity.setIdSales(rs.getString("idSale"));
        entity.setCustomer(rs.getString("customer"));
        entity.setNitCustomer(rs.getString("nitCustomer"));
        entity.setDateSale(rs.getString("dateSale"));
        entity.setIdUser(rs.getInt("idUser"));
        entity.setAddressCustomer(rs.getString("addressCustomer"));
        entity.setSaleTotal(rs.getFloat("totalSale"));
    }
}
