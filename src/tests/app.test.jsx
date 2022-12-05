import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";


describe("TodoApp", () => {

  function reverseString(str) {
    return str.split("").reverse().join("");
    }


  it("renders app", () => {
    const app = render(<BrowserRouter>
                        <App />
                      </BrowserRouter>);
    expect(app).not.toBeUndefined();
  });

  it("renders initial items", () => {
    render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
    );

    expect(screen.getByText("Buy potato")).toBeDefined();
    expect(screen.getByTestId("todo9")).toBeDefined();

  });

  it("Testing adding a task module functionalities.",()=>{
    render(
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    );
    //Upon initial rendering the add button should be disabled.
    expect(screen.getByTestId("btn-newTask")).toBeDisabled();

    // By passing a valid task the add button should be enabled.
    userEvent.type(screen.getByTestId("newTask"),'Buy chips')
      expect(screen.getByRole('button',{name: /add task/i})).toBeEnabled();

    // If a task is not valid. For example less than 3 character, an alert box should appear.
    userEvent.clear(screen.getByTestId("newTask"));
    userEvent.type(screen.getByTestId("newTask"),'ta');
      expect(screen
        .getByText(/"Task" length must be at least 3 characters long/i))
      .toBeDefined();

    // If a valid task is added, it should apear on the screen
    userEvent.clear(screen.getByTestId("newTask"));
    userEvent.type(screen.getByTestId("newTask"),reverseString('New added task'));
    userEvent.click(screen.getByTestId("btn-newTask"))
      expect(screen
        .queryByText(/new added task/i))
      .toBeInTheDocument();

  });

  it("Testing delete module functionality.",()=>{
    render(
      <BrowserRouter>
          <App/>
      </BrowserRouter>);

      userEvent.click(screen.getByTestId("delete9"));
      expect(screen.queryByText(/Buy apple juice/i))
        .not.toBeInTheDocument();
  })

  it("Testing edit task functionalities",()=>{

    render(
      <BrowserRouter>
          <App/>
      </BrowserRouter>);

    // By click the edit button, the edit window 
    //should appear with the corresponding task
    userEvent.click(screen.getByTestId("edit9"));
    expect(screen.getByTestId('taskValue').value).toMatch(/buy apple juice/i);

    

    // If an unvalid task(like empty string) is passed the save button should be disable.
    userEvent.clear(screen.getByTestId('taskValue'));
    expect(screen.getByTestId('btn-taskValue')).toBeDisabled();

    //If a task is modified, the edited version should appear on the todo list.
    userEvent.type(screen.getByTestId('taskValue'),
                   reverseString('modified apple juice'));

    userEvent.click(screen.getByTestId('btn-taskValue'));

    //The previous version shouldn't exist.
    expect(screen.queryByText(/Buy apple juice/i))
        .not.toBeInTheDocument();

    expect(screen.getByText(/modified apple juice/i)).toBeDefined();
  });

  it('Testing done module functionalities',()=>{

    render(
      <BrowserRouter>
          <App/>
      </BrowserRouter>);

    // when a task is clicked done the proper icon should appear.
    userEvent.click(screen.getByTestId('doneBtn9'));
    expect(screen.queryByTestId('done9')).toBeInTheDocument();

    // when a task is clicked un-done the proper icon should appear.
    userEvent.click(screen.getByTestId('doneBtn9'));
    expect(screen.queryByTestId('undone9')).toBeInTheDocument();
  });

  it('Testing pagination',()=>{

    render(
      <BrowserRouter>
          <App/>
      </BrowserRouter>);

    // By clicking the second page , corresponding tasks should apeear.
    userEvent.click(screen.getByTestId('pagi2'));
    expect(screen.getByText(/buy banana/i)).toBeDefined();

    // By clicking the second page, the page 1 items should disapear.
    expect(screen.queryByText(/buy potato/i)).not.toBeInTheDocument();
  })
  
});
