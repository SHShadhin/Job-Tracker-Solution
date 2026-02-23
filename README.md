## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

A. getElementById() :- getElementById() selects one specific element by id.
i. We use this when we want to get one specific element which has an id.
ii. If the id is not found or id name is wrong it returns null.

B. getElementsByClassName() :- getElementsByClassName() selects multiple elements with same class.
i. We use this when many elements have the same class name.
ii. It returns many elements.
iii. It gives us a HTML Collection list.

C. querySelector() :- It uses CSS selectors to find elements.
i. When we use it and want to get id inside the querySelector we have to give #(hash) and then id name.Its almost like as use css styles. for example - querySelector('#id')
ii. When we use it and want to get clss inside the querySelector we have to give .(dot) and then clas name.Its almost like as use css styles. for example - querySelector('.class').
iii. We can also get elemens by Tagname here.
iv. But the important thing is it only returns the first matching element.

D. querySelectorAll() :- This also uses CSS selectors, but it returns all matching elements.
i. It returns a nodeList 
ii. We can use forEach loop in it.

## 2. How do you create and insert a new element into the DOM?
Ans: To create and insert a new element into the DOM, we follow three simple steps.
A. First, we create a new element using document.createElement().
i. let newPara = document.createElement("p"); ==> This creates a new paragraph element.

B. Second, we add some text or content inside the element.
i. newPara.innerText = "This is a new paragraph."; ==> Now the paragraph has text inside it.

C. Third, we insert the element into the DOM. 
i. Finally we insert it using appendChild() or append().
ii. let container = document.getElementById("container");
iii. container.appendChild(newPara);

## 3. What is Event Bubbling? And how does it work?
Ans: Event Bubbling means when an event happens on a child element, it first works on that element, then moves up step by step to its parent elements. For example, if we click on an element, the event happens on that element first, then goes to its parent, then the parent's parent, and so on, up to the html element. This means both the element you clicked and its parents can respond to the same event.

## 4. What is Event Delegation in JavaScript? Why is it useful?
Ans: Event Delegation is a technique where we attach a single event listener to a parent element instead of adding separate listeners to multiple child elements. The parent listens for events on its children, and we can use the event object to figure out which child triggered the event.

Why it's useful:

We write only one event listener instead of many.
It works even if new child elements are added dynamically.
It improves performance and makes code simpler.

## 5. What is the difference between preventDefault() and stopPropagation() methods?
preventDefault():- 
preventDefault() is used when we want to stop the browser’s default behavior.Example: a link won't open, or a form won't submit when clicked.

stopPropagation():-
Stops an event from moving up bubbling or down capturing the DOM. Example: clicking a button inside a div triggers only the button's event, not the div's.
