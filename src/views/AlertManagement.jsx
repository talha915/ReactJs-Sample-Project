import React from "react";
import Moment from 'react-moment';
import 'moment-timezone';
// reactstrap components
import { Card, Collapse, CardHeader, CardFooter, CardTitle, CardBody, Row, Col, Table } from "reactstrap";
import './custom/map.css';
var alert = [];
class alertmanagement extends React.Component {
  collapsesToggle = (e, collapse) => {
    e.preventDefault();
    let openedCollapses = this.state.openedCollapses;
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse)
      });
    } else {
      openedCollapses.push(collapse);
      this.setState({
        openedCollapses: openedCollapses
      });
    }
  };

  geo_location = [];
  alert_cnctdhost = [];
  ntop_alerts = [];
  threat_alerts = [];
  constructor(props) {
    super(props);

    this.state = {
      bigChartData: "data1",
      fetchedData: "",


      horizontalTabs: "profile",
      verticalTabs: "profile",
      verticalTabsIcons: "home",
      pageTabs: "home",
      openedCollapses: ["collapseOne"],
      alertHost: [],
      geo: [],
      nTop: [],
      threats: [],
      connectedAlerts: false
    };
  }
  collapsesToggle = (e, collapse) => {
    e.preventDefault();
    let openedCollapses = this.state.openedCollapses;
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse)
      });
    } else {
      openedCollapses.push(collapse);
      this.setState({
        openedCollapses: openedCollapses
      });
    }
  };

  fetchedData = async () => {
    let requireData = JSON.stringify({
      "request_id": 121,
      "namespace": "edm2019",
    });


    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requireData
    };
    const data = await fetch('https://enterprise.gydpost.com/get/alerts', settings)
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

  buildData = () => {
    for (var i = 0; i < this.state.fetchedData.length; i++) {
      console.log("Data: ", this.state.fetchedData[i]);
    }
  }


  componentDidMount() {
    this.fetchedData();
    this.buildData();
  }

  showConnectedAlerts = () => {
    this.state.connectedAlerts = !this.state.connectedAlerts;
    console.log("STate.", this.state.connectedAlerts);
  }

  render() {
    const myArray = this.state.fetchedData && this.state.fetchedData.map((data, index) => {
      if (data.input_src == "alert_cnctdhost" && this.state.alertHost.length >= 0) {
        this.alert_cnctdhost.push(data);
        alert.push(data);
        this.state.alertHost.push(data);
      }
      if (data.input_src == "geo_location") {
        this.geo_location.push(data.input_src);
        this.state.geo.push(data);
      }
      if (data.input_src == "ntop_alerts") {
        this.ntop_alerts.push(data.input_src);
        this.state.nTop.push(data);
      }
      if (data.input_src == "threat_alerts") {
        this.threat_alerts.push(data.input_src);
        this.state.threats.push(data);
      }

      return (
        <CardBody key={Math.random()}>
          <div className="table-full-width table-responsive">
            <Table>
              <tbody>
                <tr>
                  <td>
                    <p className="title">Alerts NAME: {data.input_src}</p>
                    <p className="text-muted">
                      description: {data.description}
                    </p>

                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>

      );
    });

    // const myBottom = this.state.fetchedData && this.state.fetchedData.map((data, index) => {
    //   return (
    //     <Card key={Math.random()}>

    //       {
    //         data.input_src == "alert_cnctdhost" ?
    //           <Row>
    //             <Col sm="12">

    //               <p>
    //                 <img src="/unnamed.png" className="rounded-circle" alt="Cinque Terre" width="50" height="50" />
    //                 {data.input_src}
    //               </p>

    //             </Col>
    //             <Col sm="12">
    //               <p className="custom-description">{data.description}</p>
    //             </Col>
    //           </Row>
    //           :
    //           data.input_src == "geo_location" ?
    //             <Row>
    //               <Col sm="12">

    //                 <p>
    //                   <img src="/download (1).png" className="rounded-circle" alt="Cinque Terre" width="50" height="50" />
    //                   {data.input_src}
    //                 </p>
    //               </Col>
    //               <Col sm="12">
    //                 <p className="custom-description">{data.description}</p>
    //               </Col>
    //             </Row>
    //             :
    //             data.input_src == "ntop_alerts" ?
    //               <Row>
    //                 <Col sm="12">

    //                   <p>
    //                     <img src="/download.png" className="rounded-circle" alt="Cinque Terre" width="50" height="50" />
    //                     {data.input_src}
    //                   </p>
    //                 </Col>
    //                 <Col sm="12">
    //                   <p className="custom-description">{data.description}</p>
    //                 </Col>
    //               </Row>
    //               :
    //               data.input_src == "threat_alerts" ?
    //                 <Row>
    //                   <Col sm="12">

    //                     <p>
    //                       <img src="/images.png" className="rounded-circle" alt="Cinque Terre" width="50" height="50" />
    //                       {data.input_src}
    //                     </p>
    //                   </Col>
    //                   <Col sm="12">
    //                     <p className="custom-description">{data.description}</p>
    //                   </Col>
    //                 </Row>
    //                 : ''
    //       }
    //     </Card>
    //   );
    // })

    const checkList = this.state.alertHost && this.state.alertHost.map((data, index) => {
      return (
        <Card className="card-tasks"  style={{height: "150px"}}>
          {/* <CardHeader>
            
            <p className="title" style={{ fontSize: "15px" }}> {data.description}</p>

       </CardHeader> */}
                         
          <CardBody style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>

            <div className="table-full-width table-responsive">
              <Table>
                <tbody>
                  <tr>
                    <td>
                    <p className="title" style={{ fontSize: "15px" }}>OS:  {data.OS}</p>
                    <p className="title" style={{ fontSize: "15px" }}> Host Name:{data.hostname}</p>
                    <p className="title" style={{ fontSize: "15px" }}>Description: {data.description}</p>
                    <div className="col-3 offset-9">
                    <span><Moment >{data.eve_sec}</Moment></span>
</div>
              
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>

          </CardBody>

        </Card>

      );
    })
    {/* <Row>
<Col sm="12">

<p className="custom-description">
  {data.input_src}
</p>

</Col>            
<Col sm="12">
<p className="custom-description">{data.description}</p>
</Col>
<Col sm="12">
<p className="custom-description">{data.hostname}</p>
</Col> 
</Row> */}



    const ntop_alerts = this.state.nTop && this.state.nTop.map((data, index) => {
      return (
        // <Card>
        //   <Row>
        //     {/* <Col sm="12">

        //       <p className="custom-description">
        //         {data.input_src}
        //       </p>

        //     </Col> */}
        //     <Col sm="12">
        //       <p className="custom-description">{data.description}</p>
        //     </Col>
        //     <Col sm="12">
        //       <p className="custom-description">{data.hostname}</p>
        //     </Col>
        //   </Row>
        // </Card>

<Card className="card-tasks"  style={{height: "90px"}}>

               
<CardBody style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>

  <div className="table-full-width table-responsive">
    <Table>
      <tbody>
        <tr>
          <td>

                    
                    <p className="title" style={{ fontSize: "15px" }}>Description: {data.description}</p>
                    <div className="col-3 offset-9">
                    <span><Moment >{data.eve_sec}</Moment></span>
</div>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>

</CardBody>

</Card>





      );
    })

    const geo_location = this.state.geo && this.state.geo.map((data, index) => {
      return (
<Card className="card-tasks"  style={{height: "90px"}}>

               
<CardBody style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>

  <div className="table-full-width table-responsive">
    <Table>
      <tbody>
        <tr>
          <td>


                    <p className="title" style={{ fontSize: "15px" }}>Description: {data.description}</p>
                    <div className="col-3 offset-9">
                    <span><Moment >{data.eve_sec}</Moment></span>
</div>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>

</CardBody>

</Card>

      );
    })

    const threatAlerts = this.state.threats && this.state.threats.map((data, index) => {
      return (
        <Card className="card-tasks"  style={{height: "90px"}}>

               
        <CardBody style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>
        
          <div className="table-full-width table-responsive">
            <Table>
              <tbody>
                <tr>
                  <td>
        

                    <p className="title" style={{ fontSize: "15px" }}>Description: {data.description}</p>
                    <div className="col-3 offset-9">
                    <span><Moment >{data.eve_sec}</Moment></span>
</div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        
        </CardBody>
        
        </Card>
        
      );
    })

    console.log("Json: ", this.state.fetchedData, this.alert_cnctdhost.length, this.geo_location.length, this.ntop_alerts.length, this.threat_alerts.length);
    console.log("CONNECTED: ", this.alert_cnctdhost);
    console.log("Akerts;l;;", this.alert_cnctdhost && this.alert_cnctdhost);
    console.log("Akerts;l;;", this.state.alertHost && this.state.alertHost);
    return (
      <>
        <div className="content">
          <Card className="top-card">
            <Row>
              <Col sm={12} className="text-center" style={{ fontSize: "16px", fontWeight: "bold", color: 'white' }}>
                Alert Management
              </Col>
            </Row>
          </Card>

          <Row>
            <Col xs="3" adding-bottom="20%" >
              <Row>
                <Col align="middle">
                  <img src="/unnamed.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                  <b>Connected Host Alerts:{this.alert_cnctdhost && this.alert_cnctdhost.length}</b>
                </Col>
              </Row>
            </Col>

            <Col xs="3" >
              <Row>
                <Col align="middle">
                  <img src="/download.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                  <b>Network Alerts:{this.ntop_alerts && this.ntop_alerts.length}</b>
                </Col>
              </Row>
            </Col>
            <Col xs="3" >
              <Row>
                <Col align="middle">
                  <img src="/download (1).png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                  <b>Geo Location Alerts:{this.geo_location && this.geo_location.length} </b>
                </Col>
              </Row>
            </Col>
            <Col xs="3" >
              <Row>
                <Col align="middle">
                  <img src="/images.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle">
                  <b>Cyber Threats:{this.threat_alerts && this.threat_alerts.length} </b>
                </Col>
              </Row>
            </Col>


          </Row>
          <Row>
            <Col md="12">



              <Card>
             
                <CardHeader>
                  <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Alerts</h6>
                  <p className="card-category d-inline"> </p>
                  <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                    {""}
                  </CardTitle>
                </CardHeader>
                <Card style={{ maxHeight: "450px", overflow: "auto" }}>
                  <CardHeader role="tab">
                    <a
                      aria-expanded={this.state.openedCollapses.includes(
                        "connected"
                      )}
                      href="#pablo"
                      data-parent="#accordion"
                      data-toggle="collapse"
                      style={{ color: '#00aeff', fontSize: "16px", fontWeight: "bold" }}
                      onClick={e => this.collapsesToggle(e, "connected")}
                    >
                      <img src="/unnamed.png" className="rounded-circle" alt="Cinque Terre" width="40" height="40" style={{ marginRight: "14px" }} />
                      Connected Host {" "}
                      <i className="tim-icons icon-minimal-down" />
                    </a>
                  </CardHeader>
                  <Collapse
                    role="tabpanel"
                    isOpen={this.state.openedCollapses.includes(
                      "connected"
                    )}
                  >
                    <CardBody>
                      {checkList}

                    </CardBody>
                  </Collapse>
                </Card>



                <Card style={{ maxHeight: "450px", overflow: "auto" }}>
                  <CardHeader role="tab">
                    <a
                      aria-expanded={this.state.openedCollapses.includes(
                        "collapseNTOP"
                      )}
                      href="#pablo"
                      data-parent="#accordion"
                      data-toggle="collapse"
                      style={{ color: '#00aeff', fontSize: "16px", fontWeight: "bold" }}

                      onClick={e => this.collapsesToggle(e, "collapseNTOP")}
                    >

                      <img src="/download.png" className="rounded-circle" alt="Cinque Terre" width="40" height="40" style={{ marginRight: "14px" }} />
                      Network Alerts {" "}
                      <i className="tim-icons icon-minimal-down" />
                    </a>
                  </CardHeader>
                  <Collapse
                    role="tabpanel"
                    isOpen={this.state.openedCollapses.includes(
                      "collapseNTOP"
                    )}
                  >
                    <CardBody>
                      {ntop_alerts}

                    </CardBody>
                  </Collapse>
                </Card>


                <Card style={{ maxHeight: "450px", overflow: "auto" }}>
                  <CardHeader role="tab">
                    <a
                      aria-expanded={this.state.openedCollapses.includes(
                        "geoAlerts"
                      )}
                      href="#pablo"
                      data-parent="#accordion"
                      data-toggle="collapse"
                      style={{ color: '#00aeff', fontSize: "16px", fontWeight: "bold" }}
                      onClick={e => this.collapsesToggle(e, "geoAlerts")}
                    >
                      <img src="/download (1).png" className="rounded-circle" alt="Cinque Terre" width="40" height="40" style={{ marginRight: "14px" }} />
                      Geo Alerts {" "}
                      <i className="tim-icons icon-minimal-down" />
                    </a>
                  </CardHeader>
                  <Collapse
                    role="tabpanel"
                    isOpen={this.state.openedCollapses.includes(
                      "geoAlerts"
                    )}
                  >
                    <CardBody>
                      {geo_location}

                    </CardBody>
                  </Collapse>
                </Card>
                <Card style={{ maxHeight: "450px", overflow: "auto" }}>
                  <CardHeader role="tab">
                    <a
                      aria-expanded={this.state.openedCollapses.includes(
                        "threatAlerts"
                      )}
                      href="#pablo"
                      data-parent="#accordion"
                      data-toggle="collapse"
                      style={{ color: '#00aeff', fontSize: "16px", fontWeight: "bold" }}
                      onClick={e => this.collapsesToggle(e, "threatAlerts")}
                    >
                      <img src="/images.png" className="rounded-circle" alt="Cinque Terre" width="40" height="40" style={{ marginRight: "14px" }} />
                     Cyber Threats {" "}
                      <i className="tim-icons icon-minimal-down" />
                    </a>
                  </CardHeader>
                  <Collapse
                    role="tabpanel"
                    isOpen={this.state.openedCollapses.includes(
                      "threatAlerts"
                    )}
                  >
                    <CardBody>
                      {threatAlerts}

                    </CardBody>
                  </Collapse>
                </Card>
              </Card>

            </Col>
          </Row>


        </div>
      </>
    );
  }
}

export default alertmanagement;


