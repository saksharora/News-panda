
import React from 'react'

const Newsitem =(props)=> {
  
    let {title, description ,imageUrl,newsUrl,author,date,source} = props;
    return (

        
      <div className="my-3">
          

          <div className="card" style={{width: "18rem"}}>
  <img src={imageUrl?imageUrl:"https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png"} className="card-img-top" alt="..."/>
  <div className="card-body">
  
    <h5 className="card-title">{title}...
    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-black" style={{zIndex:'1',left:'90%'}}>
    {source}
    
  </span>
   </h5>
    <p className="card-text">{description}...</p>
    <a rel="noreferrer"  href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
    <p className="card-text"><small className="text-muted">By {!author? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
  </div>
</div>
      </div>
    )
  
}
export default Newsitem