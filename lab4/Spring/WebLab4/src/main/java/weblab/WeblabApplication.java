package com.cemetiere.weblab;


import com.cemetiere.weblab.beans.Checker;
import com.cemetiere.weblab.beans.FigureCollector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

@SpringBootApplication

public class WeblabApplication {
	public static void main(String[] args) {
		// Generate key
		// System.out.println(Encoders.BASE64.encode(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded()));
		SpringApplication.run(WeblabApplication.class, args);
	}

}
