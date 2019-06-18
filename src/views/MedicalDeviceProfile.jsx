import React from "react";

import './custom/view.css';

import {
 
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,

} from "reactstrap";

class MedicalDeviceProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fetchedData: "",     
      }
    this.state = {
        modalDemo: false,
    };
    this.toggleModalDemo = this.toggleModalDemo.bind(this);
}
toggleModalDemo(){
    this.setState({
        modalDemo: !this.state.modalDemo
    });
}
componentDidMount = async () => {
let requireData = JSON.stringify({

  "namespace": "edm2019"
});
const settings = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: requireData
};
const data = await fetch('https://enterprise.gydpost.com/get/medical/device', settings)
  .then(response => response.json())
  .then(json => {
    this.setState({ fetchedData: json });
    this.setState({ vuln_data: json });

    return json;
  })
  .catch(e => {
    return e
  });
return data;
}

render() {
console.log("Fetched: ", this.state.fetchedData);


const detailData = this.state.fetchedData && this.state.fetchedData.map((data, index) =>  {
  return (

    <Col md="4" key={Math.random()}>
      <Card  >
        <CardHeader>
          <CardTitle>
            Profile details 
          </CardTitle>
        </CardHeader>
        <CardBody>
<p className="text-muted">Device Name:
                   {data. deviceName }</p>
                   <p className="text-muted">Device Name:
                   {data. deviceId }   
                   </p>
                   <p className="text-muted">Device Name:
                   {data. dunsNumber}
                   </p>
                   <p className="text-muted">Device Name:
                   {data.catalogNumber }
                   </p>
                   <p className="text-muted">Device Name:
                   {data. deviceCount  }
                   </p>
                   <p className="text-muted">Device Name:
                   {data. deviceDescription}
                   </p>
                   <p className="text-muted">Device Name:
                   {data. phone }
                   </p>
                   <p className="text-muted">Device Name:
                   {data. email  }
                   </p>
                   <p className="text-muted">Device Name:                
                   {data. gmdnPTName }
                   </p>
                   <p className="text-muted">Device Name:                
                   {data. gmdnPTDefinition}
                   </p>
                   <p className="text-muted">Device Name:                
                   {data. productCodeName}
                   </p>
                   <p className="text-muted">Device Name:                                    
                   {data. productCode}
                   </p>         
        </CardBody>
      </Card>
    </Col>
  );
})


return (
  <>
  <div className="content">


  <Card className="top-card">
      <Row>
        <Col sm={12} className="text-center">
        Medical Devices Profile
        </Col>
      </Row>
    </Card>
           <Row>
            {detailData}
          </Row>
  </div>
</>
);
}
}
  
export default MedicalDeviceProfile;
