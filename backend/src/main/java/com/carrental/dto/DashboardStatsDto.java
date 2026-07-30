package com.carrental.dto;

public class DashboardStatsDto {
    private long totalCars;
    private long availableCars;
    private long rentedCars;
    private long unreadContactRequests;
    private long totalContactRequests;

    public DashboardStatsDto() {}

    public DashboardStatsDto(long totalCars, long availableCars, long rentedCars, long unreadContactRequests, long totalContactRequests) {
        this.totalCars = totalCars;
        this.availableCars = availableCars;
        this.rentedCars = rentedCars;
        this.unreadContactRequests = unreadContactRequests;
        this.totalContactRequests = totalContactRequests;
    }

    public static DashboardStatsDtoBuilder builder() {
        return new DashboardStatsDtoBuilder();
    }

    public static class DashboardStatsDtoBuilder {
        private long totalCars;
        private long availableCars;
        private long rentedCars;
        private long unreadContactRequests;
        private long totalContactRequests;

        public DashboardStatsDtoBuilder totalCars(long totalCars) { this.totalCars = totalCars; return this; }
        public DashboardStatsDtoBuilder availableCars(long availableCars) { this.availableCars = availableCars; return this; }
        public DashboardStatsDtoBuilder rentedCars(long rentedCars) { this.rentedCars = rentedCars; return this; }
        public DashboardStatsDtoBuilder unreadContactRequests(long unreadContactRequests) { this.unreadContactRequests = unreadContactRequests; return this; }
        public DashboardStatsDtoBuilder totalContactRequests(long totalContactRequests) { this.totalContactRequests = totalContactRequests; return this; }

        public DashboardStatsDto build() {
            return new DashboardStatsDto(totalCars, availableCars, rentedCars, unreadContactRequests, totalContactRequests);
        }
    }

    public long getTotalCars() { return totalCars; }
    public void setTotalCars(long totalCars) { this.totalCars = totalCars; }

    public long getAvailableCars() { return availableCars; }
    public void setAvailableCars(long availableCars) { this.availableCars = availableCars; }

    public long getRentedCars() { return rentedCars; }
    public void setRentedCars(long rentedCars) { this.rentedCars = rentedCars; }

    public long getUnreadContactRequests() { return unreadContactRequests; }
    public void setUnreadContactRequests(long unreadContactRequests) { this.unreadContactRequests = unreadContactRequests; }

    public long getTotalContactRequests() { return totalContactRequests; }
    public void setTotalContactRequests(long totalContactRequests) { this.totalContactRequests = totalContactRequests; }
}
