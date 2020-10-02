package main.webapp.model.service;

import com.google.gson.JsonObject;
import main.webapp.model.entity.UserEntity;

import java.io.BufferedReader;

public interface ILoginService {
    public JsonObject validateUser(BufferedReader reader);
    public JsonObject validateDetailMaster(String key);
}
