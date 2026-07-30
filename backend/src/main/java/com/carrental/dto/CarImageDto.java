package com.carrental.dto;

public class CarImageDto {
    private Long id;
    private String imageUrl;
    private Boolean isPrimary;

    public CarImageDto() {}

    public CarImageDto(Long id, String imageUrl, Boolean isPrimary) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.isPrimary = isPrimary;
    }

    public static CarImageDtoBuilder builder() {
        return new CarImageDtoBuilder();
    }

    public static class CarImageDtoBuilder {
        private Long id;
        private String imageUrl;
        private Boolean isPrimary;

        public CarImageDtoBuilder id(Long id) { this.id = id; return this; }
        public CarImageDtoBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public CarImageDtoBuilder isPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; return this; }

        public CarImageDto build() {
            return new CarImageDto(id, imageUrl, isPrimary);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getIsPrimary() { return isPrimary; }
    public void setIsPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; }
}
