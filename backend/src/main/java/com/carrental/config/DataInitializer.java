package com.carrental.config;

import com.carrental.entity.*;
import com.carrental.repository.AgencySettingsRepository;
import com.carrental.repository.CarRepository;
import com.carrental.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private AgencySettingsRepository agencySettingsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.admin.default-email:admin@luxurycars.com}")
    private String adminEmail;

    @Value("${app.admin.default-password:admin123}")
    private String adminPassword;

    @Value("${app.admin.default-name:Executive Administrator}")
    private String adminName;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        initAdminUser();
        initAgencySettings();
        initCars();
    }

    private void initAdminUser() {
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = User.builder()
                    .name(adminName)
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
            logger.info("Default Admin account initialized: {}", adminEmail);
        }
    }

    private void initAgencySettings() {
        if (agencySettingsRepository.count() == 0) {
            AgencySettings settings = AgencySettings.builder()
                    .name("Apex Luxury Drive")
                    .phone("+1 (800) 555-9000")
                    .whatsapp("+18005559000")
                    .email("vip@apexluxury.com")
                    .address("777 Grand Boulevard, Beverly Hills, CA 90210")
                    .heroTitle("Experience Pure Luxury & Performance")
                    .heroSubtitle("Drive the world's most prestigious luxury sedans, supercars & SUVs with white-glove delivery.")
                    .build();
            agencySettingsRepository.save(settings);
            logger.info("Default Agency Settings initialized.");
        }
    }

    private void initCars() {
        if (carRepository.count() == 0) {
            List<Car> demoCars = Arrays.asList(
                    Car.builder()
                            .brand("Rolls-Royce")
                            .model("Ghost Extended")
                            .year(2024)
                            .pricePerDay(new BigDecimal("1450.00"))
                            .description("The pinnacle of bespoke automotive luxury. Featuring effortless V12 power, starlight headliner, acoustic glass insulation, and rear executive lounge seating.")
                            .transmission(Transmission.AUTOMATIC)
                            .fuel(FuelType.PETROL)
                            .seats(4)
                            .airConditioning(true)
                            .available(true)
                            .build(),

                    Car.builder()
                            .brand("Lamborghini")
                            .model("Urus Performante")
                            .year(2024)
                            .pricePerDay(new BigDecimal("1250.00"))
                            .description("The world's premier Super Sport Utility Vehicle. Equipped with a 657 HP twin-turbo V8, carbon fiber exterior aerodynamic suite, and ANIMA driving mode selector.")
                            .transmission(Transmission.AUTOMATIC)
                            .fuel(FuelType.PETROL)
                            .seats(5)
                            .airConditioning(true)
                            .available(true)
                            .build(),

                    Car.builder()
                            .brand("Mercedes-AMG")
                            .model("G 63 Grand Edition")
                            .year(2024)
                            .pricePerDay(new BigDecimal("980.00"))
                            .description("An iconic masterpiece of off-road dominance and handcrafted interior elegance. Hand-built AMG 4.0L V8 Biturbo engine with dual side exhaust pipes and Burmester surround sound.")
                            .transmission(Transmission.AUTOMATIC)
                            .fuel(FuelType.PETROL)
                            .seats(5)
                            .airConditioning(true)
                            .available(true)
                            .build(),

                    Car.builder()
                            .brand("Porsche")
                            .model("911 GT3 RS")
                            .year(2023)
                            .pricePerDay(new BigDecimal("1150.00"))
                            .description("Uncompromised track engineering built for the road. High-revving 518 HP naturally aspirated flat-6 engine, active DRS rear wing, and PDK dual-clutch transmission.")
                            .transmission(Transmission.AUTOMATIC)
                            .fuel(FuelType.PETROL)
                            .seats(2)
                            .airConditioning(true)
                            .available(false)
                            .build(),

                    Car.builder()
                            .brand("Ferrari")
                            .model("F8 Spider")
                            .year(2023)
                            .pricePerDay(new BigDecimal("1380.00"))
                            .description("An exhilarating open-top tribute to the multi-award winning V8 engine. Retractable hardtop, Side Slip Control 6.1, and breathtaking acceleration (0-100 km/h in 2.9s).")
                            .transmission(Transmission.AUTOMATIC)
                            .fuel(FuelType.PETROL)
                            .seats(2)
                            .airConditioning(true)
                            .available(true)
                            .build(),

                    Car.builder()
                            .brand("Range Rover")
                            .model("SV Long Wheelbase")
                            .year(2024)
                            .pricePerDay(new BigDecimal("890.00"))
                            .description("Refined sophistication meets unmatched versatility. Four-zone climate, ceramic control dials, rear entertainment screens, and whisper-quiet active noise cancelling cabin.")
                            .transmission(Transmission.AUTOMATIC)
                            .fuel(FuelType.HYBRID)
                            .seats(5)
                            .airConditioning(true)
                            .available(true)
                            .build()
            );

            // Set images for demo cars using high quality Unsplash vehicle images
            String[][] carImages = {
                    {
                            "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=1200&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop"
                    },
                    {
                            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop"
                    },
                    {
                            "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1200&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1609521263047-f8d205293f24?q=80&w=1200&auto=format&fit=crop"
                    },
                    {
                            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                    },
                    {
                            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1617814076668-8dfc6ba12ce3?q=80&w=1200&auto=format&fit=crop"
                    },
                    {
                            "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
                    }
            };

            for (int i = 0; i < demoCars.size(); i++) {
                Car car = demoCars.get(i);
                Car savedCar = carRepository.save(car);
                String[] imgs = carImages[i];
                for (int j = 0; j < imgs.length; j++) {
                    CarImage image = CarImage.builder()
                            .car(savedCar)
                            .imageUrl(imgs[j])
                            .isPrimary(j == 0)
                            .build();
                    savedCar.getImages().add(image);
                }
                carRepository.save(savedCar);
            }

            logger.info("Seeded 6 luxury demonstration cars.");
        }
    }
}
