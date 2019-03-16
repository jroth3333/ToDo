package model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "checkListItem")
public class CheckListItem {
    @Id
    private String id;
    private String name;
    private String desription;
    private Date createdDate;
    private Boolean completed;

    public CheckListItem(String id, String name, String desription, Date createdDate, Boolean completed) {
        this.id = id;
        this.name = name;
        this.desription = desription;
        this.createdDate = createdDate;
        this.completed = completed;
    }
}
