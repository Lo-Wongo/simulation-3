import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticated, patchUser } from '../../ducks/reducer';
import { Link } from "react-router-dom";

class Profile extends Component {
  formatPropsToState( user ) {
    if ( user !== null ) {
      for( var i in user ) {
        this.setState({ [i]: user[i] || "" });
      }

      if ( user.birthday ) {
        this.setState({ b_month: user.birthday.slice(5, 7) || "", 
                        b_day: user.birthday.slice(8, 10) || "", 
                        b_year: user.birthday.slice(0, 4) || ""
        });
      }
    }
  }

  componentDidMount() {
    const { user, history, authenticated } = this.props;
    if ( user === null ) authenticated( history );
    this.formatPropsToState( user );
  }

  componentWillReceiveProps( { user } ) {
    this.formatPropsToState( user );
  }

  constructor( props ) {
    super( props );
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      birthday: "",
      eye_color: "",
      hair_color: "",
      gender: "",
      hobby: "",
      b_month: "",
      b_day:  "", 
      b_year: ""
    };

    this.updateProfile = this.updateProfile.bind( this );
    this.cancel = this.cancel.bind( this );
    this.updateState = this.updateState.bind( this );
    this.formatPropsToState = this.formatPropsToState.bind( this );
  }

  updateProfile() {
    const { editUser } = this.props;
    const { id, first_name, last_name, birthday, eye_color, hair_color, gender, hobby } = this.state;
    editUser({ id, first_name, last_name, birthday, eye_color, hair_color, gender, hobby });
  }

  cancel() {
    const { user } = this.props;
    this.formatPropsToState( user );
  }

  updateState( prop, val ) {
    this.setState({ [prop]: val });

    if ( prop === "b_month" || prop === "b_day" || prop === "b_year" ) {
      const { b_month, b_day, b_year } = this.state;
      let temp = { b_month, b_day, b_year };
      temp[ prop ] = val;

      this.setState({ birthday: [ temp.b_year, temp.b_month, temp.b_day ].join('-') });
    }
  }

  render() {
    const months = [ { label: 'January', value: '01' }, 
                     { label: 'February', value: '02' }, 
                     { label: 'March', value: '03' }, 
                     { label: 'April', value: '04' }, 
                     { label: 'May', value: '05' }, 
                     { label: 'June', value: '06' }, 
                     { label: 'July', value: '07' }, 
                     { label: 'August', value: '08' }, 
                     { label: 'September', value: '09' }, 
                     { label: 'October', value: '10' }, 
                     { label: 'November', value: '11' }, 
                     { label: 'December', value: '12' } ];
    const days = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ];
    const years = [];

    return (
      <div>
        <div>
          <div>
            First Name: 
            <input value={ this.state.first_name } onChange={ ( e ) => this.updateState( 'first_name', e.target.value ) } />
          </div>

          <div>
            Last Name: 
            <input value={ this.state.last_name } onChange={ ( e ) => this.updateState( 'last_name', e.target.value ) } />
          </div>

          <div>
            Gender: 
            <select value={ this.state.gender } onChange={ ( e ) => this.updateState( 'gender', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Male"> Male </option>
              <option value="Female"> Female </option>
            </select>
          </div>

          <div>
            Hobby:
            <select value={ this.state.hobby } onChange={ ( e ) => this.updateState( 'hobby', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Hobby #1"> Hobby #1 </option>
              <option value="Hobby #2"> Hobby #2 </option>
              <option value="Hobby #3"> Hobby #3 </option>
              <option value="Hobby #4"> Hobby #4 </option>
            </select>
          </div>

          <div>
            Hair Color:
            <select value={ this.state.h_color } onChange={ ( e ) => this.updateState( 'h_color', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Brown"> Brown </option>
              <option value="Red"> Blue </option>
              <option value="Green"> Green </option>
              <option value="Red"> Red </option>
              <option value="Blonde"> Blonde </option>
              <option value="White"> White </option>
            </select>
          </div>

          <div>
            Eye Color:
            <select value={ this.state.e_color } onChange={ ( e ) => this.updateState( 'e_color', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Brown"> Brown </option>
              <option value="Blue"> Blue </option>
              <option value="Green"> Green </option>
            </select>
          </div>

          <div>
            Birthday Month:
            <select value={ this.state.b_month } onChange={ ( e ) => this.updateState( 'b_month', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              {
                months.map( month => (
                    <option key={ month.value } value={ month.value }> { month.label } </option>
                ))
              }
            </select>
          </div>

          <div>
            Birthday Day:
            <select value={ this.state.b_day } onChange={ ( e ) => this.updateState( 'b_day', e.target.value ) } >
              <option value=""> -- Select -- </option>
              {
                days.map( day => (
                  <option key={ day } value={ day }> { day } </option>
                ))
              }
            </select> 
          </div>

          <div>
            Birthday Year:
            <select value={ this.state.b_year } onChange={ ( e ) => this.updateState( 'b_year', e.target.value ) } >
              <option value=""> -- Select -- </option>
              {
                years.map( year => (
                  <option key={ year } value={ year }> { year } </option>
                ))
              }
            </select>
          </div>

          <div>
            <button onClick={ this.updateProfile }> Update </button>
            <button onClick={ this.cancel }> Cancel </button>
            <Link to="/">
              <button> Back to Dashboard </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { authenticated, editUser } )( Profile );





// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';


// class Profile extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             value: '--Select--'
//         };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e) {
//         console.log(e);
//         this.setState({
//             connersValue: e.target.value
//         }, ()=> console.log(this.state))
//     }

//     handleSubmit(event) {
//         alert('Profile Undated: ' + this.state.value)
//         event.preventDefault();
//     }

//     handleCancel(event) {
//         alert('Profile Cancelled: ' + this.state.value)
//         event.preventDefault();
//     }


//     render() {

//         return (
//             <form onSubmit={this.handleSubmit} onCancel={this.handleCancel}>
//                 <label>
//                 <Link to="/editprofile">Edit Profile</Link>

//                 <div>
//                     <p>First Name</p>
//                     <input type="text" onChange={this.handleChange}></input>
//                 </div>

//                 <div>
//                 <p>Last Name</p>
//                 <input type="text" onChange={this.handleChange}></input>
//                 </div> <br />

                    
//                     <div>
//                         <p>Gender</p>
//                         <select onChange={(e)=> this.handleChange(e)}>
//                             <option value="select">{this.state.value}</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                         </select>
//                     </div> <br />

//                     <div>
//                         <p>Hair Color</p>
//                         <select onChange={(e)=> this.handleChange(e)}>
//                         <option value="select">{this.state.value}</option>
//                         <option value="brown">Brown</option>
//                         <option value="blue">Blue</option>
//                         <option value="green">Green</option>
//                         <option value="red">Red</option>
//                         <option value="blonde">Blonde</option>
//                         <option value="white">White</option>
//                     </select> <br />
//                     </div>


//                     <div>
//                         <p>Eye Color</p>
//                     <select onChange={(e)=> this.handleChange(e)}>
//                         <option value="select">{this.state.value}</option>
//                         <option value="brown">Brown</option>
//                         <option value="blue">Blue</option>
//                         <option value="green">Green</option>
//                     </select> 
//                     </div><br />

//                     <div>
//                         <p>Hobbies</p>
//                     <select onChange={(e)=> this.handleChange(e)}>>
//                         <option value="select">{this.state.value}</option>
//                         <option value="videogames">Video Games</option>
//                         <option value="hiking">Hiking</option>
//                         <option value="fishing">Fishing</option>
//                         <option value="rafting">Rafting</option>
//                     </select> 
//                     </div><br />

//                     <div>
//                         <p>Birthday Day</p>
//                     <select onChange={(e)=> this.handleChange(e)}>>
//                         <option value="select">{this.state.value}</option>
//                         <option value="01">01</option>
//                         <option value="02">02</option>
//                         <option value="03">03</option>
//                         <option value="04">04</option>
//                         <option value="05">05</option>
//                         <option value="06">06</option>
//                         <option value="07">07</option>
//                         <option value="08">08</option>
//                         <option value="09">09</option>
//                         <option value="10">10</option>
//                         <option value="11">11</option>
//                         <option value="12">12</option>
//                         <option value="13">13</option>
//                         <option value="14">14</option>
//                         <option value="15">15</option>
//                         <option value="16">16</option>
//                         <option value="17">17</option>
//                         <option value="18">18</option>
//                         <option value="19">19</option>
//                         <option value="20">20</option>
//                         <option value="21">21</option>
//                         <option value="22">22</option>
//                         <option value="23">23</option>
//                         <option value="24">24</option>
//                         <option value="25">25</option>
//                         <option value="26">26</option>
//                         <option value="27">27</option>
//                         <option value="28">28</option>
//                         <option value="29">29</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                     </select> 
//                     </div><br />

//                     <div>
//                         <p>Birthday Month</p>
//                     <select onChange={(e)=> this.handleChange(e)}>>
//                         <option value="select">{this.state.value}</option>
//                         <option value="january">January</option>
//                         <option value="february">February</option>
//                         <option value="march">March</option>
//                         <option value="april">April</option>
//                         <option value="may">May</option>
//                         <option value="june">June</option>
//                         <option value="july">July</option>
//                         <option value="august">August</option>
//                         <option value="september">September</option>
//                         <option value="october">October</option>
//                         <option value="november">November</option>
//                         <option value="december">December</option>
//                     </select> 
//                     </div><br />

//                     <div>
//                         <p>Birthday Year</p>
//                     <select onChange={(e)=> this.handleChange(e)}>>
//                         <option value="select">{this.state.value}</option>
//                         <option value="2018">2018</option>
//                         <option value="2017">2017</option>
//                         <option value="2016">2016</option>
//                         <option value="2015">2015</option>
//                         <option value="2014">2014</option>
//                         <option value="2013">2013</option>
//                         <option value="2012">2012</option>
//                         <option value="2011">2011</option>
//                         <option value="2010">2010</option>
//                         <option value="2009">2009</option>
//                         <option value="2008">2008</option>
//                         <option value="2007">2007</option>
//                     </select> 
//                     </div><br />

//                     <button type="submit" value="submit" onClick={this.handleSubmit}>Update</button>
//                     <button type="submit" value="submit" onClick={this.handleSubmit}>Cancel</button>
//                 </label>
//             </form>

//         );
//     }
    
// }


// export default Profile;