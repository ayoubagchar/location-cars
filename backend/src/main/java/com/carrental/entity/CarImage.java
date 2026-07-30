package com.carrental.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "car_images")
public class CarImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url", nullable = false, length = 1000)
    private String imageUrl;

    @Column(name = "is_primary", nullable = false)
    private Boolean isPrimary = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    @JsonBackReference
    private Car car;

    public CarImage() {}

    public CarImage(Long id, String imageUrl, Boolean isPrimary, Car car) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.isPrimary = isPrimary != null ? isPrimary : false;
        this.car = car;
    }

    public static CarImageBuilder builder() {
        return new CarImageBuilder();
    }

    public static class CarImageBuilder {
        private Long id;
        private String imageUrl;
        private Boolean isPrimary = false;
        private Car car;

        public CarImageBuilder id(Long id) { this.id = id; return this; }
        public CarImageBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public CarImageBuilder isPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; return this; }
        public CarImageBuilder car(Car car) { this.car = car; return this; }

        public CarImage build() {
            return new CarImage(id, imageUrl, isPrimary, car);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getIsPrimary() { return isPrimary; }
    public void setIsPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }
}
