
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import './custom/icon.css';
// reactstrap components
import { Card, CardHeader, CardFooter, Badge, Nav, NavLink, NavItem, CardTitle, CardBody, Row, Col, Input, Table, } from "reactstrap";
import { Button } from 'reactstrap';
import './custom/view.css';
import { withRouter } from 'react-router'

import Moment from 'react-moment';
import 'moment-timezone';
import { type } from "os";

class threatmanagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchedData: '',
      fetchedDataSearch: '',
      selectedCounrty: '',
      selectedIndustry: ''
    }
  }
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



    const data = await fetch('https://enterprise.gydpost.com/get/otx/threats', settings)
      .then(response => response.json())
      .then(json => {
        this.setState({ fetchedData: json });
        return json;
      })
      .catch(e => {
        return e
      });
    // console.log(type(data.references));
    return data;
  }
  mySearch = async () => {
    let requireData = JSON.stringify({
      "namespace": "edm2019",
      "country": this.state.selectCountry,
      "industry": this.state.selectIndustry
    });


    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requireData
    };


    // debugger;

    //   const data = await fetch('https://enterprise.gydpost.com/get/allthreats', settings)
    //     .then(response => response.json())
    //     .then(json => {
    //       this.setState({fetchedDataSearch: json});

    //       alert(this.state.fetchedDataSearch && this.state.fetchedDataSearch.message)

    //       this.props.history.push('/threat-management');

    //       return json;
    //     })
    //     .catch(e => {
    //       return e
    //     });
    //     // this.props.history.push('/threat-management');
    //   return data;
    // }

    const data = await fetch('https://enterprise.gydpost.com/get/allthreats', settings)
      .then(json => {

        // alert(this.state.fetchedDataSearch && this.state.fetchedDataSearch.message)

        return json;
      })
      .then(function (response) {
        console.log("############");
        console.log(response.status);
        console.log("############");

        if (response.status != 200) {
          alert("Please pass valid arguments");
          console.log("", response.statusText);
          this.props.history.push('/threat-management');
        }
        else {
          console.log("Going to refresh this page!");
          window.location.reload();
          // this.props.history.push('/threat-management');
        }
      })
      .then()
      .catch(e => {
        return e
      });
    // console.log(type(data.references));
    // this.props.history.push('/threat-management');
    return data;
  }

  selectCountry = (e) => {
    console.log("Selected Country: ", e.target.value);
    this.setState({ selectCountry: e.target.value });
  }

  selectIndustry = (e) => {
    console.log("Selected Industry: ", e.target.value);
    this.setState({ selectIndustry: e.target.value });
  }

  render() {
    console.log("fetchedDataSearch", this.state.fetchedDataSearch);
    // console.log("fetchedDataSearch", this.state.fetchedDataSearch.statusText);
    console.log("Fetched From Search: ", this.state.fetchedDataSearch && this.state.fetchedDataSearch);
    console.log("Fetched Data: ", this.state.fetchedData && this.state.fetchedData);

    const threatArray = this.state.fetchedData && this.state.fetchedData.map((data, index) => {
      return (

        <Card>
          <CardHeader>
            <CardTitle style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>

              <b style={{ color: '#00aeff' }} >
                <img src="/threat.png" className="rounded-circle" alt="Cinque Terre" width="50" height="50" />
                <span className="title" style={{ fontSize: "16px", color: "#00aeff", paddingLeft: "15px", fontWeight: "bold", }}
                >   {data.name}</span>

              </b>

            </CardTitle>
          </CardHeader>
          {/* <CardBody key={Math.random()} style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>
        <div className="table-full-width table-responsive">
          <Table>
            <tbody>
              <tr>
                <td>
               
                      <p className="text">
                      
                      </p>
                     
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CardBody>
      <CardBody> */}
          <CardBody >
            <div className="row">
              <div className="col-12">

                <p className="left" style={{ fontSize: "15px" }} >   {data.description}</p>

              </div>
              <div className="col-12" style={{ marginTop: '20px' }} >

                <p className="text-left" style={{ fontSize: "15px" }} >Tags: {'' + data.tags} </p>

              </div >

              <Nav className="justify-content-right">
                <NavItem>
                  {/* <NavLink href={data.references}  style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>
                  
                  
                  References</NavLink> */}
                  <NavLink style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>References</NavLink>
                  <NavLink href={data.references[0]} style={{ fontSize: "15px", color: '#00aeff', marginTop: "-17px" }}>{data.references[0]}</NavLink>
                  <NavLink href={data.references[1]} style={{ fontSize: "15px", color: '#00aeff', marginTop: "-17px" }}>{data.references[1]}</NavLink>
                  <NavLink href={data.references[2]} style={{ fontSize: "15px", color: '#00aeff', marginTop: "-17px" }}>{data.references[2]}</NavLink>
                </NavItem>
              </Nav>


            </div>

          </CardBody>

          <CardFooter>


            <div className="col-4 offset-9">

              <i style={{ color: '#00aeff' }} className={"tim-icons " + "icon-laptop"} />

              <span>

                <Moment>{data.creation_date}</Moment>
              </span>
            </div>
          </CardFooter>
        </Card>
      );
    })
    return (
      <>
        <div className="content">
          <Card className="top-card">
            <Row>
              <Col sm={12} className="text-center" style={{ fontSize: "16px", fontWeight: "bold", color: 'white' }}>
                CYBER THREATS
              </Col>
            </Row>
          </Card>

          <Card className="second-card">
            <Row>
              <Col sm="3">
                {/* <Button color="success">My Preferences</Button>{' '} */}
              </Col>
              <Col sm="3">
                <select className="selected-button" onClick={this.selectCountry}>
                  <option value=" Country">
                    Country
                  </option>
                  <option value="Australia">
                    Australia
                  </option>
                  <option value="Canada">
                    Canada
                  </option>
                  <option value="China">
                    China
                  </option>
                  <option value="Germany">
                    Germany
                  </option>
                  <option value="Iran">
                    Iran
                  </option>
                  <option value="India">
                    India
                  </option>
                  <option value="Pakistan">
                    Pakistan
                  </option>
                  <option value="Russia">
                    Russia
                  </option>
                </select>
              </Col>

              <Col sm="3">
                <select className="selected-button" onClick={this.selectIndustry}>
                  <option value="0">
                    Industry
                  </option>
                  {/* <option value="Government">
                    Government
                  </option> */}


                  <option value="Agriculture">
                    Agriculture
                  </option>
                  <option value="Chemical">
                    Chemical
                  </option>
                  <option value="Defense">
                    Defense
                  </option>
                  <option value="Education">
                    Education
                  </option>
                  <option value="Energy">
                    Energy
                  </option>
                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Healthcare">
                    Healthcare
                  </option>
                  <option value="Manufacturing">
                    Manufacturing
                  </option>
                  <option value="Media">
                    Media
                  </option>
                  <option value="Retail">
                    Retail
                  </option>
                  <option value="Technology">
                    Technology
                  </option>
                  <option value="Telecommunications">
                    Telecommunications
                  </option>
                </select>
              </Col>

              <Col sm="3">
                <Button color="success" className="animation-on-hover" onClick={this.mySearch}>
                  Search
               </Button>{' '}

                {/* <Button color="success" onClick={this.mySearch}>Search</Button> */}
                {/* <input className="selected-button" type="text" name="search" placeholder="Search"/> */}
              </Col>
            </Row>
          </Card>

          <Row>
            {threatArray}

          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(threatmanagement);

