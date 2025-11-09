package com.clothcodi.ai.service;

import com.clothcodi.ai.dto.WardrobeRequest;
import com.clothcodi.ai.dto.ApiResponse;
import com.clothcodi.ai.model.WardrobeItem;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class WardrobeService {

    public List<WardrobeItem> list() {
        return Collections.emptyList();
    }

    public ApiResponse add(WardrobeRequest req) {
        // TODO: save to Firebase
        return new ApiResponse(true, "not implemented");
    }
}
