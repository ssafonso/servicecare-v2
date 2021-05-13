package com.servicecare.vwdemo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The type Vwdemo application.
 */
@SpringBootApplication
public class VwdemoApplication {

	private static final Logger logger = LoggerFactory.getLogger(VwdemoApplication.class);

	/**
	 * The entry point of application.
	 *
	 * @param args the input arguments
	 */
	public static void main(String[] args) {
		logger.info("Init the application...");
		SpringApplication.run(VwdemoApplication.class, args);
	}

}
