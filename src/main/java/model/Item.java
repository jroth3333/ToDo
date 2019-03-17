package model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "item")
public class Item {
    @Id
    private String id;
    private String name;
    private String description;
    private Date createdDate;
    private Boolean completed;

    public Item(String id, String name, String description, Date createdDate, Boolean completed) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdDate = createdDate;
        this.completed = completed;
    }
}
