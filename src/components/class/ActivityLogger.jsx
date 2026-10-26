import React from 'react';

class ActivityLogger extends React.Component {
  state = { logs: [], showToast: false };
  toastTimeout = null;

  componentDidMount() {
    const savedLogs = localStorage.getItem('taskActivityLogs');
    if (savedLogs) this.setState({ logs: JSON.parse(savedLogs) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lastAction !== this.props.lastAction && this.props.lastAction) {
      const updatedLogs = [...this.state.logs, this.props.lastAction];
      localStorage.setItem('taskActivityLogs', JSON.stringify(updatedLogs));
      this.setState({ logs: updatedLogs, showToast: true });
      this.toastTimeout = setTimeout(() => this.setState({ showToast: false }), 1800);
    }
  }

  componentWillUnmount() {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  render() {
    return (
      <details className="activity-panel">
        <summary>Activity log</summary>
        {this.state.showToast && <div className="activity-toast">Activity logged</div>}
        {this.state.logs.length === 0 ? <p className="muted">No activity yet.</p> : <ul className="activity-list">{this.state.logs.map((log, index) => <li key={`${log}-${index}`}>{log}</li>)}</ul>}
      </details>
    );
  }
}

export default ActivityLogger;
