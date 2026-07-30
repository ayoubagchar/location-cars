package com.carrental.dto;

import com.carrental.entity.FuelType;
import com.carrental.entity.Transmission;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CarDto {

    private Long id;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1990, message = "Year must be 1990 or newer")
    @Max(value = 2030, message = "Invalid year")
    private Integer year;

    @NotNull(message = "Price per day is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal pricePerDay;

    private String description;

    @NotNull(message = "Transmission is required")
    private Transmission transmission;

    @NotNull(message = "Fuel type is required")
    private FuelType fuel;

    @NotNull(message = "Seats count is required")
    @Min(value = 1, message = "At least 1 seat required")
    private Integer seats;

    private Boolean airConditioning;

    private Boolean available;

    private List<CarImageDto> images = new ArrayList<>();

    private List<String> imageUrls;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CarDto() {}

    public CarDto(Long id, String brand, String model, Integer year, BigDecimal pricePerDay, String description, Transmission transmission, FuelType fuel, Integer seats, Boolean airConditioning, Boolean available, List<CarImageDto> images, List<String> imageUrls, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.pricePerDay = pricePerDay;
        this.description = description;
        this.transmission = transmission;
        this.fuel = fuel;
        this.seats = seats;
        this.airConditioning = airConditioning;
        this.available = available;
        this.images = images != null ? images : new ArrayList<>();
        this.imageUrls = imageUrls;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static CarDtoBuilder builder() {
        return new CarDtoBuilder();
    }

    public static class CarDtoBuilder {
        private Long id;
        private String brand;
        private String model;
        private Integer year;
        private BigDecimal pricePerDay;
        private String description;
        private Transmission transmission;
        private FuelType fuel;
        private Integer seats;
        private Boolean airConditioning;
        private Boolean available;
        private List<CarImageDto> images = new ArrayList<>();
        private List<String> imageUrls;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public CarDtoBuilder id(Long id) { this.id = id; return this; }
        public CarDtoBuilder brand(String brand) { this.brand = brand; return this; }
        public CarDtoBuilder model(String model) { this.model = model; return this; }
        public CarDtoBuilder year(Integer year) { this.year = year; return this; }
        public CarDtoBuilder pricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public CarDtoBuilder description(String description) { this.description = description; return this; }
        public CarDtoBuilder transmission(Transmission transmission) { this.transmission = transmission; return this; }
        public CarDtoBuilder fuel(FuelType fuel) { this.fuel = fuel; return this; }
        public CarDtoBuilder seats(Integer seats) { this.seats = seats; return this; }
        public CarDtoBuilder airConditioning(Boolean airConditioning) { this.airConditioning = airConditioning; return this; }
        public CarDtoBuilder available(Boolean available) { this.available = available; return this; }
        public CarDtoBuilder images(List<CarImageDto> images) { this.images = images; return this; }
        public CarDtoBuilder imageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; return this; }
        public CarDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public CarDtoBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public CarDto build() {
            return new CarDto(id, brand, model, year, pricePerDay, description, transmission, fuel, seats, airConditioning, available, images, imageUrls, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Transmission getTransmission() { return transmission; }
    public void setTransmission(Transmission transmission) { this.transmission = transmission; }

    public FuelType getFuel() { return fuel; }
    public void setFuel(FuelType fuel) { this.fuel = fuel; }

    public Integer getSeats() { return seats; }
    public void setSeats(Integer seats) { this.seats = seats; }

    public Boolean getAirConditioning() { return airConditioning; }
    public void setAirConditioning(Boolean airConditioning) { this.airConditioning = airConditioning; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }

    public List<CarImageDto> getImages() { return images; }
    public void setImages(List<CarImageDto> images) { this.images = images; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
