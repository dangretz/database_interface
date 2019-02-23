# Database Interface
Small website built for a class assignment. Film theorists have discussions around a style of films called 'database films'. They thematically present, and display through their form, databases. In exploring the concept multiple writers have given explanations relating to real technical formats. So, I built a database about a database film. 

Webpage consists of images of *Memento* (Christopher Nolan, 2000) and *Her Story* (Sam Barlow, 2015). Clues (truthful or not) are revealed on the left. Click the button for more images.
 
## Set Up
Go to dangretzinger.com/database_interface

## Instructions
- Click the button to add a new element
- It could be a quote or an image
- Contents relate to both Memento film by Christopher Nolan (2000) and Her Story video game by Sam Barlow (2015)
- Clues are given after going through certain items on the left
- Additions can be made by following the steps below:
	1. Add image to the images directly. Include i## and a new number in the name.
	2. Add the new name to the list.txt in images directory
	3. Add a i##.txt to the text directory. Fill in information in the text file if desired
	

### Technical Details
Website is built using vanilla javascript, css, and html. Nothing is special underneath the hood. To get around accessing files using a back-end microframework, a XMLHttpRequest is used to pull master lists in every folder. With these another request can be made to get every image.

### Film Analysis

## Future Work
  - Refractor code
  - Lower image quality
