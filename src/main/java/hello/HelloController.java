package hello;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value ="/hello", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String retrieveText() {
//        MongoClient mongoClient = MongoClients.create("mongodb+srv://admin:Spock33GG@tododb-9k2p3.mongodb.net/test?retryWrites=true");
//        MongoDatabase database = mongoClient.getDatabase("ToDoDB");
//        return database.getName();
        return "Hi Christie Boo Bear!";
    }

}