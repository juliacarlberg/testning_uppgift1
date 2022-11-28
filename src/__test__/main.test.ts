/**
* @jest-environment jsdom
*/

import * as functions from "./../ts/main";
import { Todo } from "../ts/models/Todo";
import { IAddResponse } from "../ts/models/IAddResult";
import { describe, test, expect, jest } from "@jest/globals";
import * as fnsFunctions from "./../ts/functions";

describe("createNewTodo()", ()=>{
    test("if the result success==true", ()=>{
        //arrange
        let todoList: Todo[]= [];
        let myText: string= "hello";
        let spy= jest.spyOn(functions, "createHtml").mockReturnValue();

        //act
        functions.createNewTodo(myText, todoList);
    
        //assert
        expect(spy).toBeCalledTimes(1);
    
    });
    test("if the result success==false", ()=>{
        //arrange
        let anotherText: string= "world";
        let todoList: Todo[]= [];
        let spy= jest.spyOn(functions, "displayError").mockReturnValue();
    
        //act
        functions.createNewTodo(anotherText, todoList);
    
        //assert
        expect(spy).toBeCalledTimes(1);
    
    });
});

describe("createHtml", ()=>{
    beforeEach(()=>{
        jest.resetModules();
        jest.resetAllMocks();
    });
    test("should create html for li-element and add to ul", ()=>{
        //arrange
        let newTodo: Todo[]= [new Todo("text", false)];
        document.body.innerHTML= `<ul id="todos" class="todo"></ul>`;
        let ul= document.getElementById("todos") as HTMLUListElement;

        //act
        functions.createHtml(newTodo);

        //assert
        expect(ul.innerHTML).toBe(`<li class=\"todo_text"\>get a grip</li>`)
    });
});

describe("toggleTodo", ()=>{
    test("should call changeTodo", ()=>{
        //arrange
        let newTodo: Todo= new Todo("Handla", false);
        let spy= jest.spyOn(fnsFunctions, "changeTodo").mockReturnValue;

        functions.toggleTodo(newTodo);

        //assert
        expect(spy).toHaveBeenCalled();
    });

    /*test("should call createHtml", ()=>{
        //arrange
        let newTodo: Todo= new Todo("Handla", false);
        let spy= jest.spyOn(functions, "createHtml").mockReturnValue;
        //act
        functions.toggleTodo(newTodo);
        //assert
        expect(spy).toHaveBeenCalled();
    }); */

});

describe("clearTodo", ()=>{
    test("should call createHtml", ()=>{
        //arrange
        let newTodo: Todo[]= [new Todo("Städa", false)];
        let spy= jest.spyOn(functions, "createHtml").mockReturnValue;

        //act
        functions.clearTodos(newTodo);

        //assert
        expect(spy).toHaveBeenCalled();
    });

    test("should call removeAllTodos", ()=>{
        //arrange
        let newTodo: Todo[]= [new Todo("Städa", false)];
        let spy= jest.spyOn(fnsFunctions, "removeAllTodos").mockReturnValue;
        //act
        functions.clearTodos(newTodo);
        //assert
        expect(spy).toHaveBeenCalled();
    });

    /*test("should be able to click", ()=>{
        //arrange
        let spy= jest.spyOn(functions, "clearTodos").mockReturnValue;
        document.body.innerHTML=`<button type="button" id="clearTodos">Rensa lista</button>`;
        functions.clearClick();
        //act
        document.getElementById("clearTodos")?.click();

        //assert
        expect(spy).toHaveBeenCalled();

    }); */
});

describe("displayError", () => {
    test("add to localStorage", () => {
      let show: boolean = true;
      let error: string = "Du måste ange minst två bokstäver";
      document.body.innerHTML = `<div id="error" class="error"></div> `;
  
      functions.displayError(error, show);
  
      expect(document.getElementById("error")?.classList).toBe("show");
    });
});