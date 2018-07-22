//UserActions.js
import { getCookie } from 'redux-cookie';

import { USER_DATA } from 'actions/ActionTypes';
import * as ViewActions from 'actions/ViewActions';

import resURLS from 'resources/resURLS';
import { uploadResume, downloadResume } from 'resources/resume.js';

export const checkCookies = () => (
  (dispatch) => {
    
    let authdata = dispatch(getCookie('authdata'));
    if(!authdata || Date.parse(authdata.auth.valid_until) < Date.now()) {
      
      //not authorized or expired, logout
      dispatch(ViewActions.logoutUser());

      //should also be seen in sidebar
    } else {

      //token is still valid
      const email = authdata.auth.email;
      const token = authdata.auth.token;

      dispatch({
        type: USER_DATA.SET_EMAIL,
        email: email
      });
      dispatch({
        type: USER_DATA.SET_TOKEN,
        token: token
      });

      //download the user's resume from S3
      downloadResume(true, email, (resp, err) => {
        dispatch(confirmResume(resp));        
        if(resp === false ) {
          
          //problem with downloading
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: err
          });
        } else {
 
          //successful download -- does this show ever?
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: 'Resume found.'
          });
        }
      });

      //read in the user data from lcs
      dispatch(readUser(email, token));
    }
  }
);

export const updateUser = (user, key, value) => (
  (dispatch) => {

    user[key] = value;
    dispatch({
      type: USER_DATA.SET_USER_INFO,
      userInfo: user
    });
  }
);

//NOT IN USE
export const updateMentor = (mentor, key, value) => (
  (dispatch) => {

    mentor[key] = value;
    dispatch({
      type: USER_DATA.SET_MENTOR_INFO,
      mentorInfo: mentor
    });
  }
);

//NOT IN USE
export const updateVolunteer = (area) => (
  (dispatch) => {
    dispatch({
      type: USER_DATA.SET_VOLUNTEER_AREA,
      volunteerArea: area
    });
  }
);

//NOT IN USE
export const setShifts = (shifts, role) => (
  (dispatch) => {
    
    if(role === 'volunteer') {
      
      //update volunteer shifts
      dispatch({
        type: USER_DATA.SET_VOLUNTEER_TIMES,
        volunteerTimes: shifts
      });
    } else if(role === 'mentor') {
      
      //update mentor shifts
      dispatch({
        type: USER_DATA.SET_MENTOR_TIMES,
        mentorTimes: shifts
      });
    } else {
      
      //do nothing
      return;
    }
  }
);

export const toggleCOC = (checked) => (
  (dispatch) => {
    
    dispatch({
      type: USER_DATA.SET_COC, 
      codeOfConduct: checked
    });
  }
);

export const toggleShare = (checked) => (
  (dispatch) => {

    dispatch({
      type: USER_DATA.SET_SHARE,
      dataSharing: checked
    });
  }
);

export const save = (userState) => (
  (dispatch) => {

    let user = userState.user;
    if(userState.codeOfConduct && userState.dataSharing) {
      
      //the user has checked both boxes and can be set as registered in lcs
    
      user.registration_status = 'registered';
    }

    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': user},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {

        if(resp.statusCode === 200) {

          //save successful
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: 'Changes saved successfully'
          });
        } else {
            
          //save unsucessful
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: 'Unable to save.\n' + resp.body
          });
        }
      })
      .catch(err => {
        
        //unexpected error
        dispatch(showCaughtError(err.toString()));
      });
  }
); 

