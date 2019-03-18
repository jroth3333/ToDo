package checklist;

import model.CheckList;
import model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.Optional;

@Controller
public class MainController {

    @Autowired
    ItemRepository itemRepository;

    @CrossOrigin
    @RequestMapping(value = "/addItem", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public void addListItem(@RequestParam String name, @RequestParam String description) {
        Item item = new Item(name + "-" + name.hashCode(), name, description, new Date(), false);
        itemRepository.save(item);
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/getCheckList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public CheckList getCheckList() {
        CheckList checkList = new CheckList();
        checkList.setItems(itemRepository.findAll());
        return checkList;
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/updateStatus", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public CheckList updateStatus(@RequestParam String id) {
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            item.get().setCompleted(!item.get().getCompleted());
            itemRepository.save(item.get());
        }
        return getCheckList();
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/deleteItem", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public CheckList deleteItem(@RequestParam String id) {
        itemRepository.deleteById(id);
        return getCheckList();
    }
}
