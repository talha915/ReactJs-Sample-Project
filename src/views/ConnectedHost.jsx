
import React from "react";
// react plugin for creating notifications over the dashboard
import './custom/view.css';

import Moment from 'react-moment';
import 'moment-timezone';

import {

  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,

} from "reactstrap";

import { withRouter } from 'react-router'



class connectedhost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: "",
      requestFetched: ''
    }
  }

  osWindows = [];
  osUnknown = [];
  osAndroid = [];
  osLinux = [];
  osApple = [];

  time;

  componentDidMount = async () => {
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
    const data = await fetch('https://enterprise.gydpost.com/get/cnctdhost', settings)
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

  selectedHost = async (e) => {
    console.log("Event Form .....", e);

    let requireData = JSON.stringify({
      "namespace": "edm2019",

      // "data": {e}
      "data": { "macaddress": e }
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
        this.setState({ requestFetched: json });
        console.log("Response Got: ", this.state.requestFetched);
        this.props.history.push({ pathname: '/admin/hostprofile', apiResult: e });
        return json;
      })
      .catch(e => {
        return e
      });

    return data;
  }

  sortName = () => {
    console.log("Sort By Name");
    let temp;
    let myFakeData = this.state.fetchedData && this.state.fetchedData;
    for (var i = 0; i < this.state.fetchedData.length; i++) {
      for (var j = i + 1; j < this.state.fetchedData.length; j++) {
        if (myFakeData[i].hostname > myFakeData[j].hostname) {
          temp = myFakeData[i];
          myFakeData[i] = myFakeData[j];
          myFakeData[j] = temp;
        }
      }
    }
    this.setState({ fetchedData: myFakeData });
  }

  timeSort = () => {
    let temp;
    let myFakeData = this.state.fetchedData && this.state.fetchedData;
    for (var i = 0; i < this.state.fetchedData.length; i++) {
      for (var j = i + 1; j < this.state.fetchedData.length; j++) {
        if (myFakeData[i].ip > myFakeData[j].ip) {
          temp = myFakeData[i];
          myFakeData[i] = myFakeData[j];
          myFakeData[j] = temp;
        }
      }
    }
    this.setState({ fetchedData: myFakeData });
  }

  render() {
    console.log("Fetched: ", this.state.fetchedData);

    const myArray = this.state.fetchedData && this.state.fetchedData.map((data, index) => {
      if (data.OS == "Microsoft Windows Kernel 6.x" || data.OS == "Windows 10" || data.OS == "Windows OS") {
        this.osWindows.push(data.OS);
      }
      if (data.OS == "Unknown") {
        this.osUnknown.push(data.OS);
      }
      if (data.OS == "Android OS") {
        this.osAndroid.push(data.OS);
      }
      if (data.OS == "Debian-based Linux") {
        this.osLinux.push(data.OS);
      }
      if (data.OS == "Apple OS") {
        this.osApple.push(data.OS);
        console.log("dEVICES aPPLE: ", this.osApple.length && this.osApple.length);
      }

    });

    const rightCards = this.state.fetchedData && this.state.fetchedData.map((postDetail, index) => {
      return (

        <Col md="4" key={Math.random()}>
          <Card onClick={() => this.selectedHost(postDetail.macaddress)}>
            <CardHeader>
              <CardTitle>

                <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }} >
                  <img src="/profile.png" className="rounded-circle" alt="Cinque Terre" width="50" height="50" />

                  {postDetail.hostname}</h6>

              </CardTitle>
            </CardHeader>
            <CardBody>

              <div className="row">
                <div className="col-6">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-right"> IP: {postDetail.ip}</span>
                </div>
                <div className="col-6">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-left"> OS: {postDetail.OS}</span>
                </div>
                <div className="col-12">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-left"> Category: {postDetail.device_category}</span>
                </div>

                <div className="col-12">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-left"> Acquisition date: {postDetail.acquisition_date}</span>
                </div>
                <div className="col-12">
                  <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />
                  <span className="text-left"> Data classification: {postDetail.data_classification}</span>
                </div>

                <div className="col-3 offset-7">
                  <span><Moment format="YYYY/MM/DD">{postDetail.eve_sec}</Moment></span>
                </div>
                <div className="col-2">
                  <img src="/Group 366.svg" style={{ cursor: "pointer" }} />
                </div>
              </div>

            </CardBody>
          </Card>
        </Col>
      );
    })
    return (
      <>
        <div className="content">
          <Row>

            <Col xs="2" align="middle" onClick={this.routeConnectedHost}>
              <Row>
                <Col align="middle" >
                  <img src="/638.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <b>Windows OS:{this.osWindows && this.osWindows.length}</b>
                </Col>
              </Row>
            </Col>

            <Col xs="2" >
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <img src="/640.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <b>Android OS: {this.osAndroid && this.osAndroid.length}</b>
                </Col>
              </Row>
            </Col>
            <Col xs="2" >
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <img src="/637.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <b>Apple OS: {this.osApple && this.osApple.length}</b>
                </Col>
              </Row>
            </Col>
            <Col xs="2" >
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <img src="/641.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <b>Linux OS: {this.osLinux && this.osLinux.length}</b>
                </Col>
              </Row>
            </Col>
            <Col xs="2" >
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <img src="/642.png" width="50" height="50"></img>
                </Col>
              </Row>
              <Row>
                <Col align="middle" onClick={this.routeConnectedHost}>
                  <b>Others OS: {this.osUnknown && this.osUnknown.length}</b>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="container">
            <Col sm={{ offset: 10, size: 2 }}>
              <select className="select-button" onClick={this.timeSort}>
                <option value="timeSort">
                  Sort by: IP
              </option>
              </select>
            </Col>
            <Col sm={{ offset: 10, size: 2 }}>
              <select className="select-button" onClick={this.sortName}>
                <option value="nameSort">
                  Sort by: Name
                </option>
              </select>
            </Col>
          </Row>


          <Row>

            {rightCards}

          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(connectedhost);



