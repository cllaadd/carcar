# CarCar

Team:

* Claudia - Service
* Alex - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

I began by creating React infrastructure for our site as a whole as well as the inventory microservice.  From there, I used functional components to build the inventory lists.  We built out the requests in Insomnia to make sure everything for inventory was working as required.  I moved on to Salesperson and Customer next.  I built the models, as well as registering them and building the encoders.  Then I built get views for the list and post views.  I assigned their URL paths and built in front end work for their creation on React.  I decided to use class based components for these forms to better spell out state and see the state changes.  I then moved on to Sales.  For sales, I needed to build a value object for automobiles, as we needed the data from the other microservice.  I built my poller to access the data from the inventory microservice in this microservice.  From there, I followed a similar trajectory with oa few more complications given that Sale had three separate foreign keys from my automobile value object, my salespeople, and my customers.  The models and encoders were made and registered, I built my views and URLs and began working on my React front end.  The sale list and sale record were built without too many issues and in a similar manner to others.

The drop down for the salespeople on the history page was similarly ok to achieve.  However, pulling up a history of a specific salesperson provided some more difficulty.  I tried to filter within the render, but ran into many errors.  I tried to attach the change to the data as a part of my handleSalespersonChange, and that seemed to work, but in reality kept pulling up the wrong data due to timing.  I therefore built a componentDidUpdate function to change the data as the salesperson was updated in the dropdown.  This worked on the page itself, but I watched as my webpage tried to fetch and reupdate 17 times per second.  I realized that while the website was functional, I needed to improve that given the memory usage of constantly trying to get data and update.  I added in prevState and prevProps parameters to my componentDidUpdate function and used them to create an if statement checking if the state had changed in the update.  I would only do the componentDidUpdate if the state was changed by the handleInputChange function.  This resolved my problem and made for a working site.  From there, I double checked that all my code was still working and moved on towards stretch goals.
