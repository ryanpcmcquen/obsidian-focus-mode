import { Plugin, Workspace, WorkspaceSidedock } from "obsidian";

export default class FocusMode extends Plugin {
    focusModeActive = false;

    maximisedClass = "maximised";
    focusModeClass = "focus-mode";

    leftSplitCollapsed: boolean;
    rightSplitCollapsed: boolean;

    storeSplitsValues() {
        this.leftSplitCollapsed = Workspace.leftSplit.collapsed;
        this.rightSplitCollapsed = Workspace.rightSplit.collapsed;
    }

    collapseSplits() {
        Workspace.leftSplit.collapse();
        Workspace.rightSplit.collapse();
    }

    restoreSplits() {
        if (!this.leftSplitCollapsed) {
            Workspace.leftSplit.expand();
        }

        if (!this.rightSplitCollapsed) {
            Workspace.rightSplit.expand();
        }
    }

    enableSuperFocusMode() {
        Workspace.rootSplit.containerEl.toggleClass(
            this.maximisedClass,
            !Workspace.rootSplit.containerEl.hasClass(this.maximisedClass)
        );

        Workspace.onLayoutChange();

        if (!document.body.classList.contains(this.focusModeClass)) {
            document.body.classList.add(this.focusModeClass);
        }

        this.collapseSplits();

        this.focusModeActive = true;
    }
    enableFocusMode() {
        if (Workspace.rootSplit.containerEl.hasClass(this.maximisedClass)) {
            Workspace.rootSplit.containerEl.removeClass(this.maximisedClass);
            Workspace.onLayoutChange();
        }

        document.body.classList.toggle(
            this.focusModeClass,
            !document.body.classList.contains(this.focusModeClass)
        );

        this.storeSplitsValues();

        this.collapseSplits();

        this.focusModeActive = true;
    }
    disableFocusMode() {
        if (Workspace.rootSplit.containerEl.hasClass(this.maximisedClass)) {
            Workspace.rootSplit.containerEl.removeClass(this.maximisedClass);
            Workspace.onLayoutChange();
        }

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
