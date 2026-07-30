package com.carrental.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_requests")
public class ContactRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ContactRequest() {}

    public ContactRequest(Long id, String name, String phone, String email, String message, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.message = message;
        this.isRead = isRead != null ? isRead : false;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public static ContactRequestBuilder builder() {
        return new ContactRequestBuilder();
    }

    public static class ContactRequestBuilder {
        private Long id;
        private String name;
        private String phone;
        private String email;
        private String message;
        private Boolean isRead = false;
        private LocalDateTime createdAt;

        public ContactRequestBuilder id(Long id) { this.id = id; return this; }
        public ContactRequestBuilder name(String name) { this.name = name; return this; }
        public ContactRequestBuilder phone(String phone) { this.phone = phone; return this; }
        public ContactRequestBuilder email(String email) { this.email = email; return this; }
        public ContactRequestBuilder message(String message) { this.message = message; return this; }
        public ContactRequestBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public ContactRequestBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ContactRequest build() {
            return new ContactRequest(id, name, phone, email, message, isRead, createdAt);
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
