package com.clothcodi.ai.service;

import com.clothcodi.ai.dto.UserRequest;
import com.clothcodi.ai.dto.ApiResponse;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public ApiResponse signup(UserRequest req) {
        // TODO: implement real signup (store to Firebase)
        return new ApiResponse(true, "signup not implemented");
    }

    public ApiResponse login(UserRequest req) {
        // TODO: implement real login
        return new ApiResponse(true, "login not implemented");
    }
}
