import { Plugin } from "obsidian";

export default class FocusMode extends Plugin {
    async onload() {
        console.log("Loading Focus Mode plugin ...");

        this.addRibbonIcon(
            "enter",
            "Toggle Focus Mode (Shift + Click to show active pane only)",
            (event): void => {
                if (
                    event.shiftKey ||
                    // @ts-ignore
                    this.app.workspace.rootSplit.containerEl.hasClass(
                        "maximised"
                    )
                ) {
                    // @ts-ignore
                    this.app.workspace.rootSplit.containerEl.toggleClass(
                        "maximised",
                        // @ts-ignore
                        !this.app.workspace.rootSplit.containerEl.hasClass(
                            "maximised"
                        )
                    );
                    // @ts-ignore
                    this.app.workspace.onLayoutChange();
                }

                const app_container =
                    // @ts-ignore
                    this.app.dom.appContainerEl ||
                    document.querySelector(".app-container");

                app_container.classList.toggle(
                    "focus-mode",
                    !app_container.classList.contains("focus-mode")
                );

                // @ts-ignore
                this.app.workspace.leftSplit.collapse();
                // @ts-ignore
                this.app.workspace.rightSplit.collapse();
            }
        );
    }

    onunload() {
        console.log("Unloading Focus Mode plugin ...");
    }
}
