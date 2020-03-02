package umm3601.todo;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.mongojack.JacksonCodecRegistry;

import com.google.common.collect.ImmutableMap;

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

    if (ctx.queryParamMap().containsKey("status")) {
      filters.add(eq("status", convertStatus(ctx.queryParam("status"))));
    }

    ctx.json(todoCollection.find(filters.isEmpty() ? new Document() : and(filters))
    .into(new ArrayList<>()));

  }

  public void addNewTodo(Context ctx) {
    System.err.println("Got here");
    Todo newTodo = ctx.bodyValidator(Todo.class)
      .check((todo) -> todo.owner != null && todo.owner.length() > 0)
      .check((todo) -> todo.category != null && todo.category.length() > 0)
      .check((todo) -> todo.body != null && todo.body.length() > 0)
      .check((todo) -> todo.statusAsString().matches("^(complete|incomplete)$"))
      .get();

    todoCollection.insertOne(newTodo);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newTodo._id));
  }

  private boolean convertStatus(String todoStatus) {
    if(todoStatus.equals("complete")) {
      return true;
    } else {
      return false;
    }
  }
}
