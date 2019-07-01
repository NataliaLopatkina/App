# ToDo
To do list

## Requirements
- node v6.7.0
- npm v3.10.3

## Technology
### CSS
- [PostCSS](http://postcss.org/)
 - [postcss-import](https://github.com/postcss/postcss-import)
 - [postcss-preset-env](https://preset-env.cssdb.org/)
 - [postcss-advanced-variables](https://github.com/jonathantneal/postcss-advanced-variables)
 - [postcss-svg-inline](https://github.com/TrySound/postcss-inline-svg)
 - [postcss-short](https://github.com/jonathantneal/postcss-short)
- [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)
- [cssnano](http://cssnano.co/)

### HTML
- [Pug](https://pugjs.org/api/getting-started.html)

## Browser support
The autoprefixer is configured to use Flexbox Layout and to the following browsers:
- 3 latest versions of modern browsers. At the time of writing this is:
 - IE Edge 13+
 - Chrome 58+
 - FireFox 53+
 - Safari 8+
 - Opera 45+
- IE 11+

## Setting
Installing the necessary modules:
```
npm i
```

## Structure of project
### _blocks
It contains "blocks", the names of folders and files in them should be the same.

### _images
Folder for images that are used by embedding directly in HTML or CSS.

### _pages
Similarly _blocks.
**Exclusion:** If the project uses a common style file, then it should be located here: `_pages/common/common.css`.

### fonts
Folder for fonts. All files of each typeface should be in separate folders and have the same name along with the folder in which they are located.

### images
Folder for images.

### scripts
Folder for scripts.

### stylesheets
Folder for styles. Must contain 2 types of CSS file. Original and minimized with prefix `.min`.

## Building a project with Gulp
All tasks for which the project is being built are in the file `gulpfile.js`.

### Gulp tasks
#### `$ gulp go`
1. Starts the server.
2. Monitors the changes of all files located in folders `_blocks` and `_pages`.
3. Collects CSS files from folders `_pages/name of page` and puts in a folder `stylesheets`.
4. Minimizes the resulting CSS files and puts it next to the originals.
5. Collects HTML files from folders `_pages/name of page` and puts in the root of the project.
6. Aligns indents in received HTML files.

#### `$ gulp go -page index`
It helps speed up the build due to the fact that only one page is collected.
1. Starts the server.
2. Monitors the changes of all files located in folders `_blocks` and **only** for `_pages/index.pug` and `_pages/index.сss`, all other files from the folder `_pages` are ignored.
3. Collects CSS files from folders `_pages/index/index.css` and puts in a folder `stylesheets`.
4. Minimizes the resulting CSS files and puts it next to the originals.
5. Collects HTML files from folders `_pages/index/index.pug` and puts in the root of the project.
6. Aligns indents in received HTML files.

*`index` specified for example, instead of it can be any page title*

#### `$ gulp go -page index -style common`
It helps speed up the build due to the fact that only one page is collected.
`-style common` should be used if the project has a common CSS file for all pages.
1. Starts the server.
2. Monitors the changes of all files located in folders `_blocks` and **only** for `_pages/index.pug` and `_pages/common/common.сss`, all other files from the folder `_pages` are ignored .
3. Collects CSS files from folders `_pages/common/common.css` and puts in a folder `stylesheets`.
4. Minimizes the resulting CSS files and puts it next to the originals.
5. Collects HTML files from folders `_pages/index/index.pug` and puts in the root of the project.
6. Aligns indents in received HTML files.

*`index` specified for example, instead of it can be any page title*

#### `$ gulp build`
Final build before commit.
1. Collects CSS files from folders `_pages/имя-страницы` and puts in a folder `stylesheets`.
2. Minimizes the resulting CSS files and puts it next to the originals.
3. Collects HTML files from folders `_pages/имя-страницы` and puts in the root of the project.
4. Aligns indents in received HTML files.

😊

Enjoy your coding!
