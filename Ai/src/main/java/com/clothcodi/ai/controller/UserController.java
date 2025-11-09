package com.clothcodi.ai.controller;

import com.clothcodi.ai.dto.ApiResponse;
import com.clothcodi.ai.dto.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody UserRequest req) {
        // TODO: implement signup
        return ResponseEntity.ok(new ApiResponse(true, "signup not implemented"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody UserRequest req) {
        // TODO: implement login
        return ResponseEntity.ok(new ApiResponse(true, "login not implemented"));
    }
}
