### Basics
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

### How Js works behind the scenes
