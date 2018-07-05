package com.qa.project.accountsmanagerqa.controllers;

import com.qa.project.accountsmanagerqa.entities.Employee;
import com.qa.project.accountsmanagerqa.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import static com.qa.project.accountsmanagerqa.Constants.Constants.*;

@Controller
@RequestMapping(path= APP_PATH)
public class DatabaseController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping(path = ADD_PATH)
    public @ResponseBody String addNewEmployee (@RequestBody Employee employee) {
        employeeRepository.save(employee);
        return ADD_MESSAGE;
    }

    @GetMapping(path = GET_PATH)
    public @ResponseBody Iterable<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    @DeleteMapping(path = DEL_PATH)
    public @ResponseBody String deleteEmployee (@RequestBody Employee employee) {
        employeeRepository.delete(employee);
        return DEL_MESSAGE;
    }
}
