package com.servicecare.vwdemo.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Assertions;

class TruckModelTest {

    public static final long EXPECTED_ID = 13123123;
    public static final String EXPECTED_LICENSE = "88CA88";
    public static final String EXPECTED_LONGITUDE = "38.398222";
    public static final String EXPECTED_LATITUDE = "-9.8798798";
    public static final String EXPECTED_TS = "2021-05-22";
    public static final int EXPECTED_AGE = 33;
    private static TruckModel truckModel;

    @BeforeAll
    static void setUp(){
        truckModel = new TruckModel(13123123, "88CA88", "38.398222", "-9.8798798", "2021-05-22");
    }

    @AfterAll
    static void tearDown() {
        System.out.println("Test Completed");
    }

    @Test
    public void testTruckModel() {
        Assertions.assertEquals(EXPECTED_ID, truckModel.getId());
        Assertions.assertEquals(EXPECTED_LATITUDE, truckModel.getLat());
        Assertions.assertEquals(EXPECTED_LICENSE, truckModel.getLicense());
        Assertions.assertEquals(EXPECTED_LONGITUDE, truckModel.getLng());
        Assertions.assertEquals(EXPECTED_TS, truckModel.getTs());

    }

}