import { Plugin } from "obsidian";

export default class FocusMode extends Plugin {
    focusModeActive = false;

    maximisedClass = "maximised";
    focusModeClass = "focus-mode";

    enableSuperFocusMode() {
        // @ts-ignore
        this.app.workspace.rootSplit.containerEl.toggleClass(
            this.maximisedClass,
            // @ts-ignore
            !this.app.workspace.rootSplit.containerEl.hasClass(
                this.maximisedClass
            )
        );

        // @ts-ignore
        this.app.workspace.onLayoutChange();

        if (!document.body.classList.contains(this.focusModeClass)) {
            document.body.classList.add(this.focusModeClass);
        }

        // @ts-ignore
        this.app.workspace.leftSplit.collapse();
        // @ts-ignore
        this.app.workspace.rightSplit.collapse();

        this.focusModeActive = true;
    }
    enableFocusMode() {
        if (
            // @ts-ignore
            this.app.workspace.rootSplit.containerEl.hasClass(
                this.maximisedClass
            )
        ) {
            // @ts-ignore
            this.app.workspace.rootSplit.containerEl.removeClass(
                this.maximisedClass
            );
            // @ts-ignore
            this.app.workspace.onLayoutChange();
        }

        document.body.classList.toggle(
            this.focusModeClass,
            !document.body.classList.contains(this.focusModeClass)
        );

        // @ts-ignore
        this.app.workspace.leftSplit.collapse();
        // @ts-ignore
        this.app.workspace.rightSplit.collapse();

        this.focusModeActive = true;
    }
    disableFocusMode() {
        if (
            // @ts-ignore
            this.app.workspace.rootSplit.containerEl.hasClass(
                this.maximisedClass
            )
        ) {
            // @ts-ignore
            this.app.workspace.rootSplit.containerEl.removeClass(
                this.maximisedClass
            );
            // @ts-ignore
            this.app.workspace.onLayoutChange();
        }

        if (document.body.classList.contains(this.focusModeClass)) {
            document.body.classList.remove(this.focusModeClass);
        }

        this.focusModeActive = false;
    }

    toggleFocusMode(superFocus: boolean = false) {
        if (superFocus) {
            this.enableSuperFocusMode();
        } else if (this.focusModeActive) {
            this.disableFocusMode();
        } else {
            this.enableFocusMode();
        }
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
            hotkeys: [{ modifiers: ["Alt", "Mod"], key: "Z" }],
        });

        this.addCommand({
            id: "toggle-super-focus-mode",
            name: "Toggle Super Focus Mode (Active pane only)",
            callback: () => {
                this.toggleFocusMode(true);
            },
            hotkeys: [{ modifiers: ["Alt", "Mod", "Shift"], key: "Z" }],
        });
    }

    onunload() {
        console.log("Unloading Focus Mode plugin ...");
    }
}
