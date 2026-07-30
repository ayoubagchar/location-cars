package com.carrental.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "agency_settings")
public class AgencySettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String whatsapp;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String address;

    @Column(columnDefinition = "TEXT")
    private String heroTitle;

    @Column(columnDefinition = "TEXT")
    private String heroSubtitle;

    public AgencySettings() {}

    public AgencySettings(Long id, String name, String phone, String whatsapp, String email, String address, String heroTitle, String heroSubtitle) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.whatsapp = whatsapp;
        this.email = email;
        this.address = address;
        this.heroTitle = heroTitle;
        this.heroSubtitle = heroSubtitle;
    }

    public static AgencySettingsBuilder builder() {
        return new AgencySettingsBuilder();
    }

    public static class AgencySettingsBuilder {
        private Long id;
        private String name;
        private String phone;
        private String whatsapp;
        private String email;
        private String address;
        private String heroTitle;
        private String heroSubtitle;

        public AgencySettingsBuilder id(Long id) { this.id = id; return this; }
        public AgencySettingsBuilder name(String name) { this.name = name; return this; }
        public AgencySettingsBuilder phone(String phone) { this.phone = phone; return this; }
        public AgencySettingsBuilder whatsapp(String whatsapp) { this.whatsapp = whatsapp; return this; }
        public AgencySettingsBuilder email(String email) { this.email = email; return this; }
        public AgencySettingsBuilder address(String address) { this.address = address; return this; }
        public AgencySettingsBuilder heroTitle(String heroTitle) { this.heroTitle = heroTitle; return this; }
        public AgencySettingsBuilder heroSubtitle(String heroSubtitle) { this.heroSubtitle = heroSubtitle; return this; }

        public AgencySettings build() {
            return new AgencySettings(id, name, phone, whatsapp, email, address, heroTitle, heroSubtitle);
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
