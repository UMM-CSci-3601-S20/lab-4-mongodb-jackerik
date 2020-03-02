package umm3601.todo;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class Todo {

  @ObjectId @Id
  public String _id;

  public String owner;
  public String body;
  public String category;
  public boolean status;

  public String statusAsString() {
    if(status) {
      return "complete";
    } else {
      return "incomplete";
    }
  }
}
