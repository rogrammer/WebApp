package com.example.isdemirback;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ReportRepository {

    private final JdbcTemplate jdbcTemplate;

    public ReportRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int saveReport(Report report) {
        String sql = "INSERT INTO reports (registerNo, week, startDate, endDate, thisWeek, nextWeek) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, report.getUser().getRegisterNo(), report.getWeek(), report.getStartDate(), report.getEndDate(), report.getThisWeek(), report.getNextWeek());
    }

    public int updateReport(Report report) {
        String sql = "UPDATE reports SET registerNo = ?, week = ?, startDate = ?, endDate = ?, thisWeek = ?, nextWeek = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                report.getUser().getRegisterNo(),
                report.getWeek(),
                report.getStartDate(),
                report.getEndDate(),
                report.getThisWeek(),
                report.getNextWeek(),
                report.getId());  // Assuming `id` is a field in the `Report` class
    }

    public List<Report> getReportsByUser(Integer registerNo, String week) {
        StringBuilder sql = new StringBuilder("SELECT r.id, r.week, r.startDate, r.endDate, r.thisWeek, r.nextWeek, u.registerNo, u.name, u.surname, u.management " +
                "FROM reports r JOIN users u ON r.registerNo = u.registerNo " +
                "WHERE 1=1");
        // List to hold the parameters for the query
        List<Object> params = new ArrayList<>();

        // Append conditions based on non-null values
        if (registerNo != null) {
            sql.append(" AND r.registerNo = ?");
            params.add(registerNo);
        }

        if (week != null) {
            sql.append(" AND r.week = ?");
            params.add(week);
        }


        return jdbcTemplate.query(sql.toString(), params.toArray(), (rs, rowNum) -> {
            User user = new User(
                    rs.getInt("registerNo"),
                    rs.getString("name"),
                    rs.getString("surname"),
                    rs.getString("management")
            );

            Report report = new Report(
                    rs.getInt("id"),
                    user,
                    rs.getString("week"),
                    rs.getString("startDate"),
                    rs.getString("endDate"),
                    rs.getString("thisWeek"),
                    rs.getString("nextWeek")
            );

            return report;
        });
    }

    public void deleteReport(Integer id) {
        String sql = "DELETE FROM reports WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}


