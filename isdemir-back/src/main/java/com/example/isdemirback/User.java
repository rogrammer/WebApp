package com.example.isdemirback;

import java.util.List;

public class User {

    private Integer registerNo;
    private String name;
    private String surname;
    private String management;

    public User(Integer registerNo, String name, String surname, String management) {
        this.registerNo = registerNo;
        this.name = name;
        this.surname = surname;
        this.management = management;
    }

    public Integer getRegisterNo() {
        return registerNo;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getManagement() {
        return management;
    }

    public void setRegisterNo(Integer registerNo) {
        this.registerNo = registerNo;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setManagement(String management) {
        this.management = management;
    }

    @Override
    public String toString() {
        return "User{" +
                "registerNo=" + registerNo +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", management='" + management + '\'' +
                '}';
    }
}
