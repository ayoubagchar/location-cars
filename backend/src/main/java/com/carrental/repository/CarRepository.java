package com.carrental.repository;

import com.carrental.entity.Car;
import com.carrental.entity.FuelType;
import com.carrental.entity.Transmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {

    @Query("SELECT DISTINCT c.brand FROM Car c ORDER BY c.brand ASC")
    List<String> findDistinctBrands();

    long countByAvailableTrue();

    long countByAvailableFalse();

    @Query("SELECT c FROM Car c WHERE " +
            "(:search IS NULL OR LOWER(c.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.model) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:brand IS NULL OR :brand = '' OR LOWER(c.brand) = LOWER(:brand)) AND " +
            "(:fuel IS NULL OR c.fuel = :fuel) AND " +
            "(:transmission IS NULL OR c.transmission = :transmission) AND " +
            "(:seats IS NULL OR c.seats >= :seats) AND " +
            "(:minPrice IS NULL OR c.pricePerDay >= :minPrice) AND " +
            "(:maxPrice IS NULL OR c.pricePerDay <= :maxPrice) AND " +
            "(:available IS NULL OR c.available = :available)")
    Page<Car> searchCars(
            @Param("search") String search,
            @Param("brand") String brand,
            @Param("fuel") FuelType fuel,
            @Param("transmission") Transmission transmission,
            @Param("seats") Integer seats,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("available") Boolean available,
            Pageable pageable
    );
}
