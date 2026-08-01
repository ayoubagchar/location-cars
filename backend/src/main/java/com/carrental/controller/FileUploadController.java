package com.carrental.controller;

import com.carrental.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "File Upload", description = "Upload car image files")
public class FileUploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    @Operation(summary = "Upload single image file and obtain static URL")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileStorageService.storeFile(file);
        return ResponseEntity.ok(Map.of("url", fileUrl));
    }

    @PostMapping("/multiple")
    @Operation(summary = "Upload multiple image files and obtain static URLs")
    public ResponseEntity<Map<String, List<String>>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> urls = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    urls.add(fileStorageService.storeFile(file));
                }
            }
        }
        return ResponseEntity.ok(Map.of("urls", urls));
    }
}
