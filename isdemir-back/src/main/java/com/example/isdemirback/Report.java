package com.example.isdemirback;

public class Report {
    private Integer id;
    private User user;
    private String week;
    private String startDate;
    private String endDate;
    private String thisWeek;
    private String nextWeek;

    public Report(Integer id, User user, String week, String startDate, String endDate, String thisWeek, String nextWeek) {
        this.id = id;
        this.user = user;
        this.week = week;
        this.startDate = startDate;
        this.endDate = endDate;
        this.thisWeek = thisWeek;
        this.nextWeek = nextWeek;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setThisWeek(String thisWeek) {
        this.thisWeek = thisWeek;
    }

    public void setNextWeek(String nextWeek) {
        this.nextWeek = nextWeek;
    }

    public String getWeek() {
        return week;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public String getThisWeek() {
        return thisWeek;
    }

    public String getNextWeek() {
        return nextWeek;
    }

    @Override
    public String toString() {
        return "Reports{" +
                "id=" + id +
                ", user=" + user +
                ", week='" + week + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", thisWeek='" + thisWeek + '\'' +
                ", nextWeek='" + nextWeek + '\'' +
                '}';
    }
}
