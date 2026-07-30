package com.carrental.service;

import com.carrental.dto.AgencySettingsDto;
import com.carrental.entity.AgencySettings;
import com.carrental.repository.AgencySettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgencySettingsService {

    @Autowired
    private AgencySettingsRepository agencySettingsRepository;

    public AgencySettingsDto getSettings() {
        AgencySettings settings = agencySettingsRepository.findFirstByOrderByIdAsc()
                .orElseGet(() -> agencySettingsRepository.save(AgencySettings.builder()
                        .name("Apex Luxury Drive")
                        .phone("+1 (800) 555-9000")
                        .whatsapp("+18005559000")
                        .email("vip@apexluxury.com")
                        .address("777 Grand Boulevard, Beverly Hills, CA 90210")
                        .heroTitle("Experience Pure Luxury On Demand")
                        .heroSubtitle("Drive the world's most prestigious luxury & supercar fleet with bespoke white-glove service.")
                        .build()));

        return convertToDto(settings);
    }

    @Transactional
    public AgencySettingsDto updateSettings(AgencySettingsDto dto) {
        AgencySettings settings = agencySettingsRepository.findFirstByOrderByIdAsc()
                .orElse(AgencySettings.builder().build());

        settings.setName(dto.getName());
        settings.setPhone(dto.getPhone());
        settings.setWhatsapp(dto.getWhatsapp());
        settings.setEmail(dto.getEmail());
        settings.setAddress(dto.getAddress());
        if (dto.getHeroTitle() != null) settings.setHeroTitle(dto.getHeroTitle());
        if (dto.getHeroSubtitle() != null) settings.setHeroSubtitle(dto.getHeroSubtitle());

        AgencySettings saved = agencySettingsRepository.save(settings);
        return convertToDto(saved);
    }

    private AgencySettingsDto convertToDto(AgencySettings settings) {
        return AgencySettingsDto.builder()
                .id(settings.getId())
                .name(settings.getName())
                .phone(settings.getPhone())
                .whatsapp(settings.getWhatsapp())
                .email(settings.getEmail())
                .address(settings.getAddress())
                .heroTitle(settings.getHeroTitle())
                .heroSubtitle(settings.getHeroSubtitle())
                .build();
    }
}
