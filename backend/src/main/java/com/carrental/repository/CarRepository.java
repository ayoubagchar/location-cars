package com.carrental.repository;

import com.carrental.entity.Car;
import com.carrental.entity.FuelType;
import com.carrental.entity.Transmission;
import com.carrental.specification.CarSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {

    @Query("SELECT DISTINCT c.brand FROM Car c ORDER BY c.brand ASC")
    List<String> findDistinctBrands();

    long countByAvailableTrue();

    long countByAvailableFalse();

    default Page<Car> searchCars(
            String search,
            String brand,
            FuelType fuel,
            Transmission transmission,
            Integer seats,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean available,
            Pageable pageable
    ) {
        return findAll(
                CarSpecification.buildSearchSpecification(
                        search, brand, fuel, transmission, seats, minPrice, maxPrice, available
                ),
                pageable
        );
    }
}
