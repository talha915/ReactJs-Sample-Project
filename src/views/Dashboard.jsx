

import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
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
import './custom/view.css';

//////////////////////////////////////////////////pie chart /////////////////////////////////

import { withRouter } from 'react-router';

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

let eveSec = [];
let protocol = [];
let receivedProtocol = [];
let totalProtocol = [];
let protocolLabels = [];
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
                    label: "Host Names",
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
            backgroundColor: "#66cef5",
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

let pieData;
let pieConnected;
let pieGeo;
let pieAlerts;
let pieThreat;
let pieTotal = [];
let rcv_send_pie = [];
console.log("Data: ", pieConnected && pieConnected, pieGeo && pieGeo, pieAlerts && pieAlerts, pieAlerts && pieAlerts)
const data = {
    labels: [
        'Connected host alerts',
        'Geo location alerts',
        'protocol alerts',
        'threats alerts',
    ],
    datasets: [{
        // data: [25, 50, 100,10],
        data: pieTotal && pieTotal,
        backgroundColor: [
            '#CCEEFB',
            '#66cef5',
            '#00AEEF',
            '#00688f'
        ],
        hoverBackgroundColor: [
            '#CCEEFB',
            '#66cef5',
            '#00AEEF',
            '#00688f'
        ]
    }]
};

