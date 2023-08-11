# How  to run the project
 - Clone the repo 
 - there are 2 folders,  api and ui  responsible for ui and server part accordingly , 
 - inside each folder run  npm i ,
 - in api folder run  npm run dev , to run the server 
 - in ui folder npm start to run the fe server,  request  are working thought proxy
# What's using?
- React, scss, UseReducer, Typesript, express, mongo atlas, REST protocol

## How the form works?
- you are saving initial user data, get the initial total price calculations, after it on each change discount or coverage, you will get the updated  calculation that is  saving in database. The list of option will appear at the bottom of the form.
- Combination to prices are creating new for each user name, So if you will enter  new user name, calculation will start from the beginning
- Price match field will be filled after user data will be saved,  if Price match filed I empty initially.
- Check the age, 20 or 30 , age calculating from the current year.
## Things to improve: 
- Code duplicate in fe components, like header and sidebar, I can combine them into one component.
- move reducer stuff to separate file 
- Just in case left unused url in api part 