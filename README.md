# Population Data Plot
Plots city data (population, latitude and longitude) in a bubble chart with bubble size proportional to city population. Calculates distance between selected cities.

https://alexjmarshall.github.io/pop-plot/
## Requirements
The plot should be interactive allowing the following user interactions:

If a user clicks on one city, the plot displays the name of the city that was clicked on and the plotting symbol becomes highlighted.

If a user clicks on the city again, the highlighting and name will disappear.

If a user clicks on a second city with the first city highlighted, the plot displays the name of the second city and highlights the second city.  

If two cities are highlighted, the plot should also display the distance between the cities measured in kilometres. The distance should be calculated from the longitudes and latitudes of the two cities and other reasonable assumptions.

Clicking on either city removes that city’s highlighting and removes the measure of the distance.
## Notes
The distance between two selected cities is calculated using the Haversine formula, i.e. as the crow flies.
