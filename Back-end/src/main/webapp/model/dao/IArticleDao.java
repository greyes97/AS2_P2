package main.webapp.model.dao;

import main.webapp.model.entity.ArticleEntity;

import java.util.List;

public interface IArticleDao {
    public List<ArticleEntity> getAtiles();
    public ArticleEntity getArticle(int idArticle);
}
