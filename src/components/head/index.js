import React from "react";
import './style.css';
import PropTypes from 'prop-types';

function Head({title}) {

  return(
    <div className='Head'>
        <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string
}

export default React.memo(Head);