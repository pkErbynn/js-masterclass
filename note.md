## Basics
1. <script></script> tag adds js to html page. two ways:
    - inline or
    - external script file
2. Data types
    - Undefined: datatype assigned to a variable w/ 'no value yet'
    - Null: means 'no-existent'
        - Undefined: datatype of variable w/ no value yet
    - Null: means 'no-existent'
3. Falsy
    - values evaluated to false...eg; undefined, null, 0, '', NaN
4. Function expression
    - always returns a value
    - stored in variable, say x = function(y)
    - x is called instead....x(param)
    - 2+3...an expression cus produces a result
5. Object value access
    - ```x = {y: 2}``` <= means object _literal_
    - `x.y`
    - or `x['y']`
    - object is mutable...ie, can change their prop values

6. Concepts
    - Variable mutation: changin' var value
    - Type coercion: converting from one type to another automatically
7. Ternary operator: can store return value
8. Brief History
    - Js was initially called LiveScript
    - In 1996, changed to JavaScript to 'attract Java developers'.
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
            2. Creation of the scope chain#
            2. Determine value of 'this' var
        2. Execution phase
            - Funtion's code d@ generated the current EC is ran line-by-line