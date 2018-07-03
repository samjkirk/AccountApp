package com.qa.project.accountsmanagerqa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path= "/app")
public class DatabaseController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewEmployee (@RequestBody Employee employee) {
        employeeRepository.save(employee);
        return "Added new employee";
    }

    @GetMapping(path = "/findall")
    public @ResponseBody Iterable<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    @DeleteMapping(path = "/delete")
    public @ResponseBody String deleteEmployee (@RequestBody Employee employee) {
        employeeRepository.delete(employee);
        return "Deleted employee";
    }
}
