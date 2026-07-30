package com.carrental.repository;

import com.carrental.entity.AgencySettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgencySettingsRepository extends JpaRepository<AgencySettings, Long> {
    Optional<AgencySettings> findFirstByOrderByIdAsc();
}
