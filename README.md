# Statusbar Dark Mode

The modal in Ionic 6 will by default have a dark background when showing a modal in light mode. This will mean the dark text on the status bar will hide because of the dark background at the top of the screen.

To counteract this we dynamically change the status bar color when:
- Opening a modal
- Closing a modal

When opening a modal we call:
`await StatusBar.setStyle({ style: this.getStyle(true) });`

Where `getStyle` is a fuction:
```typescript
  getStyle(opposite: boolean): Style {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Style.Dark;
    } else {
      return opposite ? Style.Dark : Style.Light;
    }
  }
```


To closing the modal we call:
`await StatusBar.setStyle({ style: this.getStyle(false) });`