package com.carrental.specification;

import com.carrental.entity.Car;
import com.carrental.entity.FuelType;
import com.carrental.entity.Transmission;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CarSpecification {

    public static Specification<Car> buildSearchSpecification(
            String search,
            String brand,
            FuelType fuel,
            Transmission transmission,
            Integer seats,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean available
    ) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.trim().toLowerCase() + "%";
                Predicate brandLike = cb.like(cb.lower(root.get("brand")), searchPattern);
                Predicate modelLike = cb.like(cb.lower(root.get("model")), searchPattern);
                predicates.add(cb.or(brandLike, modelLike));
            }

            if (brand != null && !brand.trim().isEmpty()) {
                predicates.add(cb.equal(cb.lower(root.get("brand")), brand.trim().toLowerCase()));
            }

            if (fuel != null) {
                predicates.add(cb.equal(root.get("fuel"), fuel));
            }

            if (transmission != null) {
                predicates.add(cb.equal(root.get("transmission"), transmission));
            }

            if (seats != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("seats"), seats));
            }

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("pricePerDay"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("pricePerDay"), maxPrice));
            }

            if (available != null) {
                predicates.add(cb.equal(root.get("available"), available));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
