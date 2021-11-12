import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
/**
 * 
 * @param {*} props A record of an actiity and its contents
 * 
 * sends a request to the server to change the is_archived property to true
 * 
 * TODO: Currently the request is sent but gets rejected as the is_archived is not a boolean?
 */
function archive(props) {

  //Create the request options here, is_archived is the only data being changed
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'applcation/json'
    },
    body: {
      is_archived: true
    }
  };
  
  //send the request
  fetch(`https://aircall-job.herokuapp.com/activities/${props}`, requestOptions)
  .then(response => response.json())
  .then((json) => {
    return json
  })
  .cath((error) => {
    console.log(error)
  });
}

/**
 * 
 * @param {*} props A list of all activities currently present on the application
 * 
 * Takes every activity present and sets the archive value to true
 */
function archiveAll(props) {
  console.log(props);
  for (let x = 0; x < props.length; x++) {
    archive(props[x].id);
  }
}

/**
 * Display component for each activity that gets returned from the api call.
 */
class CallCell extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      direction: props.direction,
      from: props.from,
      via: props.via,
      type: props.type,
      archived: props.is_archive
    }
  }
  render (){
    if (this.state.archived) {
      return (null);
    }
    var callType = "";
  //Add specific SVG for each call type
  if (this.state.type == 'missed') {
    callType = <div>
      <svg className="CallType" width='50px' height='25px' viewBox='0 0 486 168' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <path d='M84,168 C37.8,168 0,130.2 0,84 C0,37.8 37.8,0 84,0 C130.2,0 168,37.8 168,84 C168,130.2 130.2,168 84,168 Z M84,12 C44.4,12 12,44.4 12,84 C12,123.6 44.4,156 84,156 C123.6,156 156,123.6 156,84 C156,44.4 123.6,12 84,12 Z M122.342895,100.615799 C120.353028,98.7917542 118.031517,97.4651764 115.710006,96.3044208 C112.227739,94.6461985 107.08725,91.9930429 103.273338,94.4803763 C101.946761,95.3094874 100.951827,96.8018875 99.7910717,97.7968209 C98.2986716,99.2892209 96.6404493,100.781621 94.6505826,101.776554 C86.1936489,106.087932 75.0835595,104.263888 68.1190259,97.7968209 C64.1392924,93.6512651 61.651959,87.6816649 61.8177812,81.8778869 C61.9836034,77.4006867 63.4760035,72.7576643 66.2949814,69.1095752 C67.455737,67.6171752 68.948137,66.2905973 70.2747149,64.7981973 C71.6012927,63.4716194 72.4304039,61.9792194 72.4304039,59.9893526 C72.4304039,57.5020192 71.2696482,55.180508 70.2747149,52.8589968 C69.2797815,50.7033078 68.2848481,48.3817966 66.7924481,46.5577521 C65.4658702,44.7337075 63.4760035,42.7438408 61.3203145,41.9147296 C60.3253811,41.5830852 59.3304477,41.4172629 58.3355144,41.7489074 C57.0089365,42.0805519 56.0140032,43.0754852 55.0190698,43.9045964 C50.7076918,47.221041 46.2304916,51.0349522 44.0748027,56.0096191 C40.4267136,63.9690861 42.0849359,73.0893087 45.2355583,80.8829535 C48.8836473,89.6715316 54.8532476,97.6309986 61.8177812,104.098066 C65.9633369,108.243621 70.6063593,112.057533 75.5810262,115.208155 C82.0480931,119.187888 89.5100935,122.504333 97.137916,123.333444 C102.444227,123.996733 108.082183,123.167622 112.725206,120.680289 C114.715072,119.519533 116.539117,118.192955 118.197339,116.534733 C120.021384,114.710688 122.01125,112.720821 123.50365,110.730955 C124.498584,109.570199 125.825162,108.409444 125.990984,106.585399 C126.156806,104.263888 124.001117,102.108199 122.342895,100.615799 Z' fill='#FF0000  '/>
        </g>
      </svg>
      <h2 style={{textAlign: 'center'}}>Missed</h2>
    </div>;
  } else if (this.state.type == 'answered') {
    callType = <div>
    <svg className="CallType" width='50px' height='25px' viewBox='0 0 486 168' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <path d='M84,168 C37.8,168 0,130.2 0,84 C0,37.8 37.8,0 84,0 C130.2,0 168,37.8 168,84 C168,130.2 130.2,168 84,168 Z M84,12 C44.4,12 12,44.4 12,84 C12,123.6 44.4,156 84,156 C123.6,156 156,123.6 156,84 C156,44.4 123.6,12 84,12 Z M122.342895,100.615799 C120.353028,98.7917542 118.031517,97.4651764 115.710006,96.3044208 C112.227739,94.6461985 107.08725,91.9930429 103.273338,94.4803763 C101.946761,95.3094874 100.951827,96.8018875 99.7910717,97.7968209 C98.2986716,99.2892209 96.6404493,100.781621 94.6505826,101.776554 C86.1936489,106.087932 75.0835595,104.263888 68.1190259,97.7968209 C64.1392924,93.6512651 61.651959,87.6816649 61.8177812,81.8778869 C61.9836034,77.4006867 63.4760035,72.7576643 66.2949814,69.1095752 C67.455737,67.6171752 68.948137,66.2905973 70.2747149,64.7981973 C71.6012927,63.4716194 72.4304039,61.9792194 72.4304039,59.9893526 C72.4304039,57.5020192 71.2696482,55.180508 70.2747149,52.8589968 C69.2797815,50.7033078 68.2848481,48.3817966 66.7924481,46.5577521 C65.4658702,44.7337075 63.4760035,42.7438408 61.3203145,41.9147296 C60.3253811,41.5830852 59.3304477,41.4172629 58.3355144,41.7489074 C57.0089365,42.0805519 56.0140032,43.0754852 55.0190698,43.9045964 C50.7076918,47.221041 46.2304916,51.0349522 44.0748027,56.0096191 C40.4267136,63.9690861 42.0849359,73.0893087 45.2355583,80.8829535 C48.8836473,89.6715316 54.8532476,97.6309986 61.8177812,104.098066 C65.9633369,108.243621 70.6063593,112.057533 75.5810262,115.208155 C82.0480931,119.187888 89.5100935,122.504333 97.137916,123.333444 C102.444227,123.996733 108.082183,123.167622 112.725206,120.680289 C114.715072,119.519533 116.539117,118.192955 118.197339,116.534733 C120.021384,114.710688 122.01125,112.720821 123.50365,110.730955 C124.498584,109.570199 125.825162,108.409444 125.990984,106.585399 C126.156806,104.263888 124.001117,102.108199 122.342895,100.615799 Z' fill='#2AC420  '/>
      </g>
    </svg>
    <h2 style={{textAlign: 'center'}}>Answered</h2>
  </div>;
  } else {
    callType = <div>
    <svg className="CallType" width='50px' height='25px' viewBox='0 0 486 168' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <path d='M84,168 C37.8,168 0,130.2 0,84 C0,37.8 37.8,0 84,0 C130.2,0 168,37.8 168,84 C168,130.2 130.2,168 84,168 Z M84,12 C44.4,12 12,44.4 12,84 C12,123.6 44.4,156 84,156 C123.6,156 156,123.6 156,84 C156,44.4 123.6,12 84,12 Z M122.342895,100.615799 C120.353028,98.7917542 118.031517,97.4651764 115.710006,96.3044208 C112.227739,94.6461985 107.08725,91.9930429 103.273338,94.4803763 C101.946761,95.3094874 100.951827,96.8018875 99.7910717,97.7968209 C98.2986716,99.2892209 96.6404493,100.781621 94.6505826,101.776554 C86.1936489,106.087932 75.0835595,104.263888 68.1190259,97.7968209 C64.1392924,93.6512651 61.651959,87.6816649 61.8177812,81.8778869 C61.9836034,77.4006867 63.4760035,72.7576643 66.2949814,69.1095752 C67.455737,67.6171752 68.948137,66.2905973 70.2747149,64.7981973 C71.6012927,63.4716194 72.4304039,61.9792194 72.4304039,59.9893526 C72.4304039,57.5020192 71.2696482,55.180508 70.2747149,52.8589968 C69.2797815,50.7033078 68.2848481,48.3817966 66.7924481,46.5577521 C65.4658702,44.7337075 63.4760035,42.7438408 61.3203145,41.9147296 C60.3253811,41.5830852 59.3304477,41.4172629 58.3355144,41.7489074 C57.0089365,42.0805519 56.0140032,43.0754852 55.0190698,43.9045964 C50.7076918,47.221041 46.2304916,51.0349522 44.0748027,56.0096191 C40.4267136,63.9690861 42.0849359,73.0893087 45.2355583,80.8829535 C48.8836473,89.6715316 54.8532476,97.6309986 61.8177812,104.098066 C65.9633369,108.243621 70.6063593,112.057533 75.5810262,115.208155 C82.0480931,119.187888 89.5100935,122.504333 97.137916,123.333444 C102.444227,123.996733 108.082183,123.167622 112.725206,120.680289 C114.715072,119.519533 116.539117,118.192955 118.197339,116.534733 C120.021384,114.710688 122.01125,112.720821 123.50365,110.730955 C124.498584,109.570199 125.825162,108.409444 125.990984,106.585399 C126.156806,104.263888 124.001117,102.108199 122.342895,100.615799 Z' fill='#808080  '/>
      </g>
    </svg>
    <h2 style={{textAlign: 'center'}}>Voicemail</h2>
    </div>;
  }

  return (
    <div className='cellContainer'>
      <div className="cellRow"> 
        <div> {callType}</div> 
        <div> <h1 className='primaryInfo'>{this.state.direction} call from {this.state.from} </h1> </div> 
        <div> <h2 className='secondaryInfo'> Call attempted from {this.state.via}</h2> </div> 
      </div>
      <div className="buttonContainer">
        <button className="singleArchive" onClick={() => this.setState({archived: true}, archive(this.state.id))}>Archive Me!</button>
      </div>
    </div>
  );
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }


  componentDidMount() {
    fetch("https://aircall-job.herokuapp.com/activities")
      .then(res => res.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  update() {
    fetch("https://aircall-job.herokuapp.com/reset")
    .then(res => res.json())
    .then(
      (json) => {
        console.log(json);
        console.log("Reset activities");
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div style={{left: "50%", top: "50%"}}>
            <button className="archivedList" onClick={()=>console.log("this is where I would render a new tab for archived calls")}>View Archived Calls</button>
          <ul >
            {this.state.items.map(item => (
              <li key={item.id}>
                <CallCell from= {item.from} type = {item.call_type} direction={item.direction} via={item.via} id={item.id}/>
              </li>
            ))}
          </ul>
          <br></br>
          <div className="archiveAllContainer"style={{display: "flex", justifyContent: "center"}}>
            <button className="archiveAll" onClick={() => archiveAll(this.state.items)}>Archieve All</button>
            <button className="refresh" onClick={() => this.update()}> Refresh Call List</button>
          </div>
          
          </div>
      );
    }
  }
}

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <MyComponent/>
      
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
