import { Plugin } from "obsidian";

export default class FocusMode extends Plugin {
    toggleFocusMode(superFocus?: boolean) {
        if (
            superFocus ||
            // @ts-ignore
            this.app.workspace.rootSplit.containerEl.hasClass("maximised")
        ) {
            // @ts-ignore
            this.app.workspace.rootSplit.containerEl.toggleClass(
                "maximised",
                // @ts-ignore
                !this.app.workspace.rootSplit.containerEl.hasClass("maximised")
            );
            // @ts-ignore
            this.app.workspace.onLayoutChange();
        }

        if (superFocus && !document.body.classList.contains("focus-mode")) {
            document.body.classList.add("focus-mode");
        } else {
            document.body.classList.toggle(
                "focus-mode",
                !document.body.classList.contains("focus-mode")
            );
        }

        // @ts-ignore
        this.app.workspace.leftSplit.collapse();
        // @ts-ignore
        this.app.workspace.rightSplit.collapse();
    }

    async onload() {
        console.log("Loading Focus Mode plugin ...");

        this.addRibbonIcon(
            "enter",
            "Toggle Focus Mode (Shift + Click to show active pane only)",
            (event): void => {
                this.toggleFocusMode(event.shiftKey);
            }
        );

        this.addCommand({
            id: "toggle-focus-mode",
            name: "Toggle Focus Mode",
            callback: () => {
                this.toggleFocusMode();
            },
            hotkeys: [{ modifiers: ["Alt", "Mod"], key: "F" }],
        });

        this.addCommand({
            id: "toggle-super-focus-mode",
            name: "Toggle Super Focus Mode (Active pane only)",
            callback: () => {
                this.toggleFocusMode(true);
            },
            hotkeys: [{ modifiers: ["Alt", "Mod", "Shift"], key: "F" }],
        });
    }

    onunload() {
        console.log("Unloading Focus Mode plugin ...");
    }
}
