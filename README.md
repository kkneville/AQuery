# AQuery
a very simple js library for basic DOM manipulation

Aquery is mostly for creating a short hand for a chain of dom selections.

instead of typing out: 
<br />
`document.getElementById("sidebar").getElementsByClassName("nav").getElementsByTagName("li")[5] `
<br />
(aint nobody got time for that!)

you can use: 
<br />
`$Aquery("#sidebar .nav li 5")`
<br />
much shorter!

the $Aquery function returns an object with a few helpful functions for manipulation, and stores the raw DOM element in the .raw property

more info to be added later when I have the time
