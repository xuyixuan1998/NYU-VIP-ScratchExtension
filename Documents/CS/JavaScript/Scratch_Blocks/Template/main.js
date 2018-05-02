define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        Menus = brackets.getModule("command/Menus");


    // Function to run when the menu item is clicked

    function scratchHandler() {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {

            var _scratch_template =
                "(function(ext) {n// Cleanup function when the extension is unloadednext._shutdown = function() {};nn// Status reporting coden// Use this to report missing hardware, plugin or unsupported browsernext._getStatus = function() {nreturn {status: 2, msg: 'Ready'};n};next.my_first_block = function() {n// Code that gets executed when the block is runn};n// Block and block menu descriptionsnvar descriptor = {nblocks: [n// Block type, block name, function namen[' ', 'my first block', 'my_first_block'],nn]n};nn// Register the extensionnScratchExtensions.register('My first extension', descriptor, ext);n})({});n";

            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange(_scratch_template, insertionPos);
        }
    }


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "scratchtemplates.humblerex"; // package-style naming to avoid collisions
    CommandManager.register("Scratch Templates", MY_COMMAND_ID, scratchHandler);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(MY_COMMAND_ID);
});
