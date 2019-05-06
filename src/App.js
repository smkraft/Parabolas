import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NumericInput from 'react-numeric-input';

class App extends React.Component {
	render() {
		return (
      <div className="App">
        <div className="app-parabola">
          <Parabola />
        </div>
			</div>
		);
	}
}

var data = {
	labels: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	datasets: [
		{
			label: "Parabola point",
			fillColor: "rgba(200,50,200,0.2)",
			strokeColor: "rgba(200,50,200,1)",
			pointColor: "rgba(200,50,200,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(200,50,200,1)",
			data: [21 * 0]
		}
		/*
		,
		{
			label: "First difference",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [21 * 0]
		}
		*/
	]
};

class Parabola extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			a : 1.0,
			b : 0.0,
			c : 0.0,
			standard : "y = x^2",
			graph : "y = (x)^2",
			xroots : [0, 0],
			numxroots : 1,
			roottxt : "One root at [0,0], this is the vertex",
			vxN : 0,
			vx: 0,
			vy : 0,
			recursivetxt : "",
			firstTime : true,
		};

   	this.solve();

	};

	setNotFirstTime() {
		if (this.state.firstTime) {
			this.setState({
				firstTime: false
			});
		}
	};

	changeA(valueAsNumber) {
		this.setNotFirstTime();
		this.setState({
			a: valueAsNumber
		}, () => {
    	this.solve();
		});
	};

	changeB(valueAsNumber) {
		this.setNotFirstTime();
		this.setState({
			b: valueAsNumber
		}, () => {
    	this.solve();
		});
	};

	changeC(valueAsNumber) {
		this.setNotFirstTime();
		this.setState({
			c: valueAsNumber
		}, () => {
    	this.solve();
		});
	};

	solve() {
		if (this.state.a == 0 || this.state.a == null) {
			this.setState({
				standard: "Not a parabola!!",
				graph: "",
				roottxt: "",
				vx: null,
				vy: null,
			});

			return;
		}

		/* Write the standard equation. */
		var std;
		std = "y = ";
		if (this.state.a < 0) {
			std += "-";
		}
		else {
		}
		if (Math.abs(this.state.a) != 1.0) {
			std += Math.abs(this.state.a);
		}
		std += "x^2 ";
		if (this.state.b == 0 || this.state.b == null) {
		}
		else {
			if (this.state.b < 0) {
				std += "- ";
			}
			else {
				std += "+ "
			}
			if (Math.abs(this.state.b) != 1.0) {
				std += Math.abs(this.state.b);
			}
			std += "x ";
		}

		if (this.state.c == 0) {
		}
		else if (this.state.c <= 0) {
			std += "- " + Math.abs(this.state.c);
		}
		else {
			std += "+ " + this.state.c;
		}

		this.setState({
			standard: std
		});

		/* Solve for the X roots. */
		var radicand = this.state.b * this.state.b - 4 * this.state.a * this.state.c;

		var nx;
		var root1, root2;

		if (radicand < 0) {
			nx = 0;
		}
		else if (radicand == 0) {
			nx = 1;
			root1 = -this.state.b / (2 * this.state.a);
		}
		else {
			nx = 2;
			root1 = (-this.state.b - Math.sqrt(radicand)) / (2 * this.state.a);
			root2 = (-this.state.b + Math.sqrt(radicand)) / (2 * this.state.a);
		}

		var roottxt = "";
		if (nx == 0) {
			if (this.state.c >= 0) {
				roottxt = "No roots (a > 0 and c > 0 and y of vertex > 0)";
			}
			else {
				roottxt = "No roots (a < 0 and c < 0 and y of vertex < 0)";
			}
		}
		else if (nx == 1) {
			roottxt = "One root at [" + root1 + ", 0], this is the vertex";
		}
		else {
			roottxt = "Roots at [" + root1 + ", 0] and [" + root2 + ", 0]";
		}

		this.setState({
			numxroots: nx,
			root1: root1,
			root2: root2,
			roottxt: roottxt
		});

	/* Solve the vertex equation. */
	var vxN, vy;
	vxN = this.state.b / (2 * this.state.a);
	vy = this.state.c - (this.state.b * this.state.b) / (4 * this.state.a);

	/* Write the graph equation. */
	var graph = "y = ";
	if (this.state.a < 0) {
		graph += "-";
	}
	else {
	}
	if (Math.abs(this.state.a) != 1.0) {
		graph += Math.abs(this.state.a);
	}
	graph += "(x";
	if (vxN == 0) {
	}
	else if (vxN < 0) {
		graph += " - " + Math.abs(vxN);
	}
	else {
		graph += " + " + vxN;
	}
	graph += ")^2 ";

	if (vxN == 0) {
	}
	else if (vy <= 0) {
		graph += "- " + Math.abs(vy);
	}
	else {
		graph += "+ " + vy;
	}

	this.setState({
		graph: graph,
		vxN: vxN,
		vx: -vxN,
		vy: vy
	});

	var secondDiff = 2 * this.state.a;
	/* Use Y intercept for point. */
	var y0 = this.state.c;
	var y1 = this.state.a * 1 * 1 + this.state.b * 1 + this.state.c;
	var diffAtX0 = y1 - y0;

	/* Equation is:
		y(x) = y(x - 1) + secondDiff * x + y(x=0)
	*/
	var recursivetxt = "y(x) = y(x-1) ";
	if (secondDiff > 0.0) {
		recursivetxt += "+ ";
	}
	else {
		recursivetxt += "- ";
	}

	if (Math.abs(secondDiff) != 1.0) {
		recursivetxt += Math.abs(secondDiff);
	}

	recursivetxt += "x ";

	if (diffAtX0 > 0.0) {
		recursivetxt += "- " + Math.abs(diffAtX0);
	}
	else {
		recursivetxt += "+ " + Math.abs(diffAtX0);
	}

	this.setState({
		recursivetxt: recursivetxt,
	});


	var index;
	var count = 0;
	for (index = -vxN - 10; index <= -vxN + 10; index++, count++) {
		data.labels[count] = index;
		data.datasets[0].data[count] = this.state.a * index * index + this.state.b * index + this.state.c;
		//data.datasets[1].data[count] = 2 * this.state.a * index + this.state.b;
	}

	};

	render() {
		return (
			<div className="Parabola">
				<div className="app-intro">
					<Intro firstTime={this.state.firstTime}/>
				</div>
				<div className="app-entry">
					<Entry
						a={this.state.a} onChangeA={this.changeA.bind(this)}
						b={this.state.b} onChangeB={this.changeB.bind(this)}
						c={this.state.c} onChangeC={this.changeC.bind(this)}
					/>
				</div>
				<Container fluid={true}>
					<Row>
						<Col md="auto">
							<div className="app-solution">
								<Solution
									std={this.state.standard}
									a={this.state.a}
									b={this.state.b}
									c={this.state.c}
									rt={this.state.roottxt}
									g={this.state.graph}
									vx={this.state.vx}
									vy={this.state.vy}
									curt={this.state.recursivetxt}
								/>
							</div>
						</Col>
						<Col>
							<div className="app-graph">
								<Graph />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
};

class Intro extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
  }

  render() {
    const handleHide = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    return (
      <>
				<Container fluid={true}>
				<Row>
				<Col md="auto">
	  		<h2>Parabolas!</h2>
				</Col>
				<Col>
        {!this.state.show && <Button onClick={handleShow} variant="outline-success">Reopen welcome message</Button>}
				</Col>
				</Row>

				</Container>

        <Alert show={this.state.show} variant="success">
          <Alert.Heading>Hi Ally, Aviva, Casey, and Emma !</Alert.Heading>
          <p>
						We were talking after math night at Casey's last Thursday about what kinds of computer programs might be interesting to write.
						I thought about it a bit, and it occurred to me that you all are going to have to be using the Quadratic Equation coming
						up pretty soon.  This equation lets you solve for the roots of a parabola without factoring.  It is a little daunting, and
						looks like this:
						<br></br>
						<br></br>
						<codeline>
						x = [-b +/- sqrt(b^2 - 4ac)]/2a
						</codeline>
						<br></br>
						<br></br>

						I recall from my high school math days that it is really easy to make math mistakes when solving this, so I would have liked
						to have a computer program to check my work.  And it might be handy to do some other parabola stuff as well.
						It might do these things....
						<ul>
						<li>Solve for the roots (using the quadratic equation), or tell you if there are no roots</li>
						<li>Show you the graphing form of the parabola</li>
						<li>Show you the vertex</li>
						<li>Give the recursive equation for the parabola</li>
						<li>Graph the parabola</li>
						</ul>
		
						The Internet didn't exist when I was in high school, but if it did I would have wanted something like this....
						<br></br>
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-success">
              Close this message!
            </Button>
          </div>
        </Alert>


      </>
    );
  }
}

					/*
					<li>Allow you to put in an arbitrary x value and solve for y</li>
					<li>Allow you to put in an arbitrary y value and solve for x</li>
					*/

