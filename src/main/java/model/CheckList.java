package model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CheckList {
    private List<Item> items = new ArrayList<>();
}
