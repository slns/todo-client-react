import React, { useState, forwardRef, useImperativeHandle } from 'react';

import './message-alert.css';


const MessageAlert = forwardRef((props, ref) => {
  
  const [showingMessage, setShowingMessage] = useState(false);

  const handleClick = () => {
    showMessage();
  };

  useImperativeHandle(ref, () => {
    return {
      handleClick: handleClick
    };
  });

  function showMessage() {
    setShowingMessage(true);

    setTimeout(() => {
      setShowingMessage(false);
    }, 3000);
  }

  return (
      <div style={{ display: `${showingMessage ? 'block' : 'none'}` }}>
        <div className={props.error ? 'divError' : 'divSuccess'}>
          {props.message}
        </div>
      </div>
  );
});

export default MessageAlert;

