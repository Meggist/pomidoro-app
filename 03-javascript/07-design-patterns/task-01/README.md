Task: MVC Concept
===============================

This task is about creating simple web application using MVC.

Overview
----

Implement application that shows photos and accepts 'likes' from user.

Web page should have:

* list of all images (names) with like counts sorted by likes. List contains accordingly

* block with image:
  - image (clickable)
  - like counter for that image
  - like button to increment counter

* selected image dialog(appears after clicking on image):
  - block with current image (as described above)
  - prev/next buttons to change current image.

>**[ -note- ]** Provide only basic styles of layout.

>**[ -note- ]** Before implementation, please read and try to understand the following topics related to JS MVC:

https://habr.com/ru/company/ruvds/blog/333856/

https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch10s02.html

https://medium.com/@ToddZebert/a-walk-through-of-a-simple-javascript-mvc-implementation-c188a69138dc

https://www.awwwards.com/build-a-simple-javascript-app-the-mvc-way.html


Develop the following MVC components:
  - like
  - image block (which contains like component and other elements as described above)
  - list (which contains image blocks)

Each component should have its own files:
  - models.js - stores photo data and describes models
  - views.js - creates DOM and manipulates components DOM
  - controllers - handles the user interactions and connects views with models

The recommended project structure:

```
task-01
└─── index.html
└─── js/
      └─── like/
          └─── controllers.js
          └─── models.js
          └─── views.js
          ...
      └─── image-block/
          └─── controllers.js
          └─── models.js
          └─── views.js
          ...
...
```

Look at JS-MVC.png and JS-MVC-dialog.png to get some general image of the app

Use http://marak.github.io/faker.js/ to generate fake/mock image data

Don't forget using **SOLID**, **DRY**, **KISS**, **YAGNI** and **SoC** principles while creating your solution.

Try using some of **design patterns**, covered during the lecture


------------------- END OF HOMEWORK TASK ------------------------

Deadline:
----------

Due Date - 2019-20-07 23:59
Penalty will be applied for each overdue day
