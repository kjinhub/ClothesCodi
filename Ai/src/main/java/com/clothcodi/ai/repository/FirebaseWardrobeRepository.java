package com.clothcodi.ai.repository;

import com.clothcodi.ai.model.WardrobeItem;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class FirebaseWardrobeRepository {
    public void save(WardrobeItem item) {
        // TODO: implement Firestore save
    }

    public List<WardrobeItem> findAll() {
        // TODO: implement Firestore query
        return Collections.emptyList();
    }
}
