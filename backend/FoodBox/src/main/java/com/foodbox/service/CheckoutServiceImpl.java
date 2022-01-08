package com.foodbox.service;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.foodbox.dao.CustomerRepository;
import com.foodbox.dto.Purchase;
import com.foodbox.dto.PurchaseResponse;
import com.foodbox.entity.Customer;
import com.foodbox.entity.Order;
import com.foodbox.entity.OrderItem;

@Service
public class CheckoutServiceImpl implements CheckoutService{
	
	private CustomerRepository customerRepository;
	
	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		
		// retrieve the order info from dto
		Order order = purchase.getOrder();
		
		// generate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);
		
		// populate order with orderItems
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));
		
		// populate order with shippingAddress and billingAddress
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());
		
		// populate customer with order
		Customer customer = purchase.getCustomer();
		
		// check if this is an existing customer
		String theEmail = customer.getEmail();
		
		Customer customerFromDB = customerRepository.findByEmail(theEmail);
		
		if( customerFromDB != null ) {
			
			// we found them--let's assign it accordingly
			customer = customerFromDB;
		}
		
		customer.add(order);
		
		// save to the database
		customerRepository.save(customer);
		
		// return a response
		return new PurchaseResponse(orderTrackingNumber);
	}

	private String generateOrderTrackingNumber() {
		
		// generate a random UUID number (UUID Version-4)
		return UUID.randomUUID().toString();
	}

}
