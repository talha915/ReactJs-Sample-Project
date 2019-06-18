import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,

  Row,
  Col,

  UncontrolledTooltip,
} from "reactstrap";

let eveSec = [];
let protocol = [];
let receivedProtocol = [];
let totalProtocol = [];
let protocolLabels = [];

let host = [];
let totalhost = [];
let protocolLabels1 = [];


let chartExample5 = {
  data: canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    console.log("Chart data: ", protocol);
    return {
      labels: protocolLabels && protocolLabels,
      datasets: [
        {
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#00AEEF",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: totalProtocol && totalProtocol
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

//////////////////////
let chartExample6 = {
  data: canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    console.log("host data: ", host);
    return {
      labels: protocolLabels1 && protocolLabels1,
      datasets: [
        {
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#00AEEF",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: totalhost && totalhost
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

////////////////////////


class ProtocolUsage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      fetchedData: ""
    };
  }

  ////////////////////////////////////bar1//////////////////
  protocolUsage = () => {

    console.log("Protocol1.........>>>:", this.protocol);
    for (var i = 0; i < protocol.length; i++) {
      protocol.pop();
    }
    console.log("Protocol2.........>>>:", protocol);
    if (this.state.fetchedData.protocol_usage && this.state.fetchedData.protocol_usage) {
      console.log("Protocol: ", this.state.fetchedData.protocol_usage);
      for (var i = 0; i < this.state.fetchedData.protocol_usage.length; i++) {
        protocolLabels.push(this.state.fetchedData.protocol_usage[i].protocol);
        totalProtocol.push(this.state.fetchedData.protocol_usage[i].total);
      }
      console.log("Protocol3: ", protocol);

    }


  }

  ////////////////////////////////////bar2///////////////


  hostUsage = () => {

    console.log("hostProtocol.........>>>:", this.host);
    for (var i = 0; i < host.length; i++) {
      host.pop();
    }
    console.log("hostProtocol.........>>>:", host);
    if (this.state.fetchedData.host_usage && this.state.fetchedData.host_usage) {
      console.log("hostProtocol: ", this.state.fetchedData.host_usage);
      //protocol =  this.state.fetchedData.protocol_usage;
      var test = [];

      for (var i = 0; i < this.state.fetchedData.host_usage.length; i++) {
        protocolLabels1.push(this.state.fetchedData.host_usage[i].name);
        console.log("Begin1");

        totalhost.push(this.state.fetchedData.protocol_usage[i].total);
      }
      console.log("now host: ", host);
      console.log("Test1", test);
    }
  }
  /////////////////////////////////////bar3///////////////

  componentDidMount = async () => {
    let requireData = JSON.stringify({

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



    const data = await fetch('https://enterprise.gydpost.com/get/ntop/usage', settings)
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


  render() {
    this.protocolUsage();

    this.hostUsage();

    return (
      <>
        <div className="content">
          <Row>
            <Card className="top-card">
              <Row>
                <Col Col sm={12} className="text-center" style={{ fontSize: "16px", fontWeight: "bold", color: 'white' }}>
                  Network Usage
              </Col>
              </Row>
            </Card>
            <Col lg="12">
              <Card className="card-chart">


                <CardHeader>
                  <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Network Protocol Usage</h6>
                  <p className="card-category d-inline"> </p>
                  <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                    {"Total MBs "}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample5.data}
                      options={chartExample5.options}
                    />

                  </div>
                </CardBody>
              </Card>
            </Col>

          </Row>
          <Row>
            <Col lg="12">
              <Card className="card-chart">

                <CardHeader>
                  <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Network Data Usage</h6>
                  <p className="card-category d-inline"> </p>
                  <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                    {"Total MBs "}
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample6.data}
                      options={chartExample6.options}
                    />

                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </>
    );
  }
}

export default ProtocolUsage;


