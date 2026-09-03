package foodorderbackend.service;

import foodorderbackend.entity.Food;
import foodorderbackend.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Food not found"));
    }

    public Food updateFood(Long id, Food food) {

        Food existingFood = getFoodById(id);

        existingFood.setName(food.getName());
        existingFood.setDescription(food.getDescription());
        existingFood.setPrice(food.getPrice());
        existingFood.setImageUrl(food.getImageUrl());
        existingFood.setAvailable(food.isAvailable());
        existingFood.setCategory(food.getCategory());

        return foodRepository.save(existingFood);
    }

    public void deleteFood(Long id) {

        Food food = getFoodById(id);

        foodRepository.delete(food);
    }

    public List<Food> getFoodsByCategory(Long categoryId) {
        return foodRepository.findByCategoryId(categoryId);
    }

    public List<Food> searchFoods(String name) {
        return foodRepository.findByNameContainingIgnoreCase(name);
    }
}