package com.clothcodi.ai.controller;

import com.clothcodi.ai.dto.ApiResponse;
import com.clothcodi.ai.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse> current(@RequestParam String location) {
        String data = weatherService.getCurrentWeather(location);
        return ResponseEntity.ok(new ApiResponse(true, data));
    }
}
