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

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

var LineChart = require("react-chartjs").Line;

class App extends React.Component {
	render() {
		return (
      <div className="App">
        <div className="App-parabola">
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
			roottxt : "[0,0], vertex",
			vxN : 0,
			vx: 0,
			vy : 0,
			recursivetxt : "y(x) = y(x-1) + 2x",
			factoredtxt: "y = (x - 0)(x - 0)",
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
				standard: "Fail = 0x^2 + bx + c",
				graph: "Huh?",
				roottxt: "Of what?",
				recursivetxt: "y(x) = y(x-1) + ???",
				factoredtxt: "That's\\space no\\space parabola!",
				vx: 0,
				vy: 0,
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
				roottxt = "No roots (a>0, c>0, yvertex > 0)";
			}
			else {
				roottxt = "No roots (a<0, c<0, yvertex < 0)";
			}
		}
		else if (nx == 1) {
			roottxt = "[" + parseFloat(root1.toFixed(5)) + ", 0], vertex";
		}
		else {
			roottxt = "[" + parseFloat(root1.toFixed(5)) + ", 0], [" + parseFloat(root2.toFixed(5)) + ", 0]";
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
			graph += " - " + parseFloat(Math.abs(vxN).toFixed(5));
		}
		else {
			graph += " + " + parseFloat(vxN.toFixed(5));
		}
		graph += ")^2 ";
	
		if (vxN == 0) {
		}
		else if (vy <= 0) {
			graph += "- " + parseFloat(Math.abs(vy).toFixed(5));
		}
		else {
			graph += "+ " + parseFloat(vy.toFixed(5));
		}
	
		this.setState({
			graph: graph,
			vxN: vxN,
			vx: -vxN,
			vy: vy
		});
	
		var secondDiff = 2 * this.state.a;
		/* Use Y intercept for point. */
		var a = (this.state.a == null ? 0 : this.state.a);
		var b = (this.state.b == null ? 0 : this.state.b);
		var c = (this.state.c == null ? 0 : this.state.c);

		var y0 = c;
		var y1 = a * 1 * 1 + b * 1 + c;
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
			recursivetxt += parseFloat(Math.abs(secondDiff.toFixed(5)));
		}
	
		recursivetxt += "x ";
	
		if (diffAtX0 > 0.0) {
			recursivetxt += "- " + parseFloat(Math.abs(diffAtX0.toFixed(5)));
		}
		else {
			recursivetxt += "+ " + parseFloat(Math.abs(diffAtX0.toFixed(5)));
		}
	
		recursivetxt += " , y(0) = " + parseFloat(y0.toFixed(5));
	
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

		var factoredtxt = "y = ";
		if (radicand >= 0) {
			if (a == 1.0) {
			} else if (a == -1.0) {
				factoredtxt += "-";
			} else if (a < 0) {
				factoredtxt += "-" + parseFloat(Math.abs(a).toFixed(5));
			} else {
				factoredtxt += parseFloat(a.toFixed(5));
			}
			factoredtxt += "(x ";
			if (root1 >= 0) {
				factoredtxt += "- " + parseFloat(root1.toFixed(5));
			} else {
				factoredtxt += "+ " + parseFloat(Math.abs(root1).toFixed(5));
			}
			factoredtxt += ")";
			if (radicand == 0) {
				factoredtxt += "^2";
			} else {
				factoredtxt += "(x ";
				if (root2 >= 0) {
					factoredtxt += "- " + parseFloat(root2.toFixed(5));
				} else {
					factoredtxt += "+ " + parseFloat(Math.abs(root2).toFixed(5));
				}
				factoredtxt += ")";
			}
		} else {
			factoredtxt = "Complex\\space roots!";
		}

		this.setState({
			factoredtxt: factoredtxt,
		});
		
	};

	render() {
		return (
			<div className="Parabola">
				<div className="App-intro">
					<Intro firstTime={this.state.firstTime}/>
				</div>
				<div className="App-entry">
					<Entry
						a={this.state.a} onChangeA={this.changeA.bind(this)}
						b={this.state.b} onChangeB={this.changeB.bind(this)}
						c={this.state.c} onChangeC={this.changeC.bind(this)}
					/>
				</div>
				<Container fluid={true}>
					<Row>
						<Col xs="12" md="5">
							<div className="App-solution">
								<Solution
									std={this.state.standard}
									a={this.state.a}
									b={this.state.b}
									c={this.state.c}
									rt={this.state.roottxt}
									g={this.state.graph}
									vx={this.state.vx}
									vy={this.state.vy}
									recur={this.state.recursivetxt}
									fact={this.state.factoredtxt}
								/>
							</div>
						</Col>
						<Col xs="12" md="7">
							<div className="App-graph">
								<Graph />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
};

var qe = "<BlockMath math={'\\int_0^\\infty x^2 dx'}/>";

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
          <Alert.Heading>Hi Ally, Aviva, Casey, and Emma -</Alert.Heading>
          <p>
						We were talking after math night at Casey's recently about what kinds of computer programs might be interesting to write.
						I thought about it a bit, and it occurred to me that you all are going to have to be using the Quadratic Equation coming
						up pretty soon.  This equation lets you solve for the roots of a parabola without factoring.  It is a little daunting, and
						looks like this:
						<br></br>
						<BlockMath math={'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}'}/>
						when the following is true:
						<BlockMath math={'(b^2-4ac)>={0}'}/>
						<br></br>

						I recall from my high school math days that it is really easy to make math mistakes when solving this, so I would have liked
						to have a computer program to check my work.  And it might be handy to do some other parabola stuff as well.
						It might do these things....
						<br></br>
						<br></br>
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
			<div className="App-entry">
				<br></br>
				Enter your parabola below:
				<br></br>
				<br></br>
				<InlineMath math="y = "/><NumericInput value={this.props.a} onChange={this.props.onChangeA} size={3}/> <InlineMath math="x^2 +"/>
				<NumericInput value={this.props.b} onChange={this.props.onChangeB} size={3}/> <InlineMath math="x +"/>
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
			<div className="App-solution">
				<ListGroup>
  				<ListGroup.Item>Standard equation:<br></br><codeX><InlineMath math={this.props.std}/></codeX></ListGroup.Item>
  				<ListGroup.Item>Graphing equation:<br></br><codeX><InlineMath math={this.props.g}/></codeX></ListGroup.Item>
  				<ListGroup.Item>X intercepts (roots):<br></br> <codeX>{this.props.rt}</codeX></ListGroup.Item>
  				<ListGroup.Item>Vertex:<br></br> <codeX>[{parseFloat(this.props.vx.toFixed(5))}, {parseFloat(this.props.vy.toFixed(5))}]</codeX></ListGroup.Item>
  				<ListGroup.Item>Recursive equation:<br></br><codeX><InlineMath math={this.props.recur}/></codeX></ListGroup.Item>
  				<ListGroup.Item>Factored equation:<br></br><codeX><InlineMath math={this.props.fact}/></codeX></ListGroup.Item>
				</ListGroup>
			</div>
		);
	}
}

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

  layout: {
    title: 'A Fancy Plot',
    autosize: true
  },

  useResizeHandler: true,
  style: {width: "100%", height: "100%"},
	responsive: true,

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
			<LineChart data={data} options={options} responsive={true} useResizeHandler={true} autosize={true}/>
		);
  }
};

export default App;
