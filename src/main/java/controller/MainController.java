package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import repository.CheckListItemRepository;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    @Autowired
    CheckListItemRepository checkListItemRepository;

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value ="/getCheckList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getCheckList() {
        List<String> itemNameList = new ArrayList<>();
        checkListItemRepository.findAll().forEach(item -> itemNameList.add(item.getName()));
        return itemNameList;
//        Users user = new Users("jimmy","19 hell st", 80000.00);
//        usersRepository.save(user);
//        List<String> userList = new ArrayList<>();
//        usersRepository.findAll().forEach(u -> userList.add(u.getName()));
//        return userList;
    }
}
