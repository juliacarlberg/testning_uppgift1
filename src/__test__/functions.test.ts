/**
* @jest-environment jsdom
*/

import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

test("should remove all todos", ()=>{
    //arrange
    let theList: Todo[]= [new Todo("Plugga", true), new Todo("Städa", true)];

    //act
    removeAllTodos(theList);

    //assert
    expect(theList.length).toBe(0);
});

test("should change boolean", ()=>{
    //arrange
    let todo: Todo= new Todo("Handla", false);

    //act
    changeTodo(todo);

    //assert
    expect(todo.done).toBe(true);

});

test("should add todo", ()=>{
    //arrange
    let myText: string= "task";
    let todo: Todo[]= [new Todo("Städa", false)];

    //act
    addTodo(myText, todo);

    //assert
    expect(todo.length).toBe(2);
});

test("should not add todo", ()=>{
    //arrange
    let myText: string= "";
    let todo: Todo[]= [];

    //act
    addTodo(myText, todo);

    //assert
    expect(todo.length).toBe(0);
});