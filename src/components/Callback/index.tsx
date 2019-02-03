import React from 'react';

export default class Callback extends React.Component {

  public componentDidMount() {
    window.setTimeout(opener.SC.connectCallback, 1);
  }

  public render() {
    return (
      <div>
        <p>
          This page should close soon.
        </p>
      </div>
    );
  }
}