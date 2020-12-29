package com.example.polls.model;

public class NgProduct {
	private int id;
    private String title;
    private double price;
    private String category;
    private String imageUrl;


    public NgProduct(int id, String title, double price, String category, String imageUrl) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
		this.category = category;
		this.imageUrl = imageUrl;
	}

	@Override
	public String toString() {
		return "NgProduct [id=" + id + ", title=" + title + ", price=" + price + ", category=" + category + ", imageUrl=" + imageUrl + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


}