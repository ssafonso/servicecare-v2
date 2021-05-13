package com.servicecare.vwdemo.model;

import javax.persistence.*;

/**
 * The type Truck model.
 */
@Entity
@Table(name = "TRUCK_LOCATION")
public class TruckModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private long id;

    @Column(name = "LICENSE")
    private String license;

    @Column(name = "LONGITUDE")
    private String lng;

    @Column(name = "LATITUDE")
    private String lat;

    @Column(name = "ts")
    private String ts;

    /**
     * Instantiates a new Truck model.
     */
    public TruckModel() {
        super();
    }

    /**
     * Instantiates a new Truck model.
     *
     * @param id      the id
     * @param license the license
     * @param lng     the lng
     * @param lat     the lat
     * @param ts      the ts
     */
    public TruckModel(long id, String license, String lng, String lat, String ts) {
        super();
        this.id = id;
        this.license = license;
        this.lng = lng;
        this.lat = lat;
        this.ts = ts;
    }

    /**
     * Gets id.
     *
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Gets license.
     *
     * @return the license
     */
    public String getLicense() {
        return license;
    }

    /**
     * Sets license.
     *
     * @param license the license
     */
    public void setLicense(String license) {
        this.license = license;
    }

    /**
     * Gets lng.
     *
     * @return the lng
     */
    public String getLng() {
        return lng;
    }

    /**
     * Sets lng.
     *
     * @param lng the lng
     */
    public void setLng(String lng) {
        this.lng = lng;
    }

    /**
     * Gets lat.
     *
     * @return the lat
     */
    public String getLat() {
        return lat;
    }

    /**
     * Sets lat.
     *
     * @param lat the lat
     */
    public void setLat(String lat) {
        this.lat = lat;
    }

    /**
     * Gets ts.
     *
     * @return the ts
     */
    public String getTs() {
        return ts;
    }

    /**
     * Sets ts.
     *
     * @param ts the ts
     */
    public void setTs(String ts) {
        this.ts = ts;
    }
}