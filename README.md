# Lowbar
---
My personal project to make a clone of some popular methods from [Underscore](http://underscorejs.org/), a commonly used bundle of functions for Javascript.

## Setup and Installation
---
1. Make sure that you have version 7 or above of node. Open your terminal and type and run.
```
node -v
```
This command will return the version of node you are running. If you do not get a reponse of the form
```
vX.X.X
```
or your version is not up to date, please refer to this [guide](https://nodejs.org/en/) on how to install node.
2. Make sure that you have npm installed, which is a [Node Package Manager](https://www.npmjs.com/). Check by typing in yor terminal and running.
```
npm -v
```
This command will tell you which version of npm you have. You can update your version of npm by typing in the terminal and running.
```
npm i npm
```
3. Make sure that you have git installed on your computer. You can check by typing and running in your terminal
```
git --version
```
which you return a response in the form.
```
git version x.xx.x
```
Please click on this [link](https://git-scm.com/) if you do not have it installed. Then run this command in the terminal in the directory where you want it installed.
```
git clone https://github.com/ochan7/Lowbar.git
```
Then navigate inside the Lowbar folder and run this command.
``` 
npm install 
```

---

The following methods have been implemented

* [identity](http://underscorejs.org/#identity)
* [values](http://underscorejs.org/#values)
* [first](http://underscorejs.org/#first)
* [last](http://underscorejs.org/#last)
* [each](http://underscorejs.org/#each)
* [indexOf](http://underscorejs.org/#indexOf)
* [filter](http://underscorejs.org/#filter)
* [reject](http://underscorejs.org/#reject)
* [uniq](http://underscorejs.org/#uniq)
* [map](http://underscorejs.org/#map)
* [contains](http://underscorejs.org/#contains)

* [pluck](http://underscorejs.org/#pluck)
* [reduce](http://underscorejs.org/#reduce)
* [every](http://underscorejs.org/#every)
* [some](http://underscorejs.org/#some)
* [extends](http://underscorejs.org/#extends)
* [defaults](http://underscorejs.org/#defaults)

* [once](http://underscorejs.org/#once)
* [negate](http://underscorejs.org/#negate)
* [shuffle](http://underscorejs.org/#shuffle)
* [invoke](http://underscorejs.org/#invoke)
* [sortBy](http://underscorejs.org/#sortBy)
* [zip](http://underscorejs.org/#zip)
* [sortedIndex](http://underscorejs.org/#sortedIndex)
* [flatten](http://underscorejs.org/#flatten)
* [intersection](http://underscorejs.org/#intersection)
* [difference](http://underscorejs.org/#difference)
* [memoize](http://underscorejs.org/#memoize)

* [delay](http://underscorejs.org/#delay)
* [where](http://underscorejs.org/#where)
* [throttle](http://underscorejs.org/#throttle)
* [partial](http://underscorejs.org/#partial)

---
## Running the Tests
In order to run the tests after installation, make sure you are in the root directory of the folder and then run this command in your terminal

```
npm t
```
The tests were made following Test Driven Development principles, using [mocha](https://mochajs.org/), [chai](http://chaijs.com/) and [sinon](http://sinonjs.org/) tesing libraries
## Author

Olie Chan 


## Acknowledgments

I would like to thank the team at [Northcoders](https://northcoders.com/) for inspiring me to go into Coding
