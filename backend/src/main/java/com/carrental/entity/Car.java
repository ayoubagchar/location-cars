package com.carrental.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(name = "car_year", nullable = false)
private Integer year;

    @Column(name = "price_per_day", nullable = false)
    private BigDecimal pricePerDay;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Transmission transmission;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuel;

    @Column(nullable = false)
    private Integer seats;

    @Column(name = "air_conditioning", nullable = false)
    private Boolean airConditioning = true;

    @Column(nullable = false)
    private Boolean available = true;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<CarImage> images = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Car() {}

    public Car(Long id, String brand, String model, Integer year, BigDecimal pricePerDay, String description, Transmission transmission, FuelType fuel, Integer seats, Boolean airConditioning, Boolean available, List<CarImage> images, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.pricePerDay = pricePerDay;
        this.description = description;
        this.transmission = transmission;
        this.fuel = fuel;
        this.seats = seats;
        this.airConditioning = airConditioning != null ? airConditioning : true;
        this.available = available != null ? available : true;
        this.images = images != null ? images : new ArrayList<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public static CarBuilder builder() {
        return new CarBuilder();
    }

    public static class CarBuilder {
        private Long id;
        private String brand;
        private String model;
        private Integer year;
        private BigDecimal pricePerDay;
        private String description;
        private Transmission transmission;
        private FuelType fuel;
        private Integer seats;
        private Boolean airConditioning = true;
        private Boolean available = true;
        private List<CarImage> images = new ArrayList<>();
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public CarBuilder id(Long id) { this.id = id; return this; }
        public CarBuilder brand(String brand) { this.brand = brand; return this; }
        public CarBuilder model(String model) { this.model = model; return this; }
        public CarBuilder year(Integer year) { this.year = year; return this; }
        public CarBuilder pricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public CarBuilder description(String description) { this.description = description; return this; }
        public CarBuilder transmission(Transmission transmission) { this.transmission = transmission; return this; }
        public CarBuilder fuel(FuelType fuel) { this.fuel = fuel; return this; }
        public CarBuilder seats(Integer seats) { this.seats = seats; return this; }
        public CarBuilder airConditioning(Boolean airConditioning) { this.airConditioning = airConditioning; return this; }
        public CarBuilder available(Boolean available) { this.available = available; return this; }
        public CarBuilder images(List<CarImage> images) { this.images = images; return this; }
        public CarBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public CarBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Car build() {
            return new Car(id, brand, model, year, pricePerDay, description, transmission, fuel, seats, airConditioning, available, images, createdAt, updatedAt);
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

    public List<CarImage> getImages() { return images; }
    public void setImages(List<CarImage> images) { this.images = images; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
