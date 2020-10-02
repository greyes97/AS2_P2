package main.webapp.model.dao;

import main.webapp.model.entity.ArticleEntity;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ArticleDao implements IArticleDao {
    ConexionSingleton conexion = ConexionSingleton.getInstance();
    @Override
    public List<ArticleEntity> getAtiles() {
        String query = "select * from articles";
        List<ArticleEntity> listArticle = new ArrayList<>();
        try {
            conexion.openConection();
            ResultSet rs = conexion.connection.createStatement().executeQuery(query);
            while (rs.next()){
                ArticleEntity article = new ArticleEntity();
                setArticleEntity(rs, article);
                listArticle.add(article);
            }
        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return listArticle;
    }

    @Override
    public ArticleEntity getArticle(int idArticle) {
        ArticleEntity entity = new ArticleEntity();
        try {
            conexion.openConection();
            String query = "select * from articles where idArticle="+idArticle;
            ResultSet rs = conexion.connection.createStatement().executeQuery(query);
            while (rs.next()){
                setArticleEntity(rs, entity);
            }

        }catch (Exception e){
            System.out.println(e);
        }finally {
            conexion.closeConection();
        }
        return entity;

    }

    private void setArticleEntity(ResultSet rs, ArticleEntity article) throws SQLException {
        article.setIdArticle(rs.getInt("idArticle"));
        article.setName(rs.getString("name"));
        article.setDescription(rs.getString("description"));
        article.setPrice(rs.getFloat("price"));
        article.setStok(rs.getInt("stok"));
        article.setColor(rs.getString("color"));
        article.setBrand((rs.getString("brand")));
        article.setEntryDate(rs.getString("entryDate"));
        article.setMadeIn((rs.getString("madeIn")));
        article.setSize(rs.getString("size"));
    }
}
