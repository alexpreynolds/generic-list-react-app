import React, { Component } from "react";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      selectedLine: null,
    };

    this.uploadInputRef = React.createRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleUploadInputChange() {
    const fileInput = document.getElementById('uploadInput');
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const lines = data.split('\n').filter((e) => e);
      this.setState({
        lines: lines,
        selectedLine: lines[0],
      });
    }
    for (let file of fileInput.files) {
      reader.readAsText(file);
    }
  }

  handleLineSelectChange(line) {
    this.setState({
      selectedLine: line
    }, () => {
      document.activeElement.blur(); // remove the blue outline around the select drop-down menu
    });
  }

  render() {
    return (
      <div className="box">
        <div className="row header">
          <div>
            generic-list-react-app
          </div>
        </div>
        <div className="row content">
          <form name="uploadForm">
            <div>
              <input 
                id="uploadInput" 
                type="file" 
                ref={(component) => this.uploadInputRef = component}
                onChange={(e) => this.handleUploadInputChange(e.target.result)}
                multiple />
            </div>
          </form>
          <hr />
          {
            (this.state.lines.length > 0) 
              ? 
              <select onChange={(e) => this.handleLineSelectChange(e.target.value)}>
                {this.state.lines.map((line) => {
                  return (
                    <option value={line} key={`line-${line}`}>{line}</option>
                  )
                })}
              </select>
              : 
              <div className='noLinesLabel'>
                Please choose a text file to add its lines to a pull-down menu
              </div>
          }
          {
            (this.state.selectedLine) 
              ?
              <div>
                <hr />
                <div className='lineLabelParent'>
                  Selected line: <span className='lineLabel'>{this.state.selectedLine}</span>
                </div>
              </div>
              : 
              <div />
          }
        </div>
        <div className="row footer">
          {this.state.lines.length} lines loaded
        </div>
      </div>
    );
  }
}

export default App;
