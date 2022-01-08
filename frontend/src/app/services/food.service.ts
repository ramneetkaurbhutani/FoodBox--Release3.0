import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../common/food';
import { map } from 'rxjs/operators';
import { FoodCuisine } from '../common/food-cuisine';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  private baseUrl = 'http://localhost:8094/api/foods';

  private cuisineUrl = 'http://localhost:8094/api/food-cuisine';

  constructor(private httpClient: HttpClient) { }

  getFoodListByIdPaginate(theCuisineId: number,
                          thePage: number,
                          thePageSize: number): Observable<GetResponseFoods> {

    // need to build Url based on cuisine id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCuisineId?id=${theCuisineId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseFoods>(searchUrl); 
  }

  getFoodListById(theCuisineId: number): Observable<Food[]> {

    // need to build Url based on cuisine id
    const searchUrl = `${this.baseUrl}/search/findByCuisineId?id=${theCuisineId}`;

    return this.getFoods(searchUrl);  
  }

  getFoodList(): Observable<Food[]> {
    return this.httpClient.get<GetResponseFoods>(this.baseUrl).pipe(
      map(response => response._embedded.foods)
    );
  }

  getFood(theFoodId: number): Observable<Food> {
    //need to build URL based on the food id
    const foodUrl = `${this.baseUrl}/${theFoodId}`;
    return this.httpClient.get<Food>(foodUrl);
  }

  searchFoods(theKeyword: string): Observable<Food[]>{
    
    //need to build Url based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getFoods(searchUrl);
  }

  searchFoodsPaginate(thePage: number,
                      thePageSize: number,
                      theKeyword: string): Observable<GetResponseFoods> {

    // need to build Url based on keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseFoods>(searchUrl); 
  }
  
  private getFoods(searchUrl: string): Observable<Food[]> {
    return this.httpClient.get<GetResponseFoods>(searchUrl).pipe(
      map(response => response._embedded.foods)
    );
  }

  getFoodCuisines(): Observable<FoodCuisine[]>{

    return this.httpClient.get<GetResponseFoodCuisine>(this.cuisineUrl).pipe(
      map(response => response._embedded.foodCuisine)
    );  
  }

  addFoodCuisines(foodCuisine: FoodCuisine): Observable<any> {
    return this.httpClient.post<any>(this.cuisineUrl, foodCuisine);
  }

}

interface GetResponseFoods {
  _embedded: {
      foods: Food[];
  },
  page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
  }
}

interface GetResponseFoodCuisine {
  _embedded: {
      foodCuisine: FoodCuisine[];
  }
}
