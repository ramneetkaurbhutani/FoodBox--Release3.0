package com.foodbox.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "food_cuisine")
@Getter
@Setter
public class FoodCuisine {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "cuisine_name")
	private String cuisineName;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cuisine")
	private Set<Food> foods;

}
