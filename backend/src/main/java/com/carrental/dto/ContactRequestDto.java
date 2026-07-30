package com.carrental.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ContactRequestDto {

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Message cannot be empty")
    private String message;

    private Boolean isRead;

    private LocalDateTime createdAt;

    public ContactRequestDto() {}

    public ContactRequestDto(Long id, String name, String phone, String email, String message, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.message = message;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    public static ContactRequestDtoBuilder builder() {
        return new ContactRequestDtoBuilder();
    }

    public static class ContactRequestDtoBuilder {
        private Long id;
        private String name;
        private String phone;
        private String email;
        private String message;
        private Boolean isRead;
        private LocalDateTime createdAt;

        public ContactRequestDtoBuilder id(Long id) { this.id = id; return this; }
        public ContactRequestDtoBuilder name(String name) { this.name = name; return this; }
        public ContactRequestDtoBuilder phone(String phone) { this.phone = phone; return this; }
        public ContactRequestDtoBuilder email(String email) { this.email = email; return this; }
        public ContactRequestDtoBuilder message(String message) { this.message = message; return this; }
        public ContactRequestDtoBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public ContactRequestDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ContactRequestDto build() {
            return new ContactRequestDto(id, name, phone, email, message, isRead, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
