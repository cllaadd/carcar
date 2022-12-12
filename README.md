# CarCar

Team:

* Claudia - Service
* Alex - Sales

## Design

## Service microservice

I created two main models for my service microservice: Technician and Appointment, as well as an Automobile Value Object so I could identify which appointment to treat as VIPs. Technician has two fields: name and id which I set to be the technician's employee id as wel as the primary key for the Technican model. I decided to do this because i wanted to make the mployee id's 4 digits, which is short enough to remember and grabbing an individual tehincian by their id would not be a problem, while also minimizing the extra data I'm creating. Similarly, for my Automobile Value Object model, I only included two fields, vin and href, becuase that was the only data I thought would be useful for polling between my service microservice and the Inventory monolith. For Appointment, I knew I would use technician as a foreign key to my technician model, and it made sense to assign name, date, and time fields. I knew that I wanted to be able to make appointments for cars not sold by the site's dealership because of the instructions to identify VIP customers, so I did not make the VIN field a foreign key to my Automobile Value Object model. I also did not set the VIN to be unique as it was in the Inventory monolith's Automobile model becuase I wanted to be able to have the same car come in for multiple appointments. However I had a lot of options for how to identify whether an appointment had been completed or whther it had VIP status. I considered making a separate model for status to keep track of whether an appointment was finished or cancelled and I also considered making a separate model for VIP but in the end, I realized these extra models would include very little information and weren't neccesary for what I was trying to accomplish in my list of appointments page, so I decided to set both vip and finished as boolean fields in my Appointment model and have my cnacel button delete an appointment, since there would be no need to keep track of appointments that never happened. I did want to keep track of the finished appointments since they could be useful for referencing down the line. I set both finished and vip's defaults to be false as well because I wanted newly created appointments to be set as not finished and I wasn't yet sure how I was going to identify an appointment as VIP yet.

From there, I set up my poller to transfer data from the inventory monolith for the car instances to my AutomobileVO model. To test this, I went into the admin on localhost and made sure the vins from the automobiles I had created were showing up. Once I got this working, I realized there were a few different methods I could use to flag whether an appointment was VIP or not but I ultimately decided to do it on my backend in my api_appointments view. I wrote the view so that my 'post' or create function would generate a list of automibile vins from the site's inventory through the AutomobileVO model and then check if the inputted vin for the appointment matched one from the automobile valeu object list. In the case that it matched an instance from the list, the vip boolean field in Appointment would be set to true on creation of the appointment. I think this was the simplest and most effective way to got about identifying VIP clients as well as the most accurate for the database becuase if I had made a function to set VIP to true at a later time, some VIP appointments would be incorrectly set as false until then. For the 'get' method of api_appointments, I also inclded the option to get al the appointments for one vin. That's why my 'put', 'delete', and 'get' methods for a singular appointment have a different url than just 'appointments/int:id', becuase that view is used for getting multiple appointments from the same car. The rest of my views were written pretty standardly except that I included one extra view, api_filtered_appointments, that generates a list  of only appointments with the 'finished' boolean field set to false. I relaize this was not entirely neccessary, as I could have had the list on my front end filter for this field as well, but I already knew I needed to have one of my pages use a search bar and figured my frontend code could be simplier for one of the pages if it used an already filtered view.

## Sales microservice

I began by creating React infrastructure for our site as a whole as well as the inventory microservice.  From there, I used functional components to build the inventory lists.  We built out the requests in Insomnia to make sure everything for inventory was working as required.  I moved on to Salesperson and Customer next.  I built the models, as well as registering them and building the encoders.  Then I built get views for the list and post views.  I assigned their URL paths and built in front end work for their creation on React.  I decided to use class based components for these forms to better spell out state and see the state changes.  I then moved on to Sales.  For sales, I needed to build a value object for automobiles, as we needed the data from the other microservice.  I built my poller to access the data from the inventory microservice in this microservice.  From there, I followed a similar trajectory with oa few more complications given that Sale had three separate foreign keys from my automobile value object, my salespeople, and my customers.  The models and encoders were made and registered, I built my views and URLs and began working on my React front end.  The sale list and sale record were built without too many issues and in a similar manner to others.

The drop down for the salespeople on the history page was similarly ok to achieve.  However, pulling up a history of a specific salesperson provided some more difficulty.  I tried to filter within the render, but ran into many errors.  I tried to attach the change to the data as a part of my handleSalespersonChange, and that seemed to work, but in reality kept pulling up the wrong data due to timing.  I therefore built a componentDidUpdate function to change the data as the salesperson was updated in the dropdown.  This worked on the page itself, but I watched as my webpage tried to fetch and reupdate 17 times per second.  I realized that while the website was functional, I needed to improve that given the memory usage of constantly trying to get data and update.  I added in prevState and prevProps parameters to my componentDidUpdate function and used them to create an if statement checking if the state had changed in the update.  I would only do the componentDidUpdate if the state was changed by the handleInputChange function.  This resolved my problem and made for a working site.  From there, I double checked that all my code was still working and moved on towards stretch goals.
