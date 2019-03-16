package repository;

import model.CheckListItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckListItemRepository extends MongoRepository<CheckListItem, String> {
}
