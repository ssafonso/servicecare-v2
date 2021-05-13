package com.servicecare.vwdemo.repository;

import com.servicecare.vwdemo.model.TruckModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Truck repository.
 */
@Repository
public interface TruckRepository extends JpaRepository<TruckModel, Long> {
    /**
     * Find by license order by ts desc list.
     *
     * @param license the license
     * @return the list
     */
    List<TruckModel> findByLicenseOrderByTsDesc(String license);
}
