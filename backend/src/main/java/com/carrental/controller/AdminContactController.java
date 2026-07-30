package com.carrental.controller;

import com.carrental.dto.ContactRequestDto;
import com.carrental.service.ContactRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/contact-requests")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Admin Contact Requests", description = "Admin endpoints for viewing and managing visitor contact messages")
public class AdminContactController {

    @Autowired
    private ContactRequestService contactRequestService;

    @GetMapping
    @Operation(summary = "Get paginated visitor contact requests ordered by date desc")
    public ResponseEntity<Page<ContactRequestDto>> getContactRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<ContactRequestDto> requests = contactRequestService.getAllContactRequests(page, size);
        return ResponseEntity.ok(requests);
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Mark contact request as read/handled")
    public ResponseEntity<ContactRequestDto> markAsRead(@PathVariable Long id) {
        ContactRequestDto updated = contactRequestService.markAsRead(id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete contact request")
    public ResponseEntity<Void> deleteContactRequest(@PathVariable Long id) {
        contactRequestService.deleteContactRequest(id);
        return ResponseEntity.noContent().build();
    }
}
