package main.webapp.model.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import main.webapp.model.dao.IUserDao;
import main.webapp.model.dao.UserDao;
import main.webapp.model.entity.UserEntity;

import java.io.BufferedReader;

public class LoginService implements ILoginService {
    JsonObject jsonObject;
    Gson gson = new Gson();
    @Override
    public JsonObject validateUser(BufferedReader reader) {

        UserEntity entity = gson.fromJson(reader,UserEntity.class);
        IUserDao dao = new UserDao();
        UserEntity user = dao.getUser(entity.getGmail(),entity.getPassword(),entity.getKey());
        String json = gson.toJson(user);
        jsonObject = new JsonParser().parse(json).getAsJsonObject();

        return jsonObject;

    }

    @Override
    public JsonObject validateDetailMaster(String key) {

        IUserDao dao = new UserDao();
        UserEntity user = dao.getUser("","",key);
        String json = gson.toJson(user);
        jsonObject = new JsonParser().parse(json).getAsJsonObject();

        return jsonObject;
    }
}
