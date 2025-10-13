package com.project.cabconnect.routing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.project.cabconnect.routing.*;

@Service
public class RoutingService {
    @Autowired
    RoutingRepository routingRepository;

    public List<Routing> getRouteById(int bookingId)
    {
        return routingRepository.findAll();
    }
}
