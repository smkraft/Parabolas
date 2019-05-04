import React from 'react';
import logo from './logo.svg';
import './App.css';

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
		};

   	this.solve();

	};

	changeA(valueAsNumber) {
		this.setState({
			a: valueAsNumber
		}, () => {
    	this.solve();
		});
	};

	changeB(valueAsNumber) {
		this.setState({
			b: valueAsNumber
		}, () => {
    	this.solve();
		});
	};

	changeC(valueAsNumber) {
		this.setState({
			c: valueAsNumber
		}, () => {
    	this.solve();
		});
	};

	solve() {
		if (this.state.a == 0 || this.state.a == null) {
			this.setState({
				standard: "Not a parabola!",
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
			root1 = -this.state.b - Math.sqrt(radicand) / (2 * this.state.a);
			root2 = -this.state.b + Math.sqrt(radicand) / (2 * this.state.a);
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

	};

	render() {
		return (
			<div className="Parabola">
				<div className="app-intro">
					<Intro />
				</div>
				<div className="app-entry">
					<Entry
						a={this.state.a} onChangeA={this.changeA.bind(this)}
						b={this.state.b} onChangeB={this.changeB.bind(this)}
						c={this.state.c} onChangeC={this.changeC.bind(this)}
					/>
				</div>
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
					/>
				</div>
			</div>
		);
	}
};

class Intro extends React.Component {
	render() {
		return (
			<div className="Intro">
				<h2>Parabolas</h2>
				<p>
					Hi, Ally, Aviva, Casey, and Emma -
					<br></br>
					<br></br>
					We were talking after math class last Thursday about what kinds of computer programs might be interesting to write.
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
					
					I recall from my high school math days that it is really easy to make math mistakes when solving this, so it would be handy
					to have a computer program where you could check the solution to this.  And if I had a program to do that, it would probably
					be handy to do some other parabola stuff as well.  It would probably be a program that would take a parabola in standard form, and then:
					<ul>
					<li>Solve for the roots (using the quadratic equation), or tell you if there are no roots</li>
					<li>Show you the graphing form of the parabola</li>
					<li>Show you the vertex</li>
					<li>Give the recursive equation for the parabol</li>
					</ul>
		
					The Internet didn't exist when I was in high school, but if it did I would have wanted something like this....
					<br></br>

				</p>
			</div>
		);
	}
};

					/*
					<li>Draw a graph of the parabola with appropriate viewing window</li>
					<li>Allow you to put in an arbitrary x value and solve for y</li>
					<li>Allow you to put in an arbitrary y value and solve for x</li>
					*/

class Entry extends React.Component {
	render() {
		return (
			<div className="Entry">
				Enter the <code>a</code> coefficient:
				<NumericInput value={this.props.a} onChange={this.props.onChangeA} size={10}/>
				<br></br>
				Enter the <code>b</code> coefficient:
				<NumericInput value={this.props.b} onChange={this.props.onChangeB} size={10}/>
				<br></br>
				Enter the <code>c</code> coefficient:
				<NumericInput value={this.props.c} onChange={this.props.onChangeC} size={10}/>
				<br></br>
			</div>
		);
	}
}

class Solution extends React.Component {
	render() {
		return (
			<div className="Solution">
				<br></br>
				Standard equation:
				<codeline>{this.props.std}</codeline>
				<br></br>
				<br></br>
				Graphing equation:
				<codeline>{this.props.g}</codeline>
				<br></br>
				<br></br>
				X intercepts (roots) :
				<codeline>{this.props.rt}</codeline>
				<br></br>
				<br></br>
				Vertex:
				<codeline>[{this.props.vx}, {this.props.vy}]</codeline>
				<br></br>
				<br></br>
			</div>
		);
	}
}

export default App;
