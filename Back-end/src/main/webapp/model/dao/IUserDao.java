package main.webapp.model.dao;

import main.webapp.model.entity.UserEntity;

public interface IUserDao {
    public UserEntity getUser(String gmail,String pass,String key);
}
