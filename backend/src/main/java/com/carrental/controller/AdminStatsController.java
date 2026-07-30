package com.carrental.controller;

import com.carrental.dto.DashboardStatsDto;
import com.carrental.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/stats")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Admin Dashboard Stats", description = "Admin stats overview (fleet counts, available, rented, contact inquiries)")
public class AdminStatsController {

    @Autowired
    private CarService carService;

    @GetMapping
    @Operation(summary = "Get current agency statistics")
    public ResponseEntity<DashboardStatsDto> getStats() {
        return ResponseEntity.ok(carService.getDashboardStats());
    }
}
