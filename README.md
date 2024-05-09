# ProjX

A web application I built using React where you create your own kanban boards. Add containers to your board to keep track of your tasks. Create tasks and drag & drop them anywhere on your board.

## Installation

##### 1. 'npm install' to install the dependencies
##### 2. 'npm run dev' to run local dev server

## What I Learned

#### 1. Redux (for global state management)

Handles:
  - boards data
  - modals
  - sidebar

#### 2. Implemented a 'Drag & Drop' algorithm using the dnd-kit library

#### 3. CRUD operations for:
  - boards
  - columns
  - tasks

#### 4. Utilizing localStorage (for data integrity)

#### 5. Handling modals and user input

## Design

##### Design credit goes to: https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB (used for reference)

## Architecture / high-level design
![ProjX_system-design drawio](https://github.com/MicahD18/ProjX-KanbanBoardApp/assets/70763379/dce303b8-897f-4eeb-a152-656e112b7f49)
### Sidebar
##### The sidebar reducer handles the open/close of the sidebar component.
### Modal
##### The modal reducer sets the 'type' of modal. For example if the current modal is set to "edit", the edit modal will render.
### Board
##### The board reducer is a bit more complex in that it handles fetching the boards data, setting the board that the user selects, as well as handling actions inside the board.

## Drag & Drop Algorithm

##### To handle the drag & drop functionality in the app, I utilized the dnd-kit library. That way I could focus on implementing the logic such as sorting tasks in a container. To break it down, it is a single algorithm that contains multiple functions and involves managing the state of the dragged items, determining their positions and destinations, updating the state accordingly, and persisting those changes.
