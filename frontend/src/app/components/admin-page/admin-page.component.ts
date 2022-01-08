import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Food } from 'src/app/common/food';
import { FoodCuisine } from 'src/app/common/food-cuisine';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  displayStyleCuisine = "none";
  formValueCuisine: FormGroup;
  foodCuisine: FoodCuisine;
  cuisineName = '';
  foodItems: Food[] = [];
  checked: boolean;
  
  
  constructor(private formBuilder: FormBuilder,
              private foodService: FoodService) { }

  ngOnInit(): void {
    this.formValueCuisine = this.formBuilder.group({
      name: [''],
    });

    this.getAllFood();
  }

  getAllFood(){
    this.foodService.getFoodList().subscribe(
      data => {
        this.foodItems = data
      }
    );
  }

  toAddCuisine() {
    this.displayStyleCuisine = "block";
  }

  addCuisine(cuisineName: string) {
    
    this.foodCuisine.cuisineName = cuisineName;
    this.foodService.addFoodCuisines(this.foodCuisine).subscribe(
      data => {
        alert("Cuisine added successfully");
      }

    );

    this.displayStyleCuisine = "none";
    this.getAllFood();
  }

  close() {
    this.displayStyleCuisine = "none";
  }

  onDeleteCuisine() {
    this.formValueCuisine = this.formBuilder.group({
      name: [''],
    });
    this.displayStyleCuisine = "none";

  }

  onEdit(id: number) {

  }

  onDelete(id: number) {

  }
 
}
