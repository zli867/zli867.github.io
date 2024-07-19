# Original Template
The homepage website is developed based on the plain-academic template ([link](https://github.com/mavroudisv/plain-academic)). It is a truly simple website template for academics. It was developed with simplicity in mind (both in terms of style and in code complexity). Just download the two files (index.html and photo.gif) and start editing straightaway.

# Added Functions
## Publication
[publication.ipynb](https://github.com/zli867/zli867.github.io/blob/main/publication.ipynb): Create publication section based on your publications. You should put the following information in a subfolder of the publications folder:
* Graphic Abstract (or your favorite figure in the article)
* BibTex of your publication
* PDF of your publication

I named the folder in chronological order (the recent one with a large number), and the code sorted the publications in the same order. Copy the generated HTML text to the index.html.

## Talks Map
[conference_talk.ipynb](https://github.com/zli867/zli867.github.io/blob/main/conference_talk.ipynb): Create the JavaScript variables based on your conference talk BibTex. Put the conference BibTex in the talks (remember to add a location). The scripts create a stringified-list and copy it to org-locations.js. Click the markers on the map, and the talks there will be shown.

