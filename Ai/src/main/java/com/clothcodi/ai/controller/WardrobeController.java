package com.clothcodi.ai.controller;

import com.clothcodi.ai.dto.ApiResponse;
import com.clothcodi.ai.dto.WardrobeRequest;
import com.clothcodi.ai.model.WardrobeItem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/wardrobe")
public class WardrobeController {

    @GetMapping
    public ResponseEntity<List<WardrobeItem>> list() {
        return ResponseEntity.ok(Collections.emptyList());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> add(@RequestBody WardrobeRequest req) {
        // TODO: save wardrobe item
        return ResponseEntity.ok(new ApiResponse(true, "added (not implemented)"));
    }
}
