# Issues

## Current

## Features
scripps - put the location and say that the rooms are beautiful. You get 10% off by booking directly on their website (rather than their booking). There are no blocks allowed. "Luxury"
- do a list of links for other general hotels that will be close to the venue
- note on the top "recommend to book early as august is a very busy month in la jolla" put it in red

## Open
* Add description to wedding parties, add katrina's cropped photos once I have connectivity
* "Check out the seals" add link
* consider making navList items that are being overflowed just vanish. Low priority since it may be slighly challenging to implement for a minor cosmetic improvement
* fix all warnings

## Resolved
* make the registry dummy items look a little nicer **fix** created new ```registryitem``` component that looks like a nice image card and does absolutely nothing.
* Implement gallery **fix** very complex - added a new data model and storage item on backend. Added new service ```galleryservice``` that implements both. Addded plenty of UI components taht use the service.
* Remove the dropdown menu from logistics and make items appear on the page, make clicking the icon take you to general logistics **fix** this was determined to be unnecessary
* Fix cake animation **fix** lots of messing around in cake.css. idr tbh
* Add "Additional Details to note" item in logistics (parking, traffic, etc.) which takes you to FAQ **fix** trivial
* San Diego Activities add emojis **fix** trivial
* tooltips for transportation and hotel options should be unique per accordion **fix** simple change to the titles, manual
* Time and place summary: make a clock animation, have it ghost away, and make the wording fade in: "-august 21st rehearsal (see details) - august 22nd Cuvier wedding day (see details), -august 23rd Brunch & Beach Day (see details), .etc **fix** made changes to `clock.js` component to enable animation and added some effecs to the ```summary.js``` component.
* combine ceremony and reception items **fix** pasted jsx code from reception component into ceremony, removed reception from router
* Add "Hotels" Item to Logistics **fix** created new component that doesn't really have anything at the moment
* Add dummy registry links on my donations page **fix** just added some divs for now
* change "Donations" to "Registry" **fix** trivial
* Make ```home``` icon initial transformation have the rings be nonexistent and just delayed
* Smaller font sizes for ```gallery``` icon and ```donations``` icon should have border size that decreases as well.
* Logistics needs to be an exception for the nav menu items - when routed to logistics it needs to remain on nav reel **fix** adding jsx to detect if link.route === "/Logistics" in navList.js component
* set body to have children with max width 100% **fix** mostly solved this for faq - manipulated css flexing behavior on faqItem and faqBody classes
* ceremony photo should have max-width 100% - reception as well **fix** set new css property .weddingBody img that restricts max width to 100%
* onload the nav reel should allow overflow (may be a symptom of the above issue) **edit** it is not a symptom... **fix** added initialization hook on navList.js to check overflow on load.
* toaster no longer needed of faq init **fix** removed the LoC from getFaqs in Faq.js
* faq questions seem to overflow the page on small media widths **fix** fixed by above issue on max width
* galleries icon needsto be wrangled a bit for smaller widths **fix** added some styling based on component size prop, rather than css
* cuvier club history add a little bullet "you can read more about the cuvier club on their website here..." **fix** added another p tag to the cuvierText variable in ```CuvierClubHistory.js```
* pad the music recommendations body, make sure it can't overflow. **fix** added a div with padded sides in the ```PlayListForm.js``` jsx code
* music add song resets list to only added song **fix** updated the ```createTune``` function in ```PlaylistForm.js``` to simply fetch tunes. It still makes sense to have the service createTune return the recently-created tune.
* change "Guest Music Recommendations" to "Playlist Recommendations" **fix** trivial
* change donations description **fix** trivial
* pad the navlist for smaller medias **fix** added padding to css class under app.css
* smaller medias make the home rings a little smaller **fix** masterful css manipulation in ```cake.css```