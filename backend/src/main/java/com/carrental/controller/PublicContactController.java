package com.carrental.controller;

import com.carrental.dto.ContactRequestDto;
import com.carrental.service.ContactRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@Tag(name = "Public Contact", description = "Public endpoint for submitting visitor contact requests")
public class PublicContactController {

    @Autowired
    private ContactRequestService contactRequestService;

    @PostMapping
    @Operation(summary = "Submit a new contact or car inquiry request")
    public ResponseEntity<ContactRequestDto> submitContactRequest(@Valid @RequestBody ContactRequestDto dto) {
        ContactRequestDto response = contactRequestService.createContactRequest(dto);
        return ResponseEntity.ok(response);
    }
}
