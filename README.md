## Modulopoly 

<p align="center">
<img src="https://raw.githubusercontent.com/DRossyCPNV/ProjetGroupe-JeuDePlateau/e04f7ba596209b145890ef59965c0851a660e733/JeuDePlateau-screenshot.jpg" width="500" alt="screenshot of the game" >
</p>

[![Release](https://img.shields.io/badge/release-stable-84C072)](https://github.com/DRossyCPNV/ProjetGroupe-JeuDePlateau/releases)
![Language](https://img.shields.io/badge/language-french-415C7E) 
[![GitHub all releases](https://img.shields.io/github/downloads/DRossyCPNV/ProjetGroupe-JeuDePlateau/latest/total?color=88aacc&style=flat)](https://github.com/DRossyCPNV/ProjetGroupe-JeuDePlateau/releases)

## Introduction
As part of the CPNV school, we aimed to carry out a group project, with a physical boxed version of the game, as well as a computer version, whose source code must be modular if necessary.

The game supports 2 to 6 players and is contained in a single HTML file, which loads several JavaScript scripts at startup and displays the game cards from inline JSON arrays. 
This approach keeps the project fully functional under file:// restrictions. 

The board and pawn movements are rendered using the HTML5 Canvas, allowing smooth animations, with configurable pawn movement speed.

## Purpose of the game:
Be the first player to have his or her CFC.

When your turn arrives, roll the dice, then move your piece forward as many spaces as indicated by the dice, in the direction indicated by the arrow on the start square.

If you skip a question box, you are forced to stop.
The box on which you will stop tells you what you must or can do.
Several pawns can be on the same square at the same time.

Depending on the box you have arrived at, you can perform one of the following operations:

- buy a module
- answer a question, to try to earn points
- draw a chance card
- pass the final exam, to win the game

When you have finished your turn, it will be the player on your left who plays.

#### The Departure box:
This is the square on which a game starts.

#### Stop on a case Module:
When you stop on a module box, you can choose to use your points in order to retrieve a module card.
The price of the module is written on the box.

#### Stop on a Chance case:
By stopping on this square, you must draw a chance card and read it aloud. 
You can or should apply what it tells you.

#### Stop on a case Question:
When you are on this square, the right player must draw a question card and read it aloud to you, as well as the possible answers if you wish. 
If you answer correctly and without help, you will receive 500 points.
On the other hand, if you have asked for help, you will only receive 250 points.
If you answer correctly, you will receive 500 points.

#### Take the exam:
To take the exam, you must have obtained a module box of each color (red, blue, green, and yellow). 
In your turn, you can choose to pay 1000 points to place your pawn on the CFC square, at the center of the board.

To receive your CFC, you just need to answer a randomly drawn question card from your left-hand neighbor.
Then you have to roll the dice and get a 4, 5 or 6.

If necessary, on your next turn you can rerun the dice and choose to start from one of the 4 chance boxes.

#### The winner:
The first player to get his or her CFC wins the game.

## How to run
- Go to the [Releases](../../releases) page to download a zip
  Or
- Clone the repository directly with Git.
The simply launch Modulopoly.html in your favorite browser.

Due to its educational purpose and local use, this project is currently available in French only. 

If you enjoyed this project, feel free to give it a star - it's always appreciated.
