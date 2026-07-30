package com.carrental.controller;

import com.carrental.dto.AgencySettingsDto;
import com.carrental.service.AgencySettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/agency")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Admin Agency Settings", description = "Admin endpoint for updating agency details & contact numbers")
public class AdminSettingsController {

    @Autowired
    private AgencySettingsService agencySettingsService;

    @PutMapping
    @Operation(summary = "Update agency profile, contact phone/whatsapp, address & hero copy")
    public ResponseEntity<AgencySettingsDto> updateSettings(@Valid @RequestBody AgencySettingsDto dto) {
        AgencySettingsDto updated = agencySettingsService.updateSettings(dto);
        return ResponseEntity.ok(updated);
    }
}