//NOT IN USE
export const applyMentor = (userState) => (
  (dispatch) => {

    let mentorUpdate = {
      'role.mentor': {
        skills: userState.mentorInfo,
        times: userState.mentorTimes
      }
    };


    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': mentorUpdate},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statusCode === 200) {

          //successful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Thank you for your interest in becoming a mentor.  We will be in contact with you shortly.'
          });
        } else {

          //unsuccessful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Mentor application failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);

//NOT IN USE
export const unapplyMentor = (userState) => (
  (dispatch) => {
    
    let mentorUpdate = {
      'role.mentor': null
    };
    
    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: mentorUpdate,
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
      
        if(resp.statusCode === 200) {

          //successful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Application rescinded.'
          });
        } else {

          //unsuccessful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Role update failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);


//NOT IN USE
export const applyVolunteer = (userState) => (
  (dispatch) => {

    let volunteerUpdate = {
      'role.volunteer': {
        area: userState.volunteerArea,
        times: userState.volunteerTimes
      }
    };


    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': volunteerUpdate},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statusCode === 200) {

          //successful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Thank you for your interest in becoming a volunteer.  We will be in contact with you shortly.'
          });
        } else {

          //unsuccessful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Volunteer application failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);

//NOT IN USE
export const unapplyVolunteer = (userState) => (
  (dispatch) => {
    
    let volunteerUpdate = {
      'role.volunteer': null
    };
    
    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: volunteerUpdate,
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
      
        if(resp.statusCode === 200) {

          //successful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Application rescinded.'
          });
        } else {

          //unsuccessful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Role update failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);

export const upResume = (userState) => (
  (dispatch) => {

    //upload resume to S3
    uploadResume(userState.userInfoEmail, (response) => {
      if(response === 'Successfullly uploaded resume.') {

        //successful upload
        dispatch(confirmResume(true));
      } else {

        //unsuccessful upload
        dispatch(confirmResume(false));
      }

      dispatch({
        type: USER_DATA.SET_FLASH,
        flash: response
      });
    });
  }
);

export const confirmAttendance = (userState) => (
  (dispatch) => {
    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': {'registration_status': 'coming'}},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token 
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statusCode === 200) {

          //successful update
          let user = userState.user;
          dispatch(updateUser(user, 'registration_status', 'coming'));
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH,
            upperFlash: 'Attendance confirmed.'
          });
        } else {

          //unsuccessful update
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH,
            upperFlash: 'There was an issue with your confirmation:\n' + resp.body  
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err));
      });
  }
);

export const cancelAttendance = (userState) => (
  (dispatch) => {
    
  }
); 


const readUser = (uEmail, uToken) => (
  (dispatch) => {

    //read the specified user, the query email must match the user's email
    fetch(resURLS.lcsReadURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: uEmail,
        token: uToken,
        query: { 
          email: uEmail
        }
      })
    }).then(resp => resp.json())
      .then(data => {

        //on successful read, set state's user to data
        const user = data.body[0];
        dispatch({
          action: USER_DATA.SET_USER_INFO,
          userInfo: user
        });
        //check for admin status
        dispatch(checkAdmin(user));
        //set the qr code
        dispatch(getQR(user));
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      });
  }
);

const checkAdmin = (user) => (
  (dispatch) => {

    if(!user.role.director) {

      //user does not have admin privileges
      return;
    } else {

      //set as admin
      dispatch(ViewActions.setAsAdmin());
    }
  }
);


const confirmResume = (hasResume) => (
  (dispatch) => {
    
    dispatch({
      type: USER_DATA.HAS_RESUME, 
      resume: hasResume
    });
  }
);

const getQR = (email) => (
  (dispatch) => {

    fetch(resURLS.lcsQRURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        background: resURLS.background,
        color: resURLS.foreground
      })
    }).then(resp => resp.json())
      .then(resp => {
        if(resp.statusCode === 200) {
        
          //QR retrieval successful
          dispatch({
            type: USER_DATA.SET_QR,
            qr: resp.body
          });
        } else {
          dispatch(showCaughtError('Could not display QR.\n' + resp.body));
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError('Could not display QR.\n' + err.toString()));
      });
  }
);

const showCaughtError = (mes) => (
  (dispatch) => {
    console.log('error logged: ' + mes);
    dispatch({
      type: USER_DATA.SET_FLASH,
      flash: 'An error occurred:\n' + mes
    });
  }
);
