package com.example.polls.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.polls.model.NgCart;
import com.example.polls.model.NgProduct;
import com.example.polls.model.NgProductIdQuantity;
import com.example.polls.payload.ApiResponse;

@RestController
@RequestMapping("/angular")
public class AngularController {
	
    List<NgProduct> productList = new ArrayList<>();
    
	public AngularController() {
        productList.add(new NgProduct(1, "rolls", 1.2, "milk", "https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg"));
        productList.add(new NgProduct(2, "pancakes", 5.2, "bread", "https://cdn.pixabay.com/photo/2018/11/11/19/46/christmas-bauble-3809544_960_720.jpg"));
        productList.add(new NgProduct(3, "hamburgers", 13.2, "meat", "https://cdn.pixabay.com/photo/2020/03/01/12/36/fire-4892711_960_720.jpg"));
        productList.add(new NgProduct(4, "fries", .5, "extras", "https://cdn.pixabay.com/photo/2019/12/11/18/06/dog-4688913_960_720.jpg"));
        productList.add(new NgProduct(5, "fries", 22.5, "extras", "https://images.pexels.com/photos/4627309/pexels-photo-4627309.jpeg?cs=srgb&dl=pexels-nick-bondarev-4627309.jpg&fm=jpg"));
        productList.add(new NgProduct(6, "pancakes", 22.5, "extras", "https://www.thephuketnews.com/photo/banner/2018/1543206953_1-org.gif"));
	}

    @GetMapping("/products")
    public List<NgProduct> getProducts() {
        return productList;
    }
    
    @GetMapping("/product/{id}")
    public NgProduct getProduct(@PathVariable(value="id") Integer id) {
    	NgProduct product = productList.stream().filter(p -> p.getId() == id).findFirst().orElseThrow();
        return product;
    }
    
    @PutMapping("/product/edit/{id}")
    public void editProduct(@PathVariable(value="id") Integer id, @RequestBody NgProduct productData) {
    	NgProduct product = productList.stream().filter(p -> p.getId() == id).findFirst().orElseThrow();
    	product.setCategory(productData.getCategory());
    	product.setImageUrl(productData.getCategory());
    	product.setPrice(productData.getPrice());
    	product.setTitle(productData.getTitle());
    	
    	productList.forEach(p -> System.out.println(p));
    }
    
    @PostMapping("/product/create")
    public void createProduct(@RequestBody NgProduct productData) {
    	int maxId = productList.stream().mapToInt(p -> p.getId()).max().getAsInt() + 1;
    	productData.setId(maxId);
    	productList.add(productData);
    	
    	productList.forEach(p -> System.out.println(p));
    }
    
    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable(value="id") Integer id) {
    	productList.removeIf(p -> p.getId() == id);
    	return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, String.format("Deleted product id %s", id)));
//    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, String.format("Parent message id %s not found", id)));

    }
    
    @GetMapping("/product/categories")
    public List<String> getCategories() {
    	List<String> uniqueCategories = productList.stream().map(p -> p.getCategory()).sorted().distinct().collect(Collectors.toList());
    	return uniqueCategories;
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    Map<String, NgCart> cartManager = new HashMap<>();
    
    @GetMapping("/cart/add/{cartId}/{productId}/{quantity}")
    public ResponseEntity<ApiResponse> addToCart(@PathVariable(value="cartId") String cartId, @PathVariable(value="productId") int productId, @PathVariable(value="quantity") int quantity) {
    	NgCart cart;
    	if (! cartManager.containsKey(cartId)) {
    		cart = new NgCart(cartId);
    		cartManager.put(cartId, cart);
    	}
    	else
    		cart = cartManager.get(cartId);
    	cart.addItemToCart(productId, quantity);
    	return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, String.format("Added product id %d to cart %s", productId, cartId)));
    }
    
    @GetMapping("/cart/remove/{cartId}/{productId}/{quantity}")
    public ResponseEntity<ApiResponse> removeFromCart(@PathVariable(value="cartId") String cartId, @PathVariable(value="productId") int productId, @PathVariable(value="quantity") int quantity) {
    	NgCart cart;
    	if (! cartManager.containsKey(cartId)) {
    		cart = new NgCart(cartId);
    		cartManager.put(cartId, cart);
    	}
    	else
    		cart = cartManager.get(cartId);
    	cart.removeItemFromCart(productId, quantity);
    	return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, String.format("Added product id %d to cart %s", productId, cartId)));
    }
    
    @GetMapping("/cart/get/{cartId}")
    public NgCart getCart(@PathVariable(value="cartId") String cartId) throws Throwable {
    	NgCart cart;
    	if (! cartManager.containsKey(cartId)) {
    		cart = new NgCart(cartId);
//    		cart.addItemToCart(1, 6);
//    		cart.addItemToCart(2, 36);
//    		cart.addItemToCart(3, 22);
    	}
    	else
    		cart = cartManager.get(cartId);
    	
    	return cart;
    }
    


}