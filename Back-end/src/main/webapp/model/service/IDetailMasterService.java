package main.webapp.model.service;

import com.google.gson.JsonObject;

import java.io.BufferedReader;

public interface IDetailMasterService {
    public String saveDetailMaster(BufferedReader reader);
    public String deleteDetailM(String keySale, int idSaleDetail);
    public String getListDetailM(String keySale);
}
