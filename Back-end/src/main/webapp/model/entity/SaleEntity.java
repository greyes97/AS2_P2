package main.webapp.model.entity;

import java.util.Date;

public class SaleEntity {
    private String idSale;
    private String customer;
    private String nitCustomer;
    private String dateSale;
    private int idUser;
    private String addressCustomer;
    private float saleTotal;
    private String nameCashier;

    public String getNameCashier() {
        return nameCashier;
    }

    public void setNameCashier(String nameCashier) {
        this.nameCashier = nameCashier;
    }

    public float getSaleTotal() {
        return saleTotal;
    }

    public void setSaleTotal(float saleTotal) {
        this.saleTotal = saleTotal;
    }

    public String getIdSales() {
        return idSale;
    }

    public void setIdSales(String idSales) {
        this.idSale = idSales;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getNitCustomer() {
        return nitCustomer;
    }

    public void setNitCustomer(String nitCustomer) {
        this.nitCustomer = nitCustomer;
    }

    public String getDateSale() {
        return dateSale;
    }

    public void setDateSale(String dateSale) {
        this.dateSale = dateSale;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getAddressCustomer() {
        return addressCustomer;
    }

    public void setAddressCustomer(String addressCustomer) {
        this.addressCustomer = addressCustomer;
    }
}
