

import React from 'react';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            header: "Welcome to WayloStreams..",
            content: "A great website...",
            data:
                [{"id":"waylo:track:0","title":"Oberheim","artist":"Sean Wayland"},
                    {"id":"waylo:track:1","title":"Club Sandwich","artist":"Sean Wayland"}]

        }

       console.log(this.state.data[0]['tracks'])
    }

    render() {
        return (
            <div>
                {/*<Header/>*/}

                <h1>{this.state.header}</h1>
                <h2>{this.state.content}</h2>


                <table>
                    <tbody>
                    WAYLOSTREAMS TRACKS
                    {this.state.data.map((track, i) => <TableRow key = {i}
                                                                  data = {track} />)}
                    </tbody>
                </table>





                {/***
                 render elements from props

                <h3>Array: {this.props.propArray}</h3>
                <h3>Bool: {this.props.propBool ? "True..." : "False..."}</h3>
                <h3>Func: {this.props.propFunc(3)}</h3>
                <h3>Number: {this.props.propNumber}</h3>
                <h3>String: {this.props.propString}</h3>
                <h3>Object: {this.props.propObject.objectName1}</h3>

                 */}


                {/*} <Stuff/> */}



            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <div>{this.state.data.artist}</div>

            </div>
        );
    }
}
class Header extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

class Stuff extends React.Component {
    render() {
        return (
            <div>


            </div>
        );
    }
}
class TableRow extends React.Component {
    render() {
        return (
            <tr>
                <td>id: {this.props.data.id}  </td>
                <td>artist: {this.props.data.artist}  </td>
                <td>title: {this.props.data.title}  </td>
            </tr>
        );
    }
}


App.defaultProps = {
    headerProp: "Header from props...",
    contentProp:"Content from props...",
    propArray: [1, 2, 3, 4, 5],
    propBool: true,
    propFunc: function (e) {
        return e
    },
    propNumber: 1,
    propString: "Lets Do this...",

    propObject: {
        objectName1: "Bazza",
        objectName2: "Shazza",
        objectName3: "Gazza"
    }
}
export default App;
