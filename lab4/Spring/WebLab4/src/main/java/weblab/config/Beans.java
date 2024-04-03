package com.cemetiere.weblab.config;

import com.cemetiere.weblab.auth.AuthController;
import com.cemetiere.weblab.beans.Checker;
import com.cemetiere.weblab.beans.FigureCollector;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class Beans {
    @Bean
    public Checker globalChecker(){
        return new Checker();
    }

    @Bean
    public FigureCollector globalFigureCollector(){
        return new FigureCollector();
    }


}
