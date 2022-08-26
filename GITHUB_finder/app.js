// github.js
class Github{

  constructor(){
     this.client_id='d2fa58779b9ffaf65c34';
     this.client_secret='bbc477071d6dd5e431e321de86c323a8cb37a1ff';
  }

  async getUser(user){
      const profileResponse= await fetch('https://api.github.com/users/'+user+'?client_id='+this.client_id+'&client_secret='+this.client_secret);
      const profile = await profileResponse.json();
      return {
           profile 
      }
  }
}
// UI.js

class UI{
  constructor(){
    this.profile=document.querySelector('#profile');
   
  }
  
  showProfile(user){
     this.profile.innerHTML=  
     ' <div class="card  card-body mb-3">                                          <div class="row">                                                            <div class="col-md-3">                                                       <img class="img-fluid mb-2" src='+user.avatar_url+'></img>                       <a href='+user.html_url+'target="_blank" class="btn btn-primary w-100" >View Profile</a>                                                                              </div>                                                                             <div  class="col-md-9">                                                                        <span class="badge bg-primary" > Public Repos : '+ user.public_repos+'</span>  <span class="badge bg-secondary" > Public Gists : '+ user.public_gists+'</span>  <span class="badge bg-success" > Followers : '+ user.followers+'</span>                                                                         <span class="badge bg-info" > Following : '+ user.following+'</span>  <br><br>                                                                            <ul class="list-group">                                                     <li class="list-group-item"><b>Company  :   '+ user.company+'</li><li class="list-group-item">Website/Blog  :   '+ user.blog+'</li><li class="list-group-item">Location  :   '+ user.location+'</li> <li class="list-group-item">Memeber Since  :   '+ user.created_at+'</li>                 </ul> </div>  </div></div> <h3 class="page-heading mb-3">Latest Repos </h3> <div id="repos"> </div>'
      
     
  }
  clearProfile(){
    this.profile.innerHTML="";
  }
  showAlert(msg,cls){
    // clear previous alerts
    this.clearAlert();
         const div=document.createElement('div');
         div.className=cls;
        //  addd text
        div.appendChild(document.createTextNode(msg));
        // get parent
        const container =document.querySelector('.searchContainer');
        // get search box
        const search=document.querySelector('.search');
        // insert alert
        container.insertBefore(div,search);
  }
//   // clea alert msg
clearAlert(){
 const alertExist =   document.querySelector('.alert');
 if(alertExist){
  alertExist.remove();
}
}  

}

// app.js

// init github
const github=new Github;
// init UI
const ui=new UI;

// search input field
const searchUser=document.querySelector('#searchUser');
searchUser.addEventListener('keyup',(e)=>{
  const userText=e.target.value;

  if(userText !==''){
    // make http call
    github.getUser(userText)
    .then(data=>{
      console.log(data);
      if(data.profile.message==='Not Found'){
        //  show an alert
              ui.showAlert('User not found','alert alert-danger');

      }else{
          // show profile
          ui.showProfile(data.profile);
      }
    }); 
  }else{
    // clea profile
    ui.clearProfile();
  }
  
});


