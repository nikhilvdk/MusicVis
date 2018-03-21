# MusicVis

Check me out: <https://nikhilvdk.github.io/MusicVis/

## Overview/Explanation

I was inspired by my interest in music to create an unconventional look at different data features of a song and how it is reviewed by Pitchfork.

I came in from a more exploratory and analytical data mindset at first before honing down how it would be visualized.



<u>Emotional Polarity Sketch</u>

- In this sketch users can visualize data on positivity conveyed through the song, the lyrics and the review.
- The sketch is partitioned into 9 different rating categories given to songs reviewed by Pitchfork.
- Pressing "L" will display lyrical datapoints and pressing "R" will display the review datapoints in each score category.
- Datapoints are arranged vertically by the polarity (level of positivity) extracted from the lyrics/reviews.
- Clicking on a datapoint will cause it to oscillate at a frequency that corresponds to the valence or level of happiness of that particular song. You can click again to make it stop.
- Hovering over a datapoint will display the valence value and song title.
- Pressing "A" will cause all of the datapoints to begin oscillating at their respective valences.



<u>Subjectivity Sketch</u>

- In this sketch users can visualize data on the relative subjectivity of the lyrics and reviews through adjective usage and experience the speechiness (relative presence of spoken word) of the track.
- Users can type any number 1-9 to toggle data from that Pitchfork score category. 
- Audio will begin playing based off the average speechiness of songs in that score category.
- The words displayed are the 10 most common adjectives used in the lyrics (blue) and the Pitchfork reviews (red). The size of the word indicates frequency of use.
- The horizontal position on the screen indicates the level of subjectivity conveyed in the text calculated via TextBlob sentiment analysis.





## Behind the Scenes

<u>Datasets I used:</u>

- [Pitchfork Song Reviews](https://www.kaggle.com/nolanbconaway/pitchfork-data/data) (Kaggle)
- [Metrolyrics Song Lyrics](https://www.kaggle.com/gyani95/380000-lyrics-from-metrolyrics/data) (Kaggle)
- Song Audio Metrics (Spotify API)



<u>Tools:</u>

- p5.js
- python (for data wrangling/filtering/cleaning)
  - Spotify API calls
  - SQLite
  - TextBlob sentiment analysis



<u>Steps:</u>

1. I began by downloading the song reviews (csv) and lyrics data (SQLite) and importing them into pandas dataframe, matching common songs between datasets and dropping rows to get one song per artist.
2. I looped through each song and queried Spotify to lookup the song name, extracting features from the song including valence (happiness), speachiness, danceability and others and merged that into the dataframe.
3. Using TextBlob, I performed analyses on each song's lyrics and Pitchfork review, extracting polarity (positive or negative sentiment) and subjectivity for each song.
4. I aggregated songs based on score, and extracted the 10 most common adjectives from reviews and lyrics in each score category.
5. I then performed some traditional plotting and correlation analyses using seaborn to get a sense for what features I should use and what sketch to create.

