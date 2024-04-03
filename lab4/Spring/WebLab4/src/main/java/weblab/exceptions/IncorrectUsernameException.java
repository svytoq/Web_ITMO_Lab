package com.cemetiere.weblab.exceptions;

public class IncorrectUsernameException extends  RuntimeException{
    public IncorrectUsernameException(String message){
        super(message + " This username is incorrect");
    }
}
