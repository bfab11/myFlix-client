import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


export class DirectorView extends React.Component {
  render() {
    const { directorData, onBackClick } = this.props;
    console.log(directorData);

    return (

      <div className="director-view">
        <div className="my-2">
          <span className="label font-weight-bold">Director: </span>
          <span className="value">{directorData.Name}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Bio: </span>
          <span className="value">{directorData.Description}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Born: </span>
          <span className="value">{directorData.Birth}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Death: </span>
          <span className="value">{directorData.Death}</span>
        </div>
          <Button variant="outline-dark" className="my-3" onClick={()=>onBackClick()}>Back</Button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  directorData: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired
  }).isRequired
};