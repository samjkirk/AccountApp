package com.qa.project.accountsmanagerqa.repositories;

import com.qa.project.accountsmanagerqa.entities.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {}
