package main.webapp.model.dao;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class ConexionSingleton {
    public static ConexionSingleton conectionDB;
    public Connection connection;

    private ConexionSingleton(){

    }
    public static ConexionSingleton getInstance(){
        if(conectionDB == null){
            conectionDB = new ConexionSingleton();
        }
        return conectionDB;
    }

    public void openConection() {

        try {
            InitialContext context = new InitialContext();
            DataSource dataSource = (DataSource) context.lookup("jdbc/DBbarillas");
            connection = dataSource.getConnection();
            System.out.println("Conexion eexitosa");
        } catch (SQLException | NamingException e) {
            closeConection();
        }

    }

    public void closeConection(){
        try{
            connection.close();
            System.out.println("Cerrando conexion");
        } catch(SQLException ex){
            System.out.println("error");
        }
    }
}
