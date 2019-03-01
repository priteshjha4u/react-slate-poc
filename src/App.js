import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { CodeNode } from './components/nodes.component';
import { BoldMark, ItalicMark, UnderlineMark } from './components/marks.component';
import AllPlugins from './plugins/main';
import { initialValueSimple } from './components/mock.data';

const initialValue = Value.fromJSON(initialValueSimple);

class App extends React.Component {
  state = {
    value: initialValue,
    revision: 0,
    saved: true
  };

  componentDidMount() {
    localStorage.clear();
  }

  onChange = ({ value }) => {
    if (value.document !== this.state.value.document) {
      this.setState({ value, saved: false });
    }
  };

  saveChanges = () => {
    this.setState({ revision: this.state.revision + 1, saved: true }, () => {
      const content = JSON.stringify(this.state.value.toJSON());
      localStorage.setItem(`editior-revision-${this.state.revision}`, content);
    });
  };

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();
    // console.log(event.key);
    switch (event.key) {
      case 'b': {
        event.preventDefault();
        editor.toggleMark('bold');
        break;
      }
      case '`': {
        const isCode = editor.value.blocks.some(block => block.type === 'code');
        event.preventDefault();
        editor.setBlocks(isCode ? 'paragraph' : 'code');
        break;
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
      case 'italic':
        return <ItalicMark {...props} />;
      case 'underline':
        return <UnderlineMark {...props} />;
      default:
        return next();
    }
  };

  getRevision = r => {
    const data = JSON.parse(localStorage.getItem(`editior-revision-${r}`) || 'null');
    if (data) {
      this.setState({ value: Value.fromJSON(data) });
    }
    if (!r && this.state.revision > 0) {
      const arr = [];
      for (let i = 1; i <= this.state.revision; i++) {
        arr.push(i);
      }
      return arr;
    }
    return null;
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">
            React Slate POC
          </a>
          <button className="btn btn-sm btn-success mr-2" onClick={this.saveChanges} disabled={this.state.saved}>
            Save Changes
          </button>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <h6 className="sidebar-heading d-flex justify-content-center align-items-center px-3 mb-2 text-muted">
                  <span>History</span>
                </h6>
                {this.state.revision > 0 ? (
                  <ul className="list-group">
                    {this.getRevision().map(r => (
                      <li
                        key={r}
                        className="list-group-item"
                        onClick={() => {
                          this.getRevision(r);
                        }}
                      >
                        revision-{r}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center">No revisions.</p>
                )}
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-left flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <Editor
                  value={this.state.value}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  renderNode={this.renderNode}
                  renderMark={this.renderMark}
                  plugins={AllPlugins}
                />
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
