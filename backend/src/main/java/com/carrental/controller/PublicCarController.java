package com.carrental.controller;

import com.carrental.dto.CarDto;
import com.carrental.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@Tag(name = "Public Cars", description = "Public endpoints for exploring the rental car fleet")
public class PublicCarController {

    @Autowired
    private CarService carService;

    @GetMapping
    @Operation(summary = "Get paginated list of cars with optional filters and search")
    public ResponseEntity<Page<CarDto>> getCars(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String fuel,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) Integer seats,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean available,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<CarDto> cars = carService.getCars(
                search, brand, fuel, transmission, seats, minPrice, maxPrice, available, page, size, sortBy, sortDir);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed information for a specific car")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long id) {
        CarDto car = carService.getCarById(id);
        return ResponseEntity.ok(car);
    }

    @GetMapping("/brands")
    @Operation(summary = "Get list of all distinct car brands available in fleet")
    public ResponseEntity<List<String>> getBrands() {
        return ResponseEntity.ok(carService.getAllBrands());
    }
}
