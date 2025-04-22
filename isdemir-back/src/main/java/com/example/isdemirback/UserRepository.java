package com.example.isdemirback;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int saveUser(User user) {
        String sql = "INSERT INTO users (registerNo, name, surname, management) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, user.getRegisterNo(), user.getName(), user.getSurname(), user.getManagement());
    }

    public void updateUser(User user) {
        String sql = "UPDATE users SET name = ?, surname = ?, management = ? WHERE registerNo = ?";
        jdbcTemplate.update(sql, user.getName(), user.getSurname(), user.getManagement(), user.getRegisterNo());
    }

    public User getUserById(Integer registerNo) {
        String sql = "SELECT * FROM users WHERE registerNo = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{registerNo}, (rs, rowNum) ->
                new User(
                        rs.getInt("registerNo"),
                        rs.getString("name"),
                        rs.getString("surname"),
                        rs.getString("management")
                ));
    }

    public List<User> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, (rs, rownum) ->
            new User(
                    rs.getInt("registerNo"),
                    rs.getString("name"),
                    rs.getString("surname"),
                    rs.getString("management")
            )
        );
    }

    public void deleteUserById(Integer registerNo) {
        String sql = "DELETE FROM users WHERE registerNo = ?";
        jdbcTemplate.update(sql, registerNo);
    }
}
