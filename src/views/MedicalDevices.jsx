
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from "react";
// react plugin for creating notifications over the dashboard
import './custom/view.css';
import Moment from 'react-moment';
import 'moment-timezone';

// reactstrap components
import {
  Alert,
  Table,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
class MedicalDevices extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchedData: "",
      vuln_data: "",
      globalIndex: '',
      selectedData: ''
    }
    this.state = {
      modalDemo: false,
    };
    this.toggleModalDemo = this.toggleModalDemo.bind(this);
  }
  globalIndex;
  toggleModalDemo(index) {
    console.log("index: ", index);
    this.globalIndex = index;
    console.log("Selected Data: ", this.state.fetchedData && this.state.fetchedData[index]);
    this.setState({ selectedData: this.state.fetchedData && this.state.fetchedData[index] });
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
    const detailData = this.state.fetchedData && this.state.fetchedData.map((data, index) => {

      return (
        <CardBody key={Math.random()}>
          <div className="table-full-width table-responsive">
            <p className="text-muted">
              {data.deviceName}
              {data.deviceId}
              {data.dunsNumber}
              {data.catalogNumber}
              {data.deviceCount}
              {data.deviceDescription}
              {data.phone}
              {data.email}
              {data.gmdnPTName}
              {data.gmdnPTDefinition}
              {data.productCodeName}
              {data.productCode}

            </p>
          </div>
        </CardBody>

      );
    });

    const rightCards = this.state.fetchedData && this.state.fetchedData.map((postDetail, index) => {
      return (

        <Col md="6" key={Math.random()}>
          <Card onClick={this.profiledata} style={{ cursor: "pointer" }} >
            <CardHeader>

         



              <CardTitle>

              <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }} >
                  <img src="/profile.png" className="rounded-circle" alt="Cinque Terre" width="50" height="50" />

                  {postDetail.deviceName}</h6>

              </CardTitle>
            </CardHeader>
            <CardBody>

              <div className="row">
                <div className="col-12">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-right"> IP: {postDetail.ip}</span>
                </div>
                <div className="col-12">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-left">Device Name: {postDetail.deviceName}</span>
                </div>
                <div className="col-12">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-left">Company Name: {postDetail.companyName}</span>
                </div>
              </div>
              <div className="col-3 offset-9">
                  <span><Moment>{postDetail.eve_sec}</Moment></span>
                </div>
            


              <Button color="success" onClick={(e) => this.toggleModalDemo(index)}>
                 Details
                 </Button>
              <Modal isOpen={this.state.modalDemo} toggle={this.toggleModalDemo}>

                <ModalBody>
                  <Card>
                    <Row>
                      <Col sm={12} md={12}>
                        <b >Brand Name: </b> {this.state.selectedData && this.state.selectedData.brandName}
                      </Col>
                      <Col sm={12} md={12}>
                        <b>Company Name:</b> {this.state.selectedData && this.state.selectedData.companyName}
                      </Col>
                      <Col sm={12} md={12}>
                        <b>Device Description: </b> {this.state.selectedData && this.state.selectedData.deviceDescription}
                      </Col>
                      <Col sm={12} md={12}>
                        <b> Device Name:</b>  {this.state.selectedData && this.state.selectedData.deviceName}
                      </Col>
                      <Col sm={12} md={12}>
                        <b>  Email:</b>  {this.state.selectedData && this.state.selectedData.email}
                      </Col>
                      <Col sm={12} md={12}>
                        <b> IP:</b>  {this.state.selectedData && this.state.selectedData.ip}
                      </Col>
                      <Col sm={12} md={12}>
                        <b> phone:</b>  {this.state.selectedData && this.state.selectedData.phone}
                      </Col>
                      <Col sm={12} md={12}>
                        <b> Product Name:</b>  {this.state.selectedData && this.state.selectedData.productCodeName}
                      </Col>
                    </Row>
                  </Card>

                </ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={this.toggleModalDemo}>
                    Close
                    </Button>
                  {/* <Button color="warning">
                      Dont Allow
                    </Button> */}
                </ModalFooter>
              </Modal>
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
              <Col sm={12} className="text-center" style={{ fontSize: "16px", fontWeight: "bold", color: 'white' }}>
                Medical Devices
              </Col>
            </Row>
          </Card>

          {/* <Row className="container">
            <Col sm={{ offset: 10, size: 2 }}>
              <select className="select-button">
                <option>
                  Sort by: Time
              </option>
              </select>
            </Col>

          </Row> */}
          <Row>
            {rightCards}
          </Row>
        </div>
      </>
    );
  }
}

export default MedicalDevices;