class Entry extends React.Component {
	render() {
		return (
			<div className="Entry">
				<br></br>
				Enter your parabola below:
				<br></br>
				<br></br>
				y = <NumericInput value={this.props.a} onChange={this.props.onChangeA} size={3}/> x^2 + 
				<NumericInput value={this.props.b} onChange={this.props.onChangeB} size={3}/> x +
				<NumericInput value={this.props.c} onChange={this.props.onChangeC} size={3}/>
				<br></br>
				<br></br>
			</div>
		);
	}
}

class Solution extends React.Component {
	render() {
		return (
			<div className="Solution">
				<ListGroup>
  				<ListGroup.Item>Standard equation:<br></br><codeX>{this.props.std}</codeX></ListGroup.Item>
  				<ListGroup.Item>Graphing equation:<br></br><codeX>{this.props.g}</codeX></ListGroup.Item>
  				<ListGroup.Item>X intercepts (roots):<br></br> <codeX>{this.props.rt}</codeX></ListGroup.Item>
  				<ListGroup.Item>Vertex:<br></br> <codeX>[{this.props.vx}, {this.props.vy}]</codeX></ListGroup.Item>
  				<ListGroup.Item>Recursive equation:<br></br> <codeX>{this.props.curt}</codeX></ListGroup.Item>
				</ListGroup>;
			</div>
		);
	}
}

