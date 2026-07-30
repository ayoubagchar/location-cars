package com.carrental.controller;

import com.carrental.dto.CarDto;
import com.carrental.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/admin/cars")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Admin Fleet Management", description = "Admin CRUD endpoints for rental car inventory")
public class AdminCarController {

    @Autowired
    private CarService carService;

    @GetMapping
    @Operation(summary = "Admin list all cars with status filter")
    public ResponseEntity<Page<CarDto>> getAllCarsAdmin(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String fuel,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) Integer seats,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean available,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<CarDto> cars = carService.getCars(
                search, brand, fuel, transmission, seats, minPrice, maxPrice, available, page, size, sortBy, sortDir);
        return ResponseEntity.ok(cars);
    }

    @PostMapping
    @Operation(summary = "Add a new vehicle to fleet")
    public ResponseEntity<CarDto> createCar(@Valid @RequestBody CarDto dto) {
        CarDto created = carService.createCar(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing vehicle details")
    public ResponseEntity<CarDto> updateCar(@PathVariable Long id, @Valid @RequestBody CarDto dto) {
        CarDto updated = carService.updateCar(id, dto);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/availability")
    @Operation(summary = "Toggle car availability status (Available / Rented)")
    public ResponseEntity<CarDto> toggleAvailability(
            @PathVariable Long id,
            @RequestParam(required = false) Boolean available
    ) {
        CarDto updated = carService.toggleAvailability(id, available);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete vehicle from fleet")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
