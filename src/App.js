import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { SlateInitialValueSimple } from './components/mock.data';

class App extends React.Component {
  state = {
    value: Value.fromJSON(SlateInitialValueSimple)
  };
  onChange = ({ value }) => {
    this.setState({ value });
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
            React Slate POC
          </a>
        </nav>

        <div className="container-fluid pb-5">
          <div className="row">
            <div className="col-md-12">
              <Editor value={this.state.value} onChange={this.onChange} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
