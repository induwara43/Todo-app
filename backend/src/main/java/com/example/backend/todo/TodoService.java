package com.example.backend.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
   @Autowired
   private TodoRepository todoRepository;

   public Todo findById(int id) {
       return todoRepository.findById(id).get();
   }

   public Todo save(Todo todo) {
       return todoRepository.save(todo);
   }

   public void deleteById(int id) {
       todoRepository.deleteById(id);
   }

   public List<Todo> findByUsername(String username) {
       return todoRepository.findByUsername(username);
   }

}
