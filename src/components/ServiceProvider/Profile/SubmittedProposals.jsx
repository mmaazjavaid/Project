import React from 'react';
import "./submittedProposals.css";


function SubmittedProposals(){
    return(
        <>
        <div class="sub_prop_con">
<div class="sub_prop_head">
    <h1 style={{marginTop:"0"}}>Submitted Proposals (2)</h1>
</div>
<div class="sub_prop2">
    <div class="sub_prop">
        <div class="sub_prop_time">
            <span style={{fontSize: "17px",fontWeight: "600"}}>Initiated Feb25, 2022</span>
            <span style={{fontSize: "15px",color: "rgb(102, 102, 102)"}}>6 minutes ago</span>
        </div>
           <span style={{color:"#266386" ,fontSize: "20px",fontWeight: "700", width: "70%",textAlign: "center"}}> Central Implementaion Administrator</span>
     <span className='sub_prof' style={{color: "rgb(102, 102, 102)"}}>Genreal Profile</span>
    </div>
</div>
    </div>
        </>
    );
}

export default SubmittedProposals;