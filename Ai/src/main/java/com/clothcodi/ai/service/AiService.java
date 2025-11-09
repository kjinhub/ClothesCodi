package com.clothcodi.ai.service;

import com.clothcodi.ai.dto.AiRequest;
import org.springframework.stereotype.Service;

@Service
public class AiService {
    public String recommend(AiRequest req) {
        // TODO: call OpenAI or other AI backend. Return a simple placeholder for now.
        return "recommendation: (not implemented) for season=" + req.season();
    }
}