const data1 = {
    labels: [
        'Total Received',
        'Total Sent'
    ],
    datasets: [{
        // data: [25, 50, 100,10],
        data: rcv_send_pie && rcv_send_pie,
        backgroundColor: [
            '#00AEEF',
            '#CCEEFB',
        ],
        hoverBackgroundColor: [
            '#00AEEF',
            '#CCEEFB'
        ]
    }]
};


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1",
            fetchedData: ""
        };
    }

    osWindows = [];
    osUnknown = [];
    osAndroid = [];
    osLinux = [];
    osApple = [];
    eveSec = [];
    setBgChartData = name => {
        this.setState({
            bigChartData: name
        });
    };

    protocolUsage = () => {
        protocol = [];
        console.log("Protocol.........>>>:", this.protocol);
        for (var i = 0; i < protocol.length; i++) {
            protocol.pop();
        }
        console.log("Protocol.........>>>:", protocol);
        if (this.state.fetchedData.protocol_usage && this.state.fetchedData.protocol_usage) {
            console.log("Protocol: ", this.state.fetchedData.protocol_usage);
            //protocol = this.state.fetchedData.protocol_usage;
            var test = [];

            // for (var i = 0; i < this.state.fetchedData.protocol_usage.length; i++) {
            //     protocolLabels.push(this.state.fetchedData.protocol_usage[i].protocol);

            //     console.log("Begin");
            //     protocol.push(this.state.fetchedData.protocol_usage[i].sent);

            //     receivedProtocol.push(this.state.fetchedData.protocol_usage[i].rcvd);

            //     // protocolLabels.push(this.state.fetchedData.protocol_usage[i].protocol);
            //     totalProtocol.push(this.state.fetchedData.protocol_usage[i].total);

            // }


            for (var i = 0; i < this.state.fetchedData.protocol_usage.length; i++) {

                protocolLabels.push(this.state.fetchedData.protocol_usage[i].protocol);
                let usageMb;
                usageMb = this.state.fetchedData.protocol_usage[i].total;
                console.log("data in usage MB : ", usageMb);
                usageMb = Number(usageMb);
                console.log("nuber to string : ", usageMb);

                usageMb = usageMb / 1024;
                console.log("convert to kb : ", usageMb);
                usageMb = usageMb.toString()
                console.log("string to number: ", usageMb);


                totalProtocol.push(usageMb);


            }
            console.log("Now Protocol: ", protocol);
            console.log("Test", test);
        }

        if (this.state.fetchedData.percentage && this.state.fetchedData.percentage) {
            console.log("this.state.state", this.state.fetchedData.percentage);
            rcv_send_pie.push(this.state.fetchedData.percentage.rcvd_percent);
            rcv_send_pie.push(this.state.fetchedData.percentage.sent_percent);
            pieData = this.state.fetchedData.percentage;
            pieConnected = this.state.fetchedData.percentage && this.state.fetchedData.percentage.connected_host_percent;
            pieGeo = this.state.fetchedData.percentage && this.state.fetchedData.percentage.geo_location_percent;
            pieAlerts = this.state.fetchedData.percentage && this.state.fetchedData.percentage.ntop_alerts_percent;
            pieThreat = this.state.fetchedData.percentage && this.state.fetchedData.percentage.threat_alerts_percent;

            pieTotal.push(pieConnected);
            pieTotal.push(pieGeo);
            pieTotal.push(pieAlerts);
            pieTotal.push(pieThreat);


        }
    }

    routeConnectedHost = () => {
        this.props.history.push('/admin/connected-host');
    }

    threatManagement = () => {
        this.props.history.push('/admin/cyber-threats');
    }


    alertManagement = () => {
        this.props.history.push('/admin/alert-management');
    }

    protocolNetwork = () => {
        this.props.history.push('/admin/protocol-usage');
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

        const data = await fetch('https://enterprise.gydpost.com/update/dashboard', settings)
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
        console.log("Fetched: ", this.state.fetchedData.percentage);
        pieData = this.state.fetchedData.percentage && this.state.fetchedData.percentage;
        pieConnected = this.state.fetchedData.percentage && this.state.fetchedData.percentage.connected_host_percent;
        pieGeo = this.state.fetchedData.percentage && this.state.fetchedData.percentage.geo_location_percent;
        pieAlerts = this.state.fetchedData.percentage && this.state.fetchedData.percentage.ntop_alerts_percent;
        pieThreat = this.state.fetchedData.percentage && this.state.fetchedData.percentage.threat_alerts_percent;

        console.log("Pie Data: ", pieData);
        const myArray = this.state.fetchedData.connected_devices && this.state.fetchedData.connected_devices.map((data, index) => {
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
            return (
                <CardBody key={Math.random()} style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>
                    <div className="table-full-width table-responsive">
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="title" style={{ fontSize: "15px" }}>{data.hostname}</p>
                                        <p className="text" style={{ fontSize: "15px" }}>
                                            IP: {data.ip}
                                        </p>
                                        <p className="text" style={{ fontSize: "15px" }}>
                                            Device Category: {data.device_category}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </CardBody>

            );
        });
        const myAlerts = this.state.fetchedData.alerts && this.state.fetchedData.alerts.map((data, index) => {
            this.eveSec.push(data.eve_sec);
            return (
                <CardBody key={Math.random()} style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>
                    <div className="table-full-width table-responsive">
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="title" style={{ fontSize: "15px" }}>HOST NAME: {data.hostname}</p>
                                        <p className="text">
                                            Alert type: {data.input_src}
                                        </p>
                                        <p className="text" style={{ fontSize: "15px" }}>
                                            Description: {data.description}
                                        </p>
                                        <p className="text" style={{ fontSize: "15px" }}>
                                            Device Category: {data.device_category}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </CardBody>

            );
        });
        const mythreats = this.state.fetchedData.threats && this.state.fetchedData.threats.map((data, index) => {
            this.eveSec.push(data.eve_sec);
            return (
                <CardBody key={Math.random()} style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>
                    <div className="table-full-width table-responsive">
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="title" style={{ fontSize: "15px" }}>{data.name}</p>

                                        <p className="text" style={{ fontSize: "15px" }} >
                                            {data.description}
                                        </p>

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
                    <Row>
                        <Col md="12">
                            <Card style={{ paddingBottom: "20px" }} style={{ fontSize: "16px", fontWeight: "bold" }} >
                                <CardHeader style={{ paddingBottom: "20px" }} style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>CONNECTED DEVICES</CardHeader>
                                <Row>


                                    <Col xs="2" adding-bottom="20%" >
                                        <Row>
                                            <Col align="middle">
                                                <img src="/638.png" width="50" height="50"></img>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col align="middle">
                                                <b>Windows OS:{this.osWindows && this.osWindows.length}</b>
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
                                                <b>Android OS: {this.osAndroid && this.osAndroid.length}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="2" >
                                        <Row>
                                            <Col align="middle">
                                                <img src="/637.png" width="50" height="50"></img>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col align="middle">
                                                <b>Apple OS: {this.osApple && this.osApple.length}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="2" >
                                        <Row>
                                            <Col align="middle">
                                                <img src="/641.png" width="50" height="50"></img>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col align="middle">
                                                <b>Linux OS: {this.osLinux && this.osLinux.length}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="2" >
                                        <Row>
                                            <Col align="middle">
                                                <img src="/642.png" width="50" height="50"></img>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col align="middle">
                                                <b>Others OS: {this.osUnknown && this.osUnknown.length}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>

                        </Col>
                    </Row>

                    <Row>

                        <Col lg="6" md="12">
                            <Card className="card-tasks" style={{ height: "400px", cursor: "pointer" }}onClick={this.routeConnectedHost}>
                                <CardHeader>
                                    <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff', cursor: "pointer" }}>Connected Host</h6>
                                    <p className="card-category d-inline"> </p>
                                </CardHeader>
                                {myArray}
                            </Card>
                        </Col>

                        <Col lg="6" md="12">
                            <Card className="card-tasks" style={{ height: "400px", cursor: "pointer" }} onClick={this.threatManagement}>
                                <CardHeader>
                                    <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff', cursor: "pointer" }}>CYBER THREATS</h6>
                                    <p className="card-category d-inline"></p>

                                </CardHeader>
                                {mythreats}
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="6" md="12">

                            <Card className="card-chart" style={{ height: "400px" }}>

                                <CardHeader>
                                    <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Total Alerts </h6>
                                    <p className="card-category d-inline"> </p>

                                </CardHeader>
                                <CardBody style={{ padding: "10px 20px 0 10px", textAlign: "justify" }}>
                                    <div className="chart-area   card-fixed-height1   " style={{ paddingTop: "50px" }}>
                                        <Pie data={data} height={200} width={400} options={options} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg="6" md="12">
                            <Card className="card-tasks" style={{ height: "400px", cursor: "pointer" }} onClick={this.alertManagement}>
                                <CardHeader>
                                    <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff', cursor: "pointer" }}>Alerts Management</h6>
                                    <p className="card-category d-inline"> </p>

                                </CardHeader>
                                {myAlerts}
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="8">
                            <Card className="card-chart" style={{ cursor: "pointer" }} onClick={this.protocolNetwork}>

                                <CardHeader>
                                    <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff', cursor: "pointer" }}>Network Protocol</h6>
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
                        <Col md="4">

                            <Card className="card-chart">

                                <CardHeader>
                                    <h6 className="title d-inline" style={{ fontSize: "16px", fontWeight: "bold", color: '#00aeff' }}>Network Protocol Usage</h6>
                                    <p className="card-category d-inline"> </p>
                                    <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                                        {"Recevied and Sent  "}
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area ">
                                        <Pie data={data1} height={150} width={250} options={options} />
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

export default withRouter(Dashboard);