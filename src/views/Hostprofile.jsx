
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {Pie} from 'react-chartjs-2';
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,

  UncontrolledTooltip,
} from "reactstrap";

import './custom/view.css'

//////////////////////////////////////////////////pie chart /////////////////////////////////
let percent_usage = [];
let percentData;
console.log("Percent Data: ", percentData && percentData);
const data = {
  labels: [
    'Percent Used',
    'Percent Unused',
    
  ],
  datasets: [{
    data: percent_usage && percent_usage,
    backgroundColor: [
    '#00AEFF',
    '#36A2EB',
    
    ],
    hoverBackgroundColor: [
    '#00AEFF',
    '#36A2EB',
    
    ]
  }]
};

const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'left',
    labels: {
      boxWidth: 10
    }
  }
}


let eveSec=[];
let protocol = []; 
let receivedProtocol = [];
let totalProtocol = [];
let protocolLabels = [];

let chartExample3 = {
  data: canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: protocolLabels && protocolLabels,
      datasets: [
        {
          label: "usage",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#12cbce",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: protocol && protocol
        }
      ]
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////

class Hostprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      fetchedData: "",
      macAddress: ''
    };
  }

  eveSec = [];
  macAddress;
 setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

//////////////////////////////////////////////////////recvd//////////////////////
protocolUsage = () => {
  protocol = [];
  console.log("Protocol.........>>>:", this.protocol);
  for (var i = 0; i < protocol.length; i++) {
    protocol.pop();
    var text = protocol;
    var integer = parseInt(text, 1024);
  
  }
  
  console.log("Protocollength.........>>>:", integer);
  if (this.state.fetchedData.protocol_usage && this.state.fetchedData.protocol_usage) {
    console.log("Protocol: ", this.state.fetchedData.protocol_usage);


    for (var i = 0; i < this.state.fetchedData.protocol_usage.length; i++) {
      protocolLabels.push(this.state.fetchedData.protocol_usage[i].name);

      protocol.push(this.state.fetchedData.protocol_usage[i].sent);

    
    }

  }

  if(this.state.fetchedData.disk_usage && this.state.fetchedData.disk_usage.length > 0) {
    // for(var i = 0; i < this.state.fetchedData.disk_usage.length; i++) {
    //   console.log("Percent Usage", this.state.fetchedData.disk_usage[this.state.fetchedData.disk_usage.length-1]);
    // }
    percentData = this.state.fetchedData.disk_usage[this.state.fetchedData.disk_usage.length-1];
    percentData = this.state.fetchedData.disk_usage[this.state.fetchedData.disk_usage.length-1];
    console.log("Percent Usage: ", percentData.percentage_used);
    var splitter = percentData.percentage_used.split('%');
    console.log("Splitter;: ",splitter);
    percentData = splitter[0];
    console.log("Now PercentData: ", percentData);
    percent_usage.push(percentData);
    percent_usage.push(100-percentData);
    console.log("Percent Usage: ,,,", percent_usage);
  }
}
  componentDidMount = async () => {
    let requireData = JSON.stringify({
      "namespace" : "edm2019",
  
      "data":{"macaddress" : this.props.location.apiResult}
    });

    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requireData
    };

    const data = await fetch('https://enterprise.gydpost.com/get/hostdata', settings)
      .then(response => response.json())
      .then(json => {
        this.setState({ fetchedData: json });
        return json;
      })
      .catch(e => {
        return e
      });

    return data;
  }

  getDataFromUrls=()=>{
  
    if(this.state.macAddress == '') {
      this.setState({macAddress: this.props.location.apiResult})
    }
    console.log("Props......", this.props);
  }

  render() {
  this.protocolUsage();
    this.getDataFromUrls();
    console.log("Props of all: ", this.props.location.apiResult);
    console.log("Fetched: ", this.state.fetchedData);
    
    const malwareDetection = this.state.fetchedData.malware_detection&& this.state.fetchedData.malware_detection.map((data, index) => {
      this.eveSec.push(data.eve_sec);
      return (
  
         <CardBody key={Math.random()} style={{padding: "10px 20px 0 10px", textAlign: "justify"}}>
         <div className="table-full-width table-responsive">
             <Table>
                 <tbody>
                     <tr>
                         <td>
                          
                         
                             <p className="text">{data.file_name}</p>
                          
                         </td>
                     </tr>
                 </tbody>
             </Table>
         </div>
     </CardBody>

      );
    });
    const installedApplications = this.state.fetchedData.installed_applications && this.state.fetchedData.installed_applications.map((data, index) => {
      this.eveSec.push(data.eve_sec);
      return (
  
         <CardBody key={Math.random()} style={{padding: "10px 20px 0 10px", textAlign: "justify"}}>
         <div className="table-full-width table-responsive">
             <Table>
                 <tbody>
                     <tr>
                         <td>
                         <p className="text" > {data.app_name}</p>                     
                             
                          
                         </td>
                     </tr>
                 </tbody>
             </Table>
         </div>
     </CardBody>
      );
    });
    const users_accounts = this.state.fetchedData.users_accounts&& this.state.fetchedData.users_accounts.map((data, index) => {
      this.eveSec.push(data.eve_sec);
      return (
  
         <CardBody key={Math.random()} style={{padding: "10px 20px 0 10px", textAlign: "justify"}}>
         <div className="table-full-width table-responsive">
             <Table>
                 <tbody>
                     <tr>
                         <td>
                          
                         
                             <p className="text">{data.users_account}</p>
                          
                         </td>
                     </tr>
                 </tbody>
             </Table>
         </div>
     </CardBody>

      );
    });
    const logged_in_users= this.state.fetchedData.logged_in_users&& this.state.fetchedData.logged_in_users.map((data, index) => {
      this.eveSec.push(data.eve_sec);
      return (
  
         <CardBody key={Math.random()} style={{padding: "10px 20px 0 10px", textAlign: "justify"}}>
         <div className="table-full-width table-responsive">
             <Table>
                 <tbody>
                     <tr>
                         <td>
                          
                         
                             <p className="text">{data.logged_in_user}</p>
                          
                         </td>
                     </tr>
                 </tbody>
             </Table>
         </div>
     </CardBody>

      );
    });
    // const Alerts = this.state.fetchedData.alerts && this.state.fetchedData.alerts.map((data, index) => {
    //   this.eveSec.push(data.eve_sec);
    //   return (
    //     <CardBody key={Math.random()} style={{padding: "10px 20px 0 10px", textAlign: "justify"}}>
    //       <div className="table-full-width table-responsive">
    //         <Table>
    //           <tbody>
    //             <tr>
    //               <td>
    //                 <p className="title" style={{fontSize: "11px"}}>Category: {data.category}</p>
                 
    
    //               </td>
    //             </tr>
    //           </tbody>
    //         </Table>
    //       </div>
    //     </CardBody>

    //   );
    // });


    const Vulnerability = this.state.fetchedData.vulnerabilities && this.state.fetchedData.vulnerabilities.map((data, index) => {
      this.eveSec.push(data.eve_sec);
      return (
        <CardBody key={Math.random()} style={{padding: "10px 20px 0 10px", textAlign: "justify"}}>
          <div className="table-full-width table-responsive">
            <Table>
              <tbody>
                <tr>
                  <td>
                    <p className="text" >ID:{data.id}</p>
                    <p className="text">decsription:{data.desc}</p>
                
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>

      );
    });
 
    return (
      <>
        <div className="content">
        <Card className="top-card">
            <Row>
              <Col sm={12} className="text-center" style={{ fontSize: "16px", fontWeight: "bold", color: 'white' }}>
                Host Profile
              </Col>
            </Row>
          </Card>
        <Row>
       <Col xs="2" adding-bottom="20%" >
              <Row>
                <Col align="middle">
                  <img src="/638.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                <b>Hostname: {this.state.fetchedData && this.state.fetchedData.hostname}</b>
                </Col>
              </Row>
            </Col>


            <Col xs="2" adding-bottom="20%" >
              <Row>
                <Col align="middle">
                  <img src="/638.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                <b>IP: {this.state.fetchedData && this.state.fetchedData.ip}</b>
                </Col>
              </Row>
            </Col>

         
            <Col xs="2" >
              <Row>
                <Col align="middle">
                  <img src="/640.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                 <b>OS: {this.state.fetchedData && this.state.fetchedData.os}</b>
                </Col>
              </Row>
            </Col>
            <Col xs="2" >
              <Row>
                <Col align="middle">
                  <img src="/640.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                <b>Category: {this.state.fetchedData && this.state.fetchedData.category}</b>
                </Col>
              </Row>
            </Col>      
          </Row>

          <Row>       
          <Col lg="6" md="12">
              <Card className="card-tasks" style={{height: "400px"}}>
                <CardHeader>
                  <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>malware detected</h6>
                  <p className="card-category d-inline"></p>

                </CardHeader>
                {malwareDetection }
                
              </Card>
            </Col>

            <Col lg="6" md="12">
              <Card className="card-tasks"  style={{height: "400px"}}>
                <CardHeader>
                  <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Installed Applications</h6>
                  <p className="card-category d-inline"></p>
           
                </CardHeader>
                {installedApplications}
              </Card>
            </Col>  






          </Row>  <Row>
          <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <h6 className="card-category" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Network Protocol</h6>
                  <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                                        {"Host Usage "}
                                    </CardTitle>
             
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />

                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12"> 

<Card className="card-chart" >
  <CardHeader>
    <h6 className="card-category" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Disk Usage</h6>
    <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                                        {"Disk Usage "}
                                    </CardTitle>
  </CardHeader>
  <CardBody>
    <div className="chart-area">
      <Pie data={data} height={200} width={500} options={options}/>
    </div>
  </CardBody>
</Card>
</Col>

          </Row>
<Row>


            {/* <Col lg="6" md="12">
              <Card className="card-tasks" style={{height: "400px"}}>
                <CardHeader>
                  <h6 className="title d-inline" style={{fontSize: "11px"}}>Alerts</h6>
                  <p className="card-category d-inline"></p>

                </CardHeader>
                <CardBody className="border-top">
                {this.state.fetchedData && this.state.fetchedData.alerts.length > 0 ?
                  {Alerts} 
                  : 
                  // <div className="text-center card-fixed-height">
              
                    <p className="text">No Alerts Found</p>

                  // </div>
                }
                </CardBody>
                
              </Card>
            </Col> */}

<Col lg="6" md="12">
              <Card className="card-tasks" style={{height: "400px"}}>
                <CardHeader>
                  <h6 className="title d-inline"style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Logged In User</h6>
                  <p className="card-category d-inline"></p>
                  
                </CardHeader>
       {logged_in_users}
              </Card>
            </Col>  



              <Col lg="6" md="12">
              <Card className="card-tasks"  style={{height: "400px"}}>
                <CardHeader>
                  <h6 className="title d-inline"style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>User Accounts</h6>
                  <p className="card-category d-inline"></p>
           
                </CardHeader>
                {users_accounts}
              </Card>
            </Col>           
          </Row>
        </div>
      </>
    );
  }
}

export default Hostprofile;




