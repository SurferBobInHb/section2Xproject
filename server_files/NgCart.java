package com.example.polls.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NgCart {
	
	String id;
	
	Map<Integer, Integer> productIdQuantityMap = new HashMap<>();
	
	public NgCart() {
		
	}
	
	public NgCart(String id) {
		this.id = id;
	}
	
	public void addItemToCart(int productId, int quantity) {
		if (! productIdQuantityMap.containsKey(productId)) {
			productIdQuantityMap.put(productId, Integer.valueOf(0));
		}
		int count = productIdQuantityMap.get(productId);
		count += quantity;
		productIdQuantityMap.put(productId, count); 
	}
	
	public void removeItemFromCart(int productId, int quantity) {
		if (! productIdQuantityMap.containsKey(productId)) {
			productIdQuantityMap.put(productId, Integer.valueOf(0));
		}
		int count = productIdQuantityMap.get(productId);
		count -= quantity;
		count = Math.max(count, 0);
		productIdQuantityMap.put(productId, count);
	}
	
	public void init() {
		
	}
	
	public String getId() {
		return id;
	}
	
	public List<NgProductIdQuantity> getContents() throws Throwable {
		List<NgProductIdQuantity> productIdQuantityList = new ArrayList<NgProductIdQuantity>();
		for (Map.Entry<Integer, Integer> entry : productIdQuantityMap.entrySet()) {
			productIdQuantityList.add(new NgProductIdQuantity(entry.getKey(), entry.getValue()));
		}
		return productIdQuantityList;
	}

}
