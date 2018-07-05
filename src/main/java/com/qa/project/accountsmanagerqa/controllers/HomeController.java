package com.qa.project.accountsmanagerqa.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import static com.qa.project.accountsmanagerqa.Constants.Constants.*;

@Controller
public class HomeController {

    @RequestMapping(value = HOME_PATH)
    public String index() {
        return INDEX_PATH;
    }
}
