## DESCRIPTION:

Implement page with students profilecards and detailed info using js template engine.
This task requires to be implemented with Handlebars.js (http://handlebarsjs.com/)
and usign EPAM UUI Framework 2.0 (https://uui.epam.com/)

To allow Ajax requests - use local http server. Install node modules and use `npm start` to start server.

Don't worry about exact colours and icons.

## REQUIREMENTS:

`task_guide.pdf` contains wireframes for required page layout and behavior.
Header should be impelemented as template that accepts array of navigation links and rendered as soosn as page loads.
For simplicity use predefined array.

```
[{text: 'Handlebars', href: '#'}, {text: 'Dust', href: '#'}, {text: 'Lodash', href: '#'}]
```

Page should request students data via `XMLHttpRequest` from `data/data.json` file.
Since server package doesn't send any content headers **implentation should enforce** `XHR` object to parse data as JSON and later work with response as JS object/array.

After data is retrieved it should be rendered and behave according to wireframes.
* Hover over profile card should change color applied and reveal button.

* Click on button should open modal with detailed employee data.

* Yellow person in the modal should be link to employee UPSA profile that can be generated as `https://upsa.epam.com/workload/employeeView.do?employeeId=<ID>`

* Support only desktop screens.

* Support all major browsers
  * Chrome
  * Firefox
  * Edge



## WORKFLOW:

Commit implemented task to git into

branch `03-javascript`

folder `03-javascript/09-template-engines/task-01`

Structure of the task should be:

```
<task folder>
|---css
|   |--- styles.css
|   \--- <other css files>
|---data
|   \--- data.json
|---fonts
|---images
|---js
|   |---lib
|   |---handlebars-helpers.js
|   |---index.js
|   \---<other files if needed>
|---index.html
\---package.json
```


## SOURCES:

```
<task folder>
|---src
|   |---css
|   |   |--- styles.css - file that will contain your styles
|   |   \--- <other css files>
|   |---data
|   |   \--- data.json
|   |---fonts
|   |---images
|   |---js
|   |   |---lib - library scripts added to page
|   |   |---handlebars-helpers.js - file that will contain your helpers
|   |   \---index.js - main file for your task
|   |---index.html
|   \---package.json
|
|---README.md
\---task_guide.pdf
```

## DEADLINE:

Penalty will be applied for each overdue day.
