# Technical test @Masteos

The goal of this technical test is to rewrite **You Can't JavaScript Under Pressure**, currently on life support on [Way Back Machine](https://web.archive.org/web/20160407233622/http://games.usvsth3m.com/javascript-under-pressure/).
The exercise set is included with this set.

The project **must include**:
* a **web app** allowing for taking the test and submitting solutions
* a **server** that sends the exercises to the web app

Here is a full use case, end-to-end potential scenario:
* the user accesses the website and is greeted with a big "Start" button to start the test
* when the user clicks on the button, a visible timer starts and the first exercise appears, with a code editor containing the base code of the exercise and a console box
* when the user submits their solution to the exercise, the console should display each unit test, in sequence, and if the solution complies with the expected result or not
  * when a single test fails, the console should stop displaying the next unit test, until the user re-submits their solution
* upon completion of the test set, a button to move on to the next test should appear
* upon completion of the whole exercise set, the timer should stop, and the web app should display the time it took for the user to finish the exercises, and a "retry" button

This scenario can be adapted to your liking, but must at least have the timer and the ability to code and test against the test set.
You can make any change to the included exercise set you see fit, as long as it still tests the ability to write JavaScript :)

The web app **must comply** to the following rules:
* written in TypeScript _(preferred)_ or plain JavaScript
* uses React _(preferred)_, Angular or Vue

The server **must comply** to the following rules:
* written in TypeScript _(preferred)_ or plain JavaScript
* has a healthcheck route and a route to list the exercises

This technical test should take no more than 4 hours to complete, but you are free to show your skills beyond the scope of the test! The more, the merrier :)
When you are happy with your submission, either push your code on GitHub _(preferred)_, or send it via e-mail to guillaume.delahodde@masteos.com.

## Bonus ideas

Here are a few pointers on how this project could be augmented:

* support for `console.log` / `console.warn`
* a server-side, secure way to execute the user-submitted code and check against the expected results
* Docker configuration, to make the app setup and start easier
* locally stored results, to improve on a previous score and set a new record
* a leaderboard, stored in a database, showing you your scores against other players
* set prettier up on commit to normalize the coding style
* i18n support
* animations and UX
* support for TypeScript on the submitted solutions
* gamification, e.g. unlockable tips or virtual rewards

Note that **these features are not required** for the completion of the test.
