package com.clothcodi.ai.service;

import org.springframework.stereotype.Service;

@Service
public class WeatherService {
    public String getCurrentWeather(String location) {
        // TODO: call external weather API (KMA or other). Return placeholder for now.
        return "{\"location\": \"" + location + "\", \"weather\": \"sunny\"}";
    }
}
