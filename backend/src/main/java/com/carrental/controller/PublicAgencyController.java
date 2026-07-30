package com.carrental.controller;

import com.carrental.dto.AgencySettingsDto;
import com.carrental.service.AgencySettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/agency")
@Tag(name = "Public Agency Info", description = "Public endpoint for obtaining agency contact and branding details")
public class PublicAgencyController {

    @Autowired
    private AgencySettingsService agencySettingsService;

    @GetMapping
    @Operation(summary = "Get agency public details (name, phone, whatsapp, address, hero headers)")
    public ResponseEntity<AgencySettingsDto> getAgencyInfo() {
        return ResponseEntity.ok(agencySettingsService.getSettings());
    }
}
