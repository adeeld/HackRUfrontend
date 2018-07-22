//ActionTypes.js


//ViewController actions
export const VIEW_CONTROL = {
  SET_LOGIN_STATUS: 'SET_LOGIN_STATUS',
  IS_ADMIN: 'IS_ADMIN',
  APPLY_FORM: 'APPLY_FORM'
};



//LoginManager actions
export const LOGIN_MNGMNT = {
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  SET_ERROR: 'SET_ERROR',
  SET_MAGIC_LINK: 'SET_MAGIC_LINK',
  HAS_FORGOTTEN_PASSWORD: 'HAS_FORGOTTEN_PASSWORD'
};

//UserManager actions
export const USER_DATA = {
  SET_EMAIL: 'SET_EMAIL',
  SET_TOKEN: 'SET_TOKEN',
  HAS_RESUME: 'HAS_RESUME',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_MENTOR_INFO: 'SET_MENTOR_INFO', //NOT IN USE
  SET_MENTOR_TIMES: 'SET_MENTOR_TIMES', //NOT IN USE
  SET_VOLUNTEER_AREA: 'SET_VOLUNTEER_AREA', //NOT IN USE
  SET_VOLUNTEER_TIMES: 'SET_VOLUNTEER_TIMES', //NOT IN USE
  SET_COC: 'SET_COC',
  SET_SHARE: 'SET_SHARE',
  SET_QR: 'SET_QR',
  SET_FLASH: 'SET_FLASH',
  SET_EXTRA_FLASH: 'SET_EXTRA_FLASH',
  SET_UPPER_FLASH: 'SET_UPPER_FLASH'
};
