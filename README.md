# ELearn
elearning platfrom 


 
E_Learn Website

I.	Project idea: 
The idea is to create an E-learning platform , where users (students/teachers/graduated people) Can register to the platform and choose to add courses ,and start they learning path (the course) the course contain lessons and each lesson contain an exercise and the exercise need to be done so the user can move to the next lesson , users can track their progress and they will get grades depending on the way they perform.
II.	Requirements:
 
Features: (Functional needs)

   Register/Login:
     Any user with a Neptune code should be able to register and any registered user should be able to login  
     
  Profile/Add courses:
     A registered user can access his profile and track his progress and he can access the courses and choose which course to add to his profile 
     
  Profile/Remove courses:
     A registered user can delete a course in the condition that the admin accept his demand 
     
  Practice the course:
     The user can practice using an embedded editor and run the code to see the result 
     
  Become a teacher:
     This features is for teachers, registering as a user and then the user can submit a demand to become a teacher, and this demand will be evaluated by the admin 
     
   Teacher /Create courses: 
      Once the user become a teacher he will find a new feature available which allow him to create courses 
      
   Teacher/ assign grades:
     Each teacher have students to give them grades and send to them notes  .






Features: (No Functional needs)

Accessibility:
  The platform need to be accessible from anywhere and for everyone who is registered It should be user friendly (easy to use and understand) 
  
Security: 
  The platform needs to be protected from random access to critical data or resources, only authenticated users can access their data 
  
Extensibility: 
This project is created by one developer could be categorized as a freelance project, so it can be adopted and have some improvement

III.	Feasibility:

From an abstracted point of view the project is doable by one person, any diving in details can lead to extend the deadline 

    Projects already in the market (big scale –large scope):
       HackerRank 
       FreeCodeCamp...
       
IV.	Technology used 

      Node Js:
        Node.js  cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.
	
          Frontend (View ejs):
              Embedded JavaScript. It is a simple templating language/engine that lets its user generate HTML with plain javascript. It offers an easier way to interpolate (concatenate) strings effectively. 
	      
          Css & Bootstrap:
                Using also the style sheets and their bootstrap framework 
		
         Backend (express):
               Express, is a back end web application framework for Node.js, It is designed for building web applications and APIs, Mostly for handling requests 
         Node js (Passport):
	 
             Passport is authentication middleware for Node.js. A comprehensive set of strategies support authentication using a username and password. 
         Node js (Mongoose):
	 
            Mongoose is a Node. Js-based Object Data Modeling (ODM) library for MongoDB.        Database (Mongo dB):
	    
              MongoDB is a source-available cross-platform document-oriented database program. 
	      
V.	The project Structure: 

Config: contains the configurations files of the database and the Authentifiaction 

Models: contains all the database collections models that we need 

Node Modules: contains all the library used in the project for example (express, passport, mongoose …) 

Routes: a JavaScript file used in the sake of abstraction it contains the main routes used in the project for example (user, index, learning …) 

Views: ejs files, contains the templates used in the project 

.env: For security purposes when uploading to GitHub, this file contains sensitive information and they will not be uploaded 

App.js: Js file, the main entry point of the program 

Package.json: a json file contains all the information about the installed libraries (name, version  ...) 
              
       





	
 
VI.	Features:
After feature throttling, move into the sorting phase where we prioritize based on importance. Thus, during the development phase, we can define where we will start.

Courses management


	
	Courses CRUD 	
	
	Courses – Student relationship	
	
	Present Courses on the interface 	
	
	Present Courses details for the subscribed users	
	
	Present demonstration for non-subscribed users 			




Users management 

	User Crud	
	
	Present user details	
	
	Subscribe to course 	
	
	Track Progress	
	
	Get grades 		


Teachers management	Teacher Crud 	
	
	Consulting students progress 	
	
	Assign grades 		


Compiler / editor	Compile Code  	
	
	Sending outputs/errors	
	
	Show lesson and exercise	
	

 
Conclusion:

The analysis and specification phase is the initial phase of project creation and implementation. In fact, it represents an important thinking step in the software design cycle.
We will begin in the next chapter the design of this application which includes the detailed use case diagrams, the different sequence diagrams and the class diagram.
 
VII.	Conception:


1.	Introduction:
The design phase is the second phase of project creation. In fact, it represents an important step in the software development cycle after the analysis and specification phase.
In this section, we will present in detail the design of the project through the following UML diagrams: the use case diagrams, the Sequence and database diagram.


2.	The Actors: 
Actors are all people or systems who react with the project: 
•	user : can be a guest – student or a teacher 
•	database : where all the data are saved 
•	server : the core engine responsible of the interaction between the interface and the database 


3.	Use cases:
A use case diagram defines a way of using the system and allows us to describe the functional requirements which will help us in the development phase to identify classes and objects.
It is a significant unit of work. In a use case diagram, users are called actors, they interact with use cases


A.	System Use Case:

   
They make it possible to describe the interaction between the actor and the system. The strong idea is to say that the user of a software system has an objective when he uses the system. this use case is a description of the interactions that will allow the actor to achieve his objective by using the system. 

B.	Course management use case: 

 


C.	Teacher’s management use case:





D.	Account management use case:

  




	 
4.	Database design: 

Database design is the organization of data according to a database model.

 

5.	Conclusion:
In this section, we introduced the UML language. Also we have made the description of the use case, and the database design in order to delimit the frame of our work and to prepare a favorable ground for the next step.
Now our application is ready to be coded. In the next section, we are interested in the implementation of our system based on the detailed design of this section.
 
VIII.	The Web site : 

