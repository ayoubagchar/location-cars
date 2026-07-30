package com.carrental.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Tag(name = "Home", description = "Root health check and status API")
public class HomeController {

    @GetMapping("/")
    @Operation(summary = "Root API Welcome Endpoint")
    public ResponseEntity<Map<String, Object>> home() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "message", "Welcome to Luxury Car Rental API",
                "swagger", "/swagger-ui.html"
        ));
    }
}
