package com.example.polls.model;

public class NgOrder {
	
	String customer;
	
	String id;
	
	String date;
	
	NgCart cart;
	
	public NgOrder() {
	}

	public NgOrder(String id, String date, NgCart cart) {
		super();
		this.id = id;
		this.date = date;
		this.cart = cart;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public NgCart getCart() {
		return cart;
	}

	public void setCart(NgCart cart) {
		this.cart = cart;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

}
