package com.clothcodi.ai.controller;

import com.clothcodi.ai.dto.ApiResponse;
import com.clothcodi.ai.dto.AiRequest;
import com.clothcodi.ai.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/recommend")
    public ResponseEntity<ApiResponse> recommend(@RequestBody AiRequest req) {
        // proxy to AiService
        String result = aiService.recommend(req);
        return ResponseEntity.ok(new ApiResponse(true, result));
    }
}
