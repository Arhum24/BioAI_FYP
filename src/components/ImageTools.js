import React from 'react';
import Header from './Header';
// import './App.css';

// function App() {
//   return (
//     <div className="App" >
//       <h1>
//           Image Processing Component
//         </h1>
//         <label>
//           Input Image
//           <input type = "file" />
//         </label>
//         <br/>
//         <br/>
//         <button> Predict Output</button>


//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var tmp = [];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: "",
            allFiles: []
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', this.state.file);
        const API = "http://localhost:3004/predict/"
        const fileURL = "http://localhost:3004/uploads/" + this.state.fileName;
        tmp.push({
            name: this.state.fileName,
            fileURL: fileURL
        })
        this.setState({ allFiles: tmp })
        console.log(tmp);
        let data = {
            body: formData,
            method: 'POST'
        }
        fetch(API, data).then(res => res.json).then(result => {
            alert('Uploaded Succesfully');
        }).catch(err => {
            console.log(err);
            alert('Error occured, open console to see');
        });

    }
    onChange(e) {
        this.setState({ file: e.target.files[0], fileName: e.target.files[0].name });
    }

    render() {
        if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
        else
            return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to React</h2>
                    </div>
                    {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
                    <p>Let's Upload An Image To Server</p>

                    <form onSubmit={this.onFormSubmit}>
                        <h1>Image Upload</h1>
                        <input id="filer" type="file" name="myImage" onChange={this.onChange} />
                        <button className="upload" type="submit">Upload</button>
                    </form>
                    <table>
                        {this.state.allFiles.map(item => (
                            <tr key={item.fileURL}>
                                <td>{item.name}</td>
                                <td><button onClick={() => {
                                    var win = window.open(item.fileURL, '_blank');
                                    win.focus();
                                }}>Open Image</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            );
    }
}
export default App;