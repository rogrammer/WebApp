package com.example.isdemirback;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
public class MainController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @GetMapping("/user/{registerNo}")
    public String getUser(@PathVariable Integer registerNo) {
        return new Gson().toJson(userService.getUserById(registerNo));
    }

    @GetMapping("/user/all")
    public String getAllUsers() {
        return new Gson().toJson(userService.getAllUsers());
    }

    @PostMapping("user/delete/{registerNo}")
    public void deleteUser(@PathVariable Integer registerNo) {
        userService.deleteUser(registerNo);
    }

    @PostMapping("/user/add")
    public String addUser(@RequestBody User user) {
            return new Gson().toJson(userService.saveUser(user));
    }

    @PostMapping("user/update")
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @GetMapping("/{registerNo}/reports")
    public String getUserReports(@PathVariable Integer registerNo) {
        return new Gson().toJson(reportService.getReportsByUser(registerNo, null));
    }

    @GetMapping("/reports/{week}")
    public String getReportsWeek(@PathVariable String week) {
        return new Gson().toJson(reportService.getReportsByUser(null, week));
    }

    @GetMapping("/reports")
    public String getReports() {
        return new Gson().toJson(reportService.getReportsByUser(null, null));
    }

    @PostMapping("/reports/delete/{id}")
    public void deleteReport(@PathVariable Integer id) {
        reportService.deleteReport(id);
    }

    @PostMapping("/{registerNo}/reports")
    public String createReport(@PathVariable Integer registerNo, @RequestBody Report report) {
        report.setUser(userService.getUserById(registerNo));
        if(report.getId() == null) {
            return new Gson().toJson( reportService.saveReport(report) + "");
        }
        return new Gson().toJson(reportService.updateReport(report));

    }
}
