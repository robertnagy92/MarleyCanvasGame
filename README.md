# Marley Boy

## Description

Marley is a game where the player is a dog that has to collect food items and avoid obstacles that show up on the screen and approach the player. A score is calculated on the amount of items collected and obstacles avoided during the play.
The game ends when the player looses all lives at his disposal.

## MVP(DOM-CANVAS)

* player has 3 lives
* player can jump
* obstacles come towards player randomly
* losing all lives will end the game
* collecting food items generates score points
* Marley barks with the press of a key

## Backlog

* add a scoreboard
* ability to change day/night mode
* if Marley touches water, he will be a wet dog and speed will decrease

## Data Structure

main.js

* buildStartScreen(){}
* buildGameScreen(){}
* buildGameOverScreen(){}

game.js

* startLoop(){}
* game (){}
* collision (){}
* clearCanvas (){}
* drawCanvas (){}
* score(){}
* endGame(){}

marley.js

* draw(){}
* move(){}
* jump(){}

## States & States Transitions

 Different states and their transition
  
  * startScreen
  * gameScreen 
  * gameOverScreen

## Tasks
   * main - buildDom
   * main - buildStartScreen
   * main - buildGameScreen
   * main - buildGameOverScreen
   * main - addEventListener

## Links

### Trello
[Link](https://trello.com/b/hvoaGDyq/marley-html5-canvas)
### Git
[Coming Soon]
### Slides
[Coming Soon]