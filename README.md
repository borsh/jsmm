# jsmm README

jsmm is a proof of concept vscode extension for creating and editing mind maps. For now, it supports simple interactive editing. 
![jsmm edit demo](./demos/DemoMM.gif)
## Features

Create json documents with custom schema (.jsmm) and edit it interactively.  
Mind map elements
- Add 
- Update 
- Delete 

# Usage

Create file with .jsmm extension, json schema will be used and prompted. User button in the toolbar or command "Open jsmm view" to toggle interactive editing. 

## Release Notes

### 0.2.1

Small usability improvements : arrow key navigation (default keybindings: left, right, top, bottom), cancel editing command (default keybinding : escape), edit current node command (default keybinding: f2)

### 0.2.0

Added vscode commands: js mind map: add child (default keybinding ctrl+enter),js mind map: add sibiling (default keybinding shift+enter), js mind map:remove (default keybinding delete)

### 0.1.0

Initial release of jsmm
