package com.carrental.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AgencySettingsDto {

    private Long id;

    @NotBlank(message = "Agency name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "WhatsApp number is required")
    private String whatsapp;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Address is required")
    private String address;

    private String heroTitle;

    private String heroSubtitle;

    public AgencySettingsDto() {}

    public AgencySettingsDto(Long id, String name, String phone, String whatsapp, String email, String address, String heroTitle, String heroSubtitle) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.whatsapp = whatsapp;
        this.email = email;
        this.address = address;
        this.heroTitle = heroTitle;
        this.heroSubtitle = heroSubtitle;
    }

    public static AgencySettingsDtoBuilder builder() {
        return new AgencySettingsDtoBuilder();
    }

    public static class AgencySettingsDtoBuilder {
        private Long id;
        private String name;
        private String phone;
        private String whatsapp;
        private String email;
        private String address;
        private String heroTitle;
        private String heroSubtitle;

        public AgencySettingsDtoBuilder id(Long id) { this.id = id; return this; }
        public AgencySettingsDtoBuilder name(String name) { this.name = name; return this; }
        public AgencySettingsDtoBuilder phone(String phone) { this.phone = phone; return this; }
        public AgencySettingsDtoBuilder whatsapp(String whatsapp) { this.whatsapp = whatsapp; return this; }
        public AgencySettingsDtoBuilder email(String email) { this.email = email; return this; }
        public AgencySettingsDtoBuilder address(String address) { this.address = address; return this; }
        public AgencySettingsDtoBuilder heroTitle(String heroTitle) { this.heroTitle = heroTitle; return this; }
        public AgencySettingsDtoBuilder heroSubtitle(String heroSubtitle) { this.heroSubtitle = heroSubtitle; return this; }

        public AgencySettingsDto build() {
            return new AgencySettingsDto(id, name, phone, whatsapp, email, address, heroTitle, heroSubtitle);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWhatsapp() { return whatsapp; }
    public void setWhatsapp(String whatsapp) { this.whatsapp = whatsapp; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getHeroTitle() { return heroTitle; }
    public void setHeroTitle(String heroTitle) { this.heroTitle = heroTitle; }

    public String getHeroSubtitle() { return heroSubtitle; }
    public void setHeroSubtitle(String heroSubtitle) { this.heroSubtitle = heroSubtitle; }
}
