package umm3601.todo;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

import org.mongojack.JacksonCodecRegistry;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.conversions.Bson;

import io.javalin.http.Context;

/**
 * Controller that manages requests for info about users.
 */
public class TodoController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<Todo> todoCollection;

  public TodoController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Todo.class);
    todoCollection = database.getCollection("todos").withDocumentClass(Todo.class)
        .withCodecRegistry(jacksonCodecRegistry);
  }

  /**
   * Get a JSON response with a list of all the todos.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getTodos(Context ctx) {

    List<Bson> filters = new ArrayList<Bson>();

    if (ctx.queryParamMap().containsKey("owner")) {
      filters.add(eq("owner", ctx.queryParam("owner")));
    }

    if (ctx.queryParamMap().containsKey("category")) {
      filters.add(eq("category", ctx.queryParam("category")));
    }

    if (ctx.queryParamMap().containsKey("body")) {
      filters.add(eq("body", ctx.queryParam("body")));
    }

    ctx.json(todoCollection.find(filters.isEmpty() ? new Document() : and(filters))
    .into(new ArrayList<>()));

  }
}