var LineChart = require("react-chartjs").Line;

var options = {

	///Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : true,

	//String - Colour of the grid lines
	scaleGridLineColor : "rgba(0,0,0,.05)",

	//Number - Width of the grid lines
	scaleGridLineWidth : 3,

	//Boolean - Whether to show horizontal lines (except X axis)
	scaleShowHorizontalLines: true,

	//Boolean - Whether to show vertical lines (except Y axis)
	scaleShowVerticalLines: true,

	//Boolean - Whether the line is curved between points
	bezierCurve : true,

	//Number - Tension of the bezier curve between points
	bezierCurveTension : 0.4,

	//Boolean - Whether to show a dot for each point
	pointDot : true,

	//Number - Radius of each point dot in pixels
	pointDotRadius : 4,

	//Number - Pixel width of point dot stroke
	pointDotStrokeWidth : 1,

	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	pointHitDetectionRadius : 20,

	//Boolean - Whether to show a stroke for datasets
	datasetStroke : true,

	//Number - Pixel width of dataset stroke
	datasetStrokeWidth : 3,

	//Boolean - Whether to fill the dataset with a colour
	datasetFill : true,

	//Boolean - Whether to horizontally center the label and point dot inside the grid
	offsetGridLines : false,

	scales: {
		yAxes: [{
			ticks: {
				beginAtZero: false
			}
		}],
		xAxis: [{
			ticks: {
				beginAtZero: false
			}
		}]
	}
};

class Graph extends React.Component {
	render() {
    return (
			<LineChart data={data} options={options} width="500" height="500"/>
		);
  }
};

export default App;
