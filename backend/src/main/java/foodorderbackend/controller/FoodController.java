package foodorderbackend.controller;

import foodorderbackend.entity.Food;
import foodorderbackend.service.FoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping
    public ResponseEntity<Food> createFood(
            @RequestBody Food food) {

        return ResponseEntity.ok(
                foodService.createFood(food)
        );
    }

    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {

        return ResponseEntity.ok(
                foodService.getAllFoods()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                foodService.getFoodById(id)
        );
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Food>> getFoodsByCategory(
            @PathVariable Long categoryId) {

        return ResponseEntity.ok(
                foodService.getFoodsByCategory(categoryId)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFoods(
            @RequestParam String name) {

        return ResponseEntity.ok(
                foodService.searchFoods(name)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(
            @PathVariable Long id,
            @RequestBody Food food) {

        return ResponseEntity.ok(
                foodService.updateFood(id, food)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFood(
            @PathVariable Long id) {

        foodService.deleteFood(id);

        return ResponseEntity.ok(
                "Food deleted successfully"
        );
    }
}
