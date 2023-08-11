# How  to run the project
2 folders,  api and ui , 
inside each folder npm i , 
and appropriate command from package json to run server for each,  ui and api.
api folder:
### npm run dev for  
ui folder
## npm start

## How the form works?
- you are saving initial user data, get the initial total price calculations, after it on each change discount coverage, you will get the updated  calculation that is  saving in database. THe list of option will appear at the bottom of the form.
- Combination to prices are creating new for each user name, So if you will enter  new user name, calculation will start from the beginning
- Price match field will be filled after user data will be saved,  if Price match filed I empty initially.
- Check the age, 20 or 30 , age calculating from the current year.
## Things to improve: 
-Code duplicate in fe components, like header and sidebar, I can combine them into one component.
- move reducer stuff to separate file 