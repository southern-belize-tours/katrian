import * as React from 'react';

import Summary from './Summary';

export default function TimeAndDate(props) {

    return (
      <div className="weddingBody">
        <Summary size={props.size ? props.size : 400}></Summary>
      </div>
    );
  }