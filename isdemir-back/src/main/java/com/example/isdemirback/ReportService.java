package com.example.isdemirback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public int saveReport(Report report) {
        return reportRepository.saveReport(report);
    }

    public int updateReport(Report report) {
        return reportRepository.updateReport(report);
    }

    public List<Report> getReportsByUser(Integer registerNo, String week) {
        return reportRepository.getReportsByUser(registerNo, week);
    }

    public void deleteReport(Integer reportId) {
        reportRepository.deleteReport(reportId);
    }
}

