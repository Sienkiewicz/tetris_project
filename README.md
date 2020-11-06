<h1 align='center'> BUILDING A TETRIS (PRACTICE)</h1>

![Title of profile](src\assets\image_for_MD\Title.png) <br>

#### *tetris is a good opportunity to learn how to work with arrays, and I decided that I would build this game in React with React hooks and custom hooks* <br>

## [View a Demo](https://tetris-project-sienkiewicz.netlify.app/) 
You will have more fun with control of Tetris when you try it on desktop computer.\
Use the arrow keys on the keyboard

____________________________________________________________________
## What stack?
**- JAVASCRIPT**<br> 
**- React**<br> 
**- React-hooks**<br> 
**- SASS**<br> 
**- HTML5**<br> 
**- BOOTSTRAP**<br> 
**- STYLED-COMPONENTS**<br> 
____________________________________________________________________

## Description

It's a cool game witch was created by Russian software engineer Alexey Pajitnov in 1984 when he has 16 years old on Pascal.

My version of Tetris implemented by React.

It has the best randomization of all Tetris version - I took the logic from **Tetris: The Grand Master 3 — Terror-Instinct (2005)**.

The animation was created based on requestAnimationFrame, not setInterval.

I've learned web development myself without any course or coaching so don't expect too much from the source code.

____________________________________________________________________

**CHANGING AVATAR**
<br> 
<br> 

![Changing avatar](src\assets\image_for_MD\usability.gif) <br>


## About the project

- build and rewrite the field, move and rotate the 'tetramino', counters - all logic was built on custom hooks.
- the animation created by custom hook with requestAnimationFrame. Initially I used Den Abramov's custom hook with setInterval, but it was lagged, and I took another hook and rewrote it for myself. 

## How to play

Press the start button and enjoy the game. You can move the 'tetramino' (figure) by pressing the arrow keys - left or right. You can also throw the 'tetramino' by pressing the down arrow key.

To rotate the 'tetramino', when it throwing, press up arrow on the keyboard.

When the row on the field is completely fill, it disappears and the 'Cleans' counter add 1 point. Level up every 10 rows.

I recommend to use desktop because it's easy and convenient to use arrow keys on the keyboard. 

## Future scope
- change view of game (CSS)
- build this game completely resposive and easy to use on every platform
- add simple writing best score and ranking
- login with gmail
- add the next type of Tetris, where at the start the field will have partially filled rows, depending on the level.

