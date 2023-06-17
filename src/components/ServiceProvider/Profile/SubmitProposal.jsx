import React from 'react';
import "./submitProposal.css";

function SubmitProposal(){
    return(
<>
<div class="submit_prop_con">
        <h1 style={{fontWeight:"600"}}>Submit a Proposal</h1>
        <div class="prop_job_details">
            <h2 style={{fontSize:"23px",color:"black",marginTop:"15px",fontWeight:"600"}}>Job details</h2>
            <div class="prop_des_con">
                <div class="prop_des_con1">
                    <h4 class="prop_job_title" style={{fontWeight:"600"}}>Require Entry level Javascript Developer for Long term Relationship</h4>
                    <div class="prop_job_title2">
                        <span >Front-end Development</span>
                        <p>Posted in Jun 16, 2023</p>
                    </div>
                    <div class="prop_job_desp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit facilis rerum explicabo saepe provident debitis in aperiam tempora sapiente esse aut placeat enim exercitationem delectus, quidem ea ducimus temporibus nostrum?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et obcaecati cum odit vero culpa eligendi totam quis magni est molestiae delectus reprehenderit voluptatem quos nesciunt sequi, neque atque, id aliquam.
                    </div>
                </div>
            </div>
            <div class="prop_skills">
                <h3 style={{fontSize:"19px",marginTop:"10px",fontWeight:"600"}}>Skills and expertise</h3>
              <div class="skill_con2">
                <span>Web Application</span>
                <span>HTML</span>
                <span>Node</span>
              </div>
            </div>
        </div>
        <div class="prop_terms">
            <h2 style={{fontSize:"23px",color:"black",marginTop:"15px",fontWeight:"600"}}>Terms</h2>
            <div class="prop_bid" style={{borderBottom: "1px solid #D5E0D5"}}>
                <div class="prop_bid1">
                    <span  style={{fontSize: "16px"}}>What is the full amount you'd like to bid for this job?</span>
                    <span  style={{fontSize: "17px"}}>Bid</span>
                    <span style={{fontSize: "15px",color: "#5E6D55"}}>Total amount the client will see on your proposal</span>
                </div>
                <div class="prop_bid2">
                    <input type="number" name="" id=""/>
                </div>
            </div>
            <div class="prop_bid" style={{height: "24%", borderBottom: "1px solid #D5E0D5"}}>
                <div class="prop_bid1">
                    <span  style={{fontSize: "17px"}}>10% Freelancer Service Fee</span>
                </div>
                <div class="prop_bid2">
                   <span style={{fontSize: "18px",color: "#9AAA97",marginRight: "170px"}}>-$450.00</span>
                </div>
            </div>
            <div class="prop_bid">
                <div class="prop_bid1">
                    <span style={{fontSize: "17px"}}>You'll receive</span>
                    <span style={{fontSize: "15px",color:"#5E6D55"}}>The estimated amount you will receive after service fee</span>
                </div>
                <div class="prop_bid2">
                    <input type="number" name="" id=""/>
                </div>
            </div>
        </div>
        <div class="prop_det">
            <h2 style={{fontSize:"23px",color:"black",marginTop:"15px",fontWeight:"600"}}>Additional Details</h2>
            <div class="prop_cover">
                <span style={{fontWeight: "600",marginBottom: "10px"}}>Cover Letter</span>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
        <div class="prop_btns">
            <button>Submit proposal</button>
            <button style={{backgroundColor: "rgb(137, 137, 137)",position:"relative",right:"20px"}}>Cancel</button>
        </div>
    </div>
</>
    );
}

export default SubmitProposal;