/*! For license information please see 4af26d8c.62b602b5.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{179:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return b}));var a=n(1),r=n(9),o=(n(0),n(218)),i=n(223),s=n(222),l={id:"test",title:"Replay Test"},c={id:"test",title:"Replay Test",description:"Once you've worked on your game for a while, it's a good idea to add some tests to avoid things breaking in the future. It gives you the confidence to keep publishing new updates!",source:"@site/docs/test.md",permalink:"/docs/test",editUrl:"https://github.com/edbentley/replay/edit/master/website/docs/test.md",sidebar:"someSidebar",previous:{title:"Thinking in Replay",permalink:"/docs/thinking-in-replay"},next:{title:"Web",permalink:"/docs/web"}},u=[{value:"<code>testGame(game, options)</code>",id:"testgamegame-options",children:[{value:"<code>nextFrame()</code>",id:"nextframe",children:[]},{value:"<code>jumpToFrame(() =&gt; condition)</code>",id:"jumptoframe--condition",children:[]},{value:"<code>setRandomNumbers(array)</code>",id:"setrandomnumbersarray",children:[]},{value:"<code>updateInputs(inputs)</code>",id:"updateinputsinputs",children:[]},{value:"<code>getTextures()</code>",id:"gettextures",children:[]},{value:"<code>getTexture(testId)</code>",id:"gettexturetestid",children:[]},{value:"<code>textureExists(testId)</code>",id:"textureexiststestid",children:[]},{value:"<code>getByText(text)</code>",id:"getbytexttext",children:[]},{value:"<code>log</code>",id:"log",children:[]},{value:"<code>audio</code>",id:"audio",children:[]},{value:"<code>network</code>",id:"network",children:[]},{value:"<code>store</code>",id:"store",children:[]}]},{value:"Example",id:"example",children:[]}],p={rightToc:u};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Once you've worked on your game for a while, it's a good idea to add some tests to avoid things breaking in the future. It gives you the confidence to keep publishing new updates!"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"@replay/test")," package is useful for writing tests in Jest for your Replay game. It provides a test platform, which works the same as any other like web and iOS, but returns helpful utility functions for testing."),Object(o.b)("h2",{id:"testgamegame-options"},Object(o.b)("inlineCode",{parentName:"h2"},"testGame(game, options)")),Object(o.b)("h4",{id:"parameters"},"Parameters"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"game"),": Your top-level ",Object(o.b)("inlineCode",{parentName:"li"},"Game")," Sprite called with its props, e.g. ",Object(o.b)("inlineCode",{parentName:"li"},"Game(gameProps)"),"."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"options"),": (Optional) An object with the following properties:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"initInputs"),": (Optional) The inputs your ",Object(o.b)("inlineCode",{parentName:"li"},"device")," returns. Match with the platforms you're targeting."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"initRandom"),": (Optional) An array of numbers that ",Object(o.b)("inlineCode",{parentName:"li"},"random()")," will call, starting from index 0 and looping if it reaches the end. Allows for predictable randomness."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"size"),": (Optional) Set the size parameter passed into Sprites."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"initStore"),": (Optional) Set the init store for local storage."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"networkResponses"),": (Optional) Mock network responses by URL, e.g:")),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n  get: {\n    "/api/score": {\n      success: true,\n    },\n  },\n},\n')))),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"testGame")," returns an object with the following fields:"),Object(o.b)("h3",{id:"nextframe"},Object(o.b)("inlineCode",{parentName:"h3"},"nextFrame()")),Object(o.b)("p",null,"Increment game by one frame."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"nextFrame();\n")),Object(o.b)("h3",{id:"jumptoframe--condition"},Object(o.b)("inlineCode",{parentName:"h3"},"jumpToFrame(() => condition)")),Object(o.b)("p",null,"Synchronously progress frames of the game until condition is met and no errors are thrown. Condition can also return a Texture (useful for throwing methods like ",Object(o.b)("inlineCode",{parentName:"p"},"getByText"),"). Throws if 1000 gameplay seconds (60,000 loops) pass and condition not met / still errors."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"jumpToFrame(() => position.x > 10);\n")),Object(o.b)("h3",{id:"setrandomnumbersarray"},Object(o.b)("inlineCode",{parentName:"h3"},"setRandomNumbers(array)")),Object(o.b)("p",null,"Reset the array of random numbers."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"setRandomNumbers([0.2, 0.3, 0.4]);\n")),Object(o.b)("h3",{id:"updateinputsinputs"},Object(o.b)("inlineCode",{parentName:"h3"},"updateInputs(inputs)")),Object(o.b)("p",null,"Update the input state for the next frame, such as to indicate the pointer is pressed."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"updateInputs({\n  pointer: {\n    pressed: true,\n    justPressed: true,\n    justReleased: false,\n    // Here the pointer position will have the\n    // same coordinates in all sprites\n    x: 0,\n    y: 0,\n  },\n});\n")),Object(o.b)("h3",{id:"gettextures"},Object(o.b)("inlineCode",{parentName:"h3"},"getTextures()")),Object(o.b)("p",null,"Returns an array of textures that were just rendered to the screen."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const textures = getTextures();\n")),Object(o.b)("h3",{id:"gettexturetestid"},Object(o.b)("inlineCode",{parentName:"h3"},"getTexture(testId)")),Object(o.b)("p",null,"Get a Texture with a matching prop ",Object(o.b)("inlineCode",{parentName:"p"},"testId"),". Throws if there are no matches."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'const player = getTexture("player");\n')),Object(o.b)("h3",{id:"textureexiststestid"},Object(o.b)("inlineCode",{parentName:"h3"},"textureExists(testId)")),Object(o.b)("p",null,"Boolean of whether a Texture with a ",Object(o.b)("inlineCode",{parentName:"p"},"testId")," prop exists."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'expect(textureExists("player")).toBe(true);\n')),Object(o.b)("h3",{id:"getbytexttext"},Object(o.b)("inlineCode",{parentName:"h3"},"getByText(text)")),Object(o.b)("p",null,"Get a text Texture based on its text content. Returns an array of all matches, throws if there are no matches."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'const scoreLabel = getByText("Score: 10")[0];\n')),Object(o.b)("h3",{id:"log"},Object(o.b)("inlineCode",{parentName:"h3"},"log")),Object(o.b)("p",null,"A Jest mock function to detect if ",Object(o.b)("inlineCode",{parentName:"p"},"log")," was called by a Sprite."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'expect(log).toBeCalledWith("Hello Replay");\n')),Object(o.b)("h3",{id:"audio"},Object(o.b)("inlineCode",{parentName:"h3"},"audio")),Object(o.b)("p",null,"An object of Jest mock functions for testing audio calls."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'expect(audio.play).toBeCalledWith("boop.wav");\n')),Object(o.b)("h3",{id:"network"},Object(o.b)("inlineCode",{parentName:"h3"},"network")),Object(o.b)("p",null,"An object of network mock functions for testing network responses."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"expect(network.get).toBeCalled();\n")),Object(o.b)("h3",{id:"store"},Object(o.b)("inlineCode",{parentName:"h3"},"store")),Object(o.b)("p",null,"A mock local storage store."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"expect(store).toEqual({ highScore: 5 });\n")),Object(o.b)("h2",{id:"example"},"Example"),Object(o.b)(i.a,{defaultValue:"js",groupId:"code",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"Tabs"},Object(o.b)(s.a,{value:"js",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'import { testGame } from "@replay/test";\nimport { Game, gameProps } from "..";\n\ntest("Can shoot bullet", () => {\n  const initInputs = {\n    pointer: {\n      pressed: false,\n      justPressed: false,\n      justReleased: false,\n      x: 0,\n      y: 0,\n    },\n  };\n\n  const { nextFrame, updateInputs, getTexture, textureExists } = testGame(\n    Game(gameProps),\n    {\n      initInputs,\n    }\n  );\n\n  expect(textureExists("bullet")).toBe(false);\n\n  updateInputs({\n    pointer: {\n      pressed: true,\n      justPressed: true,\n      justReleased: false,\n      x: 0,\n      y: 0,\n    },\n  });\n  nextFrame();\n\n  updateInputs(initInputs);\n  nextFrame();\n\n  expect(textureExists("bullet")).toBe(true);\n  expect(getTexture("bullet").props.position.y).toBe(100);\n});\n'))),Object(o.b)(s.a,{value:"ts",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { testGame } from "@replay/test";\nimport { WebInputs } from "@replay/web";\nimport { iOSInputs } from "@replay/swift";\nimport { Game, gameProps } from "..";\n\ntest("Can shoot bullet", () => {\n  const initInputs: WebInputs | iOSInputs = {\n    pointer: {\n      pressed: false,\n      justPressed: false,\n      justReleased: false,\n      x: 0,\n      y: 0,\n    },\n  };\n\n  const { nextFrame, updateInputs, getTexture, textureExists } = testGame(\n    Game(gameProps),\n    {\n      initInputs,\n    }\n  );\n\n  expect(textureExists("bullet")).toBe(false);\n\n  updateInputs({\n    pointer: {\n      pressed: true,\n      justPressed: true,\n      justReleased: false,\n      x: 0,\n      y: 0,\n    },\n  });\n  nextFrame();\n\n  updateInputs(initInputs);\n  nextFrame();\n\n  expect(textureExists("bullet")).toBe(true);\n  expect(getTexture("bullet").props.position.y).toBe(100);\n});\n')))))}b.isMDXComponent=!0},218:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),u=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},p=function(e){var t=u(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),d=a,m=p["".concat(i,".").concat(d)]||p[d]||b[d]||o;return n?r.a.createElement(m,s({ref:t},c,{components:n})):r.a.createElement(m,s({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},220:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var i=r.apply(null,a);i&&e.push(i)}else if("object"===o)for(var s in a)n.call(a,s)&&a[s]&&e.push(s)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},222:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){return r.a.createElement("div",null,e.children)}},223:function(e,t,n){"use strict";n(25),n(20),n(21);var a=n(0),r=n.n(a),o=n(236);var i=function(){return Object(a.useContext)(o.a)},s=n(220),l=n.n(s),c=n(133),u=n.n(c),p=37,b=39;t.a=function(e){var t=e.block,n=e.children,o=e.defaultValue,s=e.values,c=e.groupId,d=i(),m=d.tabGroupChoices,j=d.setTabGroupChoices,O=Object(a.useState)(o),f=O[0],h=O[1];if(null!=c){var g=m[c];null!=g&&g!==f&&h(g)}var x=function(e){h(e),null!=c&&j(c,e)},y=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:l()("tabs",{"tabs--block":t})},s.map((function(e){var t=e.value,n=e.label;return r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":f===t,className:l()("tab-item",u.a.tabItem,{"tab-item--active":f===t}),key:t,ref:function(e){return y.push(e)},onKeyDown:function(e){return function(e,t,n){switch(n.keyCode){case b:!function(e,t){var n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()}(e,t);break;case p:!function(e,t){var n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,t)}}(y,e.target,e)},onFocus:function(){return x(t)},onClick:function(){return x(t)}},n)}))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},a.Children.toArray(n).filter((function(e){return e.props.value===f}))[0]))}},236:function(e,t,n){"use strict";var a=n(0),r=Object(a.createContext)({tabGroupChoices:{},setTabGroupChoices:function(){}});t.a=r}}]);