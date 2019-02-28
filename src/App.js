import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { CodeNode } from './components/nodes.component';
import { BoldMark } from './components/marks.component';
import { initialValueSimple } from './components/mock.data';

const initialValue = Value.fromJSON(initialValueSimple);

class App extends React.Component {
  state = {
    value: initialValue
  };
  onChange = ({ value }) => {
    // console.log(value.toJSON());
    this.setState({ value });
  };
  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();
    console.log(event.key);
    switch (event.key) {
      case 'b': {
        event.preventDefault();
        editor.toggleMark('bold');
      }
      case '`': {
        const isCode = editor.value.blocks.some(block => block.type === 'code');
        event.preventDefault();
        editor.setBlocks(isCode ? 'paragraph' : 'code');
      }
      default: {
        return next();
      }
    }
  };
  renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />;
      default:
        return next();
    }
  };
  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
      default:
        return next();
    }
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
            React Slate POC
          </a>
        </nav>

        <div className="container-fluid">
          <div className="row" style={{ marginTop: '5%' }}>
            <div className="col-md-12">
              <Editor value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
