## Basics
1. <script></script> tag adds js to html page. two ways:
    - inline or
    - external script file
2. Data types
    - Undefined: datatype assigned to a variable w/ 'no value yet'...ie, empty value
    - Null: means 'no-existent'
        - Undefined: datatype of variable w/ no value yet
    - Null: means variable 'no-existent'
3. Falsy
    - values evaluated to false...the 5 falsy values; undefined, null, 0, '', NaN
4. Function
    - function expression returns a value
    - *stored in variable, say x = function(y)*
    - x is called instead....x(param)
    - expressions = anything that returns/produces a value
    - statement = just actions, ends in ';'
    - 2+3...an expression cus produces a value/result
    - *user fxn expressions over fxn declarations*
    - arrows: declare, `const x = y => y + 1`...use, `const z = x(y)`
        - used when function has just one line of code
5. Object
    - ```x = {y: 2}``` <= means object _literal_
    - _dotNotation_ `x.y` or 
    - _bracketNotation_ `x['y']`...this's _computable/dynamic_
    - can have function property...*function expression as key/value property*
        - access as `obj.function(arg)` / `obj["function"](arg)`
    - object is mutable...ie, can change their prop values
6. Concepts
    - Variable mutation: *changin' var value
    - Type coercion: converting from one type to another automatically
7. Ternary operator: can store their return value
    - *ternary computed in string template*
8. Brief History
    - Brendan Eich created 1st version of Js in 10 days, called *Mocha* 
    - Was changed to LiveScript
    - In 1996, was changed to JavaScript to 'attract Java developers'.
        - meanwhile, *has nothing to do with Java* - marketing strategy
    - 1997: ES1 (ECMAScript 1) became the 1st version of JavaScript languade standard
    - 2009: ES5 (ECMAScript 5) released
    - 2015: ES6/ES2015 (ECMAScript 2015) released. *the biggest update to the language ever*
    - After 2015: changed to an *annual release cycle*
    - *2016/2017/2018/2019/...* : Release of *ES2016(ES7)/ES2017(ES8)/ES2018(ES9)/ES2019(ES10)/...*
    - ES5: 
        - supported in all browsers
    - ES6/ES7/ES8: 
        - supported in *modern* browsers, but not in older browsers
        - Most features can be used in production by *transpilling and polyfilling (converting to ES5)* ^^
    - ES9/ES10:
        - called *ESNext*, including future versions
        - not all features supported in all modern browsers
        - Can use most features in production by *transpilling and polyfilling* :)
9. Function xpression vs fxn declaration
    - use *fxn expressions over declarations*
## How Js works behind the scenes
This is an overview of what happens to our code hosted in the browser
- The host has a Js Engine: program that takes the code and execute
    - This is what happens inside the engine;
    - *Parser* read our code and validate the syntax
    - If valid, a data structure called *Abstract Syntax Tree* is produced by the Parser
    - *Abstract Syntax Tree* is then translated into *matchine code*
    - Now, code is run by the *processor* and does its work 

- The execution contexts (EC) and the execution stack (ES)
Code run in an env called execution context. A box/container/wrapper that stores vars and in which our code is evaluated and executed 
    - by default is the Global Execution Context
        - code *not inside any function*
        - it's the window object in browser
    - runtime stacking
        - global execution context > execution context (on top) > execution context (on top)
        - then pops each exe context off the stack after completion

- The EC in detail
    - the EC Object. Has 3  ff props;
        - Variable Object (VO)
        - Scope chain
        - "This" variable
    - Goes through 2 phases in the ES
        1. Creation phase.
            1. Creation of the VO
                - Arg object created to store all args passed into the fxn
                - Var declarations are scanned: a property is created in the Variable Object for each variable, and set to *undefine*
                - Function declarations are scanned: a property is created in the Variable Object for each fxn, *pointing to the function* 
                - *NB*: Var + Function declarations = *Hoisting*
                    - Means: they're available before the execution phase starts
            2. Creation of the scope chain
                - Each new fxn creates a scope: the env/space in which the vars if defined and accessible
                - *Lexical scope* means that in a lexically nested *implemented* function, the inner functions (*not function declarations*) have access to the (scope) variables and other resources of their parent scope.
                - But it doesn't work backward to its parents, meaning the child scopes not available to its parents.
                - This means that the child's functions are lexically bound to the execution context of their parents.
            3. Determine value of *'this'* var
                - In a* *regular function*, the *this* points to the global object (ie, window object in the browser)
                - In a *method call*, the *this* points to the object that's (*defined*) calling the method
                    - points the custom object within which it is defined, otherwhise the global
        2. Execution phase
            - Funtion's code d@ generated the current EC is ran line-by-line
            
    - Js _Hoisting_
        - applies more on regular functions not function expressions


## DOM Manipulation
DOM: structured rep of an html doc, used to conn webpages to script like Js
    - Js helps to access and manipulate the dom
Events
    - notifications sent to notify a code that sth happened on the webpage
    - unlike regulare fxns that are *called*, *event listeners* are also fxns but perform action based on event. They wait for specific event to happen, like click a btn, scroll, key press, etc
    - how are events processed
        - events can only be handles/processed as soon as the Execution Stack is empty. 
        - events are stored in a *message queue* waiting to be processed 

## Object Inheritance and the Prototype Chain
- Every Js obj has a *prototype property*, which makes inheritance possible in Js
- The prototype property is where methods and properties that will be *inherited by other objects* are put
- The Constructor/Class's prototype property is *NOT* the prototype of the Class *itself*, it's the prototype of *all* instances that are created through it.
- When certain meth is called, that meth is being searched for in the obj itself, and it cannot be found, the search moves to the mother Object's prototype. This search continues until meth is found. This is called *Prototype Chain*