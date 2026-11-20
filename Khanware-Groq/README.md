# 🌿 Khanware

### The Most Advanced Client-Side Khan Academy Cheat.

> 💠 Doação via pix:
> https://livepix.gg/nixyy

🙂 Stable:
```js
javascript:fetch("https://cdn.jsdelivr.net/gh/niximkk/khanware@master/Khanware.js").then(t=>t.text()).then(eval);
```
🔧 Dev (beta):
```js
javascript:fetch("https://cdn.jsdelivr.net/gh/niximkk/khanware@dev/Khanware.js").then(t=>t.text()).then(eval);
```
🪶 Minimal (beta):
```js
javascript:fetch("https://cdn.jsdelivr.net/gh/niximkk/khanware@master/khanwareMinimal.js").then(t=>t.text()).then(eval);
```

### Groq API setup

Create an API key at https://console.groq.com/keys. Use it in the Groq key field (full version), or the prompt (minimal version). Default model: `llama-3.3-70b-versatile`. The full version still uses the original modular loader, so upload the entire directory to a GitHub repository and update the CDN URLs in `Khanware.js` to point to YOUR repository before using it. The minimal version is a standalone JS file.

For a minimal bookmarklet hosted at your public GitHub repository, replace USER and REPO:

```javascript
javascript:fetch('https://cdn.jsdelivr.net/gh/USER/REPO@main/khanwareMinimal.js').then(r=>r.text()).then(eval)
```

Do not embed an API key in a public GitHub repository. Browser-side API requests expose your key to the local browser environment. Groq API browser CORS and the target site's CSP can also prevent requests. This package has not been end-to-end tested against the live site or Groq with a real API key. It is designed for Khan Academy, not Azota.

---

By creating this repository, I grant permission for everyone to use my code. However, since it is licensed under the GPL, any modifications or distributions must also be open source.

Thank you all for your support over the last few months.

Take a look at other projects like [Khan Destroyer](https://github.com/ilytobias/Khan-Destroyer). Although it's quite broken, my code might help fix it properly!

### As gaben once said:
> _"After 9 years in development hopefully it will be worth the wait, thanks and have fun."_

--- 
Copyright (C) 2024 Nix

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

<p align="center">
  <a href="https://emoji.gg/emoji/5349-hellokittybyebye">
    <img src="https://cdn3.emoji.gg/emojis/5349-hellokittybyebye.png" width="128px" height="128px" alt="HelloKittyByeBye">
  </a>
</p>
