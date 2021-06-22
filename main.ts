import { Plugin } from "obsidian";

export default class FocusMode extends Plugin {
    focusModeActive = false;

    maximisedClass = "maximised";
    focusModeClass = "focus-mode";
    superFocusModeClass = "super-focus-mode";

    leftSplitCollapsed: boolean;
    rightSplitCollapsed: boolean;

    storeSplitsValues() {
        // @ts-ignore
        this.leftSplitCollapsed = this.app.workspace.leftSplit.collapsed;
        // @ts-ignore
        this.rightSplitCollapsed = this.app.workspace.rightSplit.collapsed;
    }

    collapseSplits() {
        // @ts-ignore
        this.app.workspace.leftSplit.collapse();
        // @ts-ignore
        this.app.workspace.rightSplit.collapse();
    }

    restoreSplits() {
        if (!this.leftSplitCollapsed) {
            // @ts-ignore
            this.app.workspace.leftSplit.expand();
        }

        if (!this.rightSplitCollapsed) {
            // @ts-ignore
            this.app.workspace.rightSplit.expand();
        }
    }

    removeExtraneousClasses() {
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

        if (document.body.classList.contains(this.superFocusModeClass)) {
            document.body.classList.remove(this.superFocusModeClass);
        }
    }

    enableSuperFocusMode() {
        // @ts-ignore
        this.app.workspace.rootSplit.containerEl.toggleClass(
            this.maximisedClass,
            // @ts-ignore
            !this.app.workspace.rootSplit.containerEl.hasClass(
                this.maximisedClass
            )
        );

        document.body.classList.toggle(
            this.superFocusModeClass,
            !document.body.classList.contains(this.superFocusModeClass)
        );

        // @ts-ignore
        this.app.workspace.onLayoutChange();

        if (!document.body.classList.contains(this.focusModeClass)) {
            document.body.classList.add(this.focusModeClass);
        }

        this.collapseSplits();

        this.focusModeActive = true;
    }
    enableFocusMode() {
        this.removeExtraneousClasses();

        document.body.classList.toggle(
            this.focusModeClass,
            !document.body.classList.contains(this.focusModeClass)
        );

        this.storeSplitsValues();

        this.collapseSplits();

        this.focusModeActive = true;
    }
    disableFocusMode() {
        this.removeExtraneousClasses();

        if (document.body.classList.contains(this.focusModeClass)) {
            document.body.classList.remove(this.focusModeClass);
        }

        this.restoreSplits();

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
