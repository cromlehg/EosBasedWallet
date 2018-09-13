# Gese React App

## Installation and running

To install app, run the following in your project root directory:  
Install dependencies
```sh
npm i
```
Copy env file
```sh
cp .env.example .env
```
For development run webpack dev server:
```sh
npm start
```
For production:  
* Create SSL certificates, edit paths in .env.
* Build and run server
```sh
npm run build
npm run server
```


Application will be available at http://localhost:9081

## Store structure

### story
fetch({user_login || story_id, page}, listName)  
upvote(id)  
promote(id)  
create()  
current: {}  
lists: {feed, blog, search}  
loading: {fetch, upvote, promote, create}  
errors: {fetch, upvote, promote, create}  

### comment
  fetch({user_login || story_id, page}, listName)  
  upvote(id)  
  create(target_id)  
  lists: {profile, story, product}  
  loading: {fetch, upvote, create}  
  errors: {fetch, upvote, create}  

### product
  fetch(product_id)  
  fetchList({user_id || login, filter, tags , page}, listName)  
  upvote(id)  
  create()  
  current: {}  
  lists: {profile}  
  loading: {fetch, upvote, create}  
  errors: {fetch, upvote, create}  

### campaign
  fetch({user_login || campaign_id, page}, listName)  
  create()  
  current: {}  
  lists: {profile}  
  loading: {fetch, create}  
  errors: {fetch, create}  

### transaction
  fetch({user_login}, listName)  
  create()  
  lists: {profile}  
  loading: {fetch, create}  
  errors: {fetch, create}  

### tag
  fetch  
  lists: {feed}  
  loading: {feed}  
  errors: {feed}  

### user
  fetch({user_login || user_id})  
  isLoginExists(login)  
  isEmailExists(email)  
  current: {}  
  loading: {fetch}  
  errors: {fetch}  

### account
  fetch()  
  login({user_email, user_pwd})  
  logout()  
  user: {}  
  loading: {}  
  errors: {}  










