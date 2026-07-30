package com.carrental.service;

import com.carrental.dto.CarDto;
import com.carrental.dto.CarImageDto;
import com.carrental.dto.DashboardStatsDto;
import com.carrental.entity.Car;
import com.carrental.entity.CarImage;
import com.carrental.entity.FuelType;
import com.carrental.entity.Transmission;
import com.carrental.repository.CarImageRepository;
import com.carrental.repository.CarRepository;
import com.carrental.repository.ContactRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarImageRepository carImageRepository;

    @Autowired
    private ContactRequestRepository contactRequestRepository;

    public Page<CarDto> getCars(
            String search,
            String brand,
            String fuel,
            String transmission,
            Integer seats,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean available,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        FuelType fuelType = null;
        if (fuel != null && !fuel.trim().isEmpty()) {
            try {
                fuelType = FuelType.valueOf(fuel.trim().toUpperCase());
            } catch (IllegalArgumentException ignored) {}
        }

        Transmission transEnum = null;
        if (transmission != null && !transmission.trim().isEmpty()) {
            try {
                transEnum = Transmission.valueOf(transmission.trim().toUpperCase());
            } catch (IllegalArgumentException ignored) {}
        }

        if (search != null && search.isBlank()) {
            search = null;
        }

        if (brand != null && brand.isBlank()) {
            brand = null;
        }

        Page<Car> carPage = carRepository.searchCars(
                search, brand, fuelType, transEnum, seats, minPrice, maxPrice, available, pageable);

        return carPage.map(this::convertToDto);
    }

    public List<String> getAllBrands() {
        return carRepository.findDistinctBrands();
    }

    public CarDto getCarById(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
        return convertToDto(car);
    }

    @Transactional
    public CarDto createCar(CarDto dto) {
        Car car = Car.builder()
                .brand(dto.getBrand())
                .model(dto.getModel())
                .year(dto.getYear())
                .pricePerDay(dto.getPricePerDay())
                .description(dto.getDescription())
                .transmission(dto.getTransmission())
                .fuel(dto.getFuel())
                .seats(dto.getSeats())
                .airConditioning(dto.getAirConditioning() != null ? dto.getAirConditioning() : true)
                .available(dto.getAvailable() != null ? dto.getAvailable() : true)
                .images(new ArrayList<>())
                .build();

        Car savedCar = carRepository.save(car);

        if (dto.getImageUrls() != null && !dto.getImageUrls().isEmpty()) {
            boolean isFirst = true;
            for (String url : dto.getImageUrls()) {
                if (url != null && !url.trim().isEmpty()) {
                    CarImage image = CarImage.builder()
                            .car(savedCar)
                            .imageUrl(url.trim())
                            .isPrimary(isFirst)
                            .build();
                    savedCar.getImages().add(image);
                    isFirst = false;
                }
            }
            savedCar = carRepository.save(savedCar);
        }

        return convertToDto(savedCar);
    }

    @Transactional
    public CarDto updateCar(Long id, CarDto dto) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));

        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setPricePerDay(dto.getPricePerDay());
        car.setDescription(dto.getDescription());
        car.setTransmission(dto.getTransmission());
        car.setFuel(dto.getFuel());
        car.setSeats(dto.getSeats());
        if (dto.getAirConditioning() != null) {
            car.setAirConditioning(dto.getAirConditioning());
        }
        if (dto.getAvailable() != null) {
            car.setAvailable(dto.getAvailable());
        }

        if (dto.getImageUrls() != null) {
            car.getImages().clear();
            boolean isFirst = true;
            for (String url : dto.getImageUrls()) {
                if (url != null && !url.trim().isEmpty()) {
                    CarImage image = CarImage.builder()
                            .car(car)
                            .imageUrl(url.trim())
                            .isPrimary(isFirst)
                            .build();
                    car.getImages().add(image);
                    isFirst = false;
                }
            }
        }

        Car updatedCar = carRepository.save(car);
        return convertToDto(updatedCar);
    }

    @Transactional
    public CarDto toggleAvailability(Long id, Boolean available) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));

        if (available != null) {
            car.setAvailable(available);
        } else {
            car.setAvailable(!car.getAvailable());
        }

        Car updatedCar = carRepository.save(car);
        return convertToDto(updatedCar);
    }

    @Transactional
    public void deleteCar(Long id) {
        if (!carRepository.existsById(id)) {
            throw new RuntimeException("Car not found with id: " + id);
        }
        carRepository.deleteById(id);
    }

    public DashboardStatsDto getDashboardStats() {
        long totalCars = carRepository.count();
        long availableCars = carRepository.countByAvailableTrue();
        long rentedCars = carRepository.countByAvailableFalse();
        long unreadMessages = contactRequestRepository.countByIsReadFalse();
        long totalMessages = contactRequestRepository.count();

        return DashboardStatsDto.builder()
                .totalCars(totalCars)
                .availableCars(availableCars)
                .rentedCars(rentedCars)
                .unreadContactRequests(unreadMessages)
                .totalContactRequests(totalMessages)
                .build();
    }

    private CarDto convertToDto(Car car) {
        List<CarImageDto> imageDtos = new ArrayList<>();
        List<String> imageUrls = new ArrayList<>();

        if (car.getImages() != null) {
            for (CarImage image : car.getImages()) {
                imageDtos.add(CarImageDto.builder()
                        .id(image.getId())
                        .imageUrl(image.getImageUrl())
                        .isPrimary(image.getIsPrimary())
                        .build());
                imageUrls.add(image.getImageUrl());
            }
        }

        return CarDto.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .year(car.getYear())
                .pricePerDay(car.getPricePerDay())
                .description(car.getDescription())
                .transmission(car.getTransmission())
                .fuel(car.getFuel())
                .seats(car.getSeats())
                .airConditioning(car.getAirConditioning())
                .available(car.getAvailable())
                .images(imageDtos)
                .imageUrls(imageUrls)
                .createdAt(car.getCreatedAt())
                .updatedAt(car.getUpdatedAt())
                .build();
    }
}
