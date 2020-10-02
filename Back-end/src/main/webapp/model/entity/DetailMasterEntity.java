package main.webapp.model.entity;

import java.util.List;

public class DetailMasterEntity {
    private SaleEntity sale;
    private List<ArticleEntity> articles;

    public SaleEntity getSale() {
        return sale;
    }

    public void setSale(SaleEntity sale) {
        this.sale = sale;
    }

    public List<ArticleEntity> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticleEntity> articles) {
        this.articles = articles;
    }
}
