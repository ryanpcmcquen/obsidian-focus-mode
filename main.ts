import { Plugin } from "obsidian";

export default class FocusMode extends Plugin {
	async onload() {
		console.log("Loading Focus Mode plugin ...");

		this.addRibbonIcon("enter", "Toggle Focus Mode", (event): void => {
			const app_container =
				// @ts-ignore
				this.app.dom.appContainerEl ||
				document.querySelector(".app-container");

			app_container.classList.toggle("focus_mode");

			// @ts-ignore
			this.app.workspace.leftSplit.collapse();
			// @ts-ignore
			this.app.workspace.rightSplit.collapse();
		});
	}

	onunload() {
		console.log("Unloading Focus Mode plugin ...");
	}
}
