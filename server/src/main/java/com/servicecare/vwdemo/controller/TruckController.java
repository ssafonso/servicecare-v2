package com.servicecare.vwdemo.controller;

import com.servicecare.vwdemo.VwdemoApplication;
import com.servicecare.vwdemo.model.TruckModel;
import com.servicecare.vwdemo.repository.TruckRepository;
import org.hibernate.Criteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * The type Truck controller.
 */
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1")
public class TruckController {

    private static final Logger logger = LoggerFactory.getLogger(VwdemoApplication.class);

    private final TruckRepository truckRepository;

    /**
     * Instantiates a new Truck controller.
     *
     * @param truckRepository the truck repository
     */
    @Autowired
    public TruckController(TruckRepository truckRepository) {
        this.truckRepository = truckRepository;
    }

    /**
     * Gets all trucks.
     *
     * @return the all trucks
     */
    @GetMapping("/all")
    List<TruckModel> getAllTrucks() {
        logger.info("Get all the trucks...");
        return truckRepository.findAll();
    }

    /**
     * Truck by id truck model.
     *
     * @param id the id
     * @return the truck model
     */
    @GetMapping("/truck/{id}")
    TruckModel truckById(@PathVariable long id) {
        return truckRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND));
    }

    /**
     * Truck by license list.
     *
     * @param license the license
     * @return the list
     */
    @GetMapping("/truck/license")
    List<TruckModel> truckByLicense(@RequestParam String license) {
        return truckRepository.findByLicenseOrderByTsDesc(license);
    }

    /**
     * Save truck model.
     *
     * @param truck the truck
     * @return the truck model
     */
    @PostMapping("/truck/save")
    TruckModel save(@RequestBody TruckModel truck) {
        return truckRepository.save(truck);
    }
}
