package main.webapp.model.service;

import com.google.gson.JsonObject;

import java.io.BufferedReader;

public interface ISaleService {
    public JsonObject saveSale(BufferedReader reader);
    public JsonObject updateSale(BufferedReader reader);
    public String listSales();
}
