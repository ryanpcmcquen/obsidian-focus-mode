## Obsidian Focus Mode

Add Focus Mode to Obsidian.

![Focus Mode Demo](https://raw.githubusercontent.com/ryanpcmcquen/obsidian-focus-mode/master/obsidian-super-focus-mode-demo-v2.gif)

Now with _Super Focus_ mode (<kbd>Shift</kbd> + `Left Click`), which will only focus on the active pane. The original behavior still exists on a normal `Left Click`.

![Super Focus Mode and Command/Hotkey demo](https://raw.githubusercontent.com/ryanpcmcquen/obsidian-focus-mode/master/obsidian-command-focus-mode-demo-v1.gif)

### Hotkeys

| Hotkeys                                                                | Action                                     |
| ---------------------------------------------------------------------- | ------------------------------------------ |
| <kbd>Cmd/Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Z</kbd>                    | Toggle Focus Mode                          |
| <kbd>Cmd/Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Toggle Super Focus Mode (Active pane only) |

---

### Customizing the plugin's appearance:

Classes are added to `document.body` depending on the state. `focus-mode` exists in Normal and Super Focus modes, while `super-focus-mode`, only exists in Super Focus Mode (surprise!).

The following CSS snippet added to a vault will remove the opacity on non-active lines:

```css
.focus-mode .cm-s-obsidian div:not(.CodeMirror-activeline) > .CodeMirror-line {
    opacity: 1 !important;
    filter: saturate(1) !important;
}
```

---

### Manually installing the plugin:

-   Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-focus-mode/`.
