import {
    makeStyles,
  } from '@mui/styles';
  
  const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Poppins'
    },
    sweetAlertOKButton: {
      textAlign: 'center',
      textDecoration: 'none',
      textDecorationColor: '#fff',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
      backgroundColor: '#3453D1',
      fontFamily: 'Poppins',
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      color: '#fff',
      'box-shadow': 'none !important',
      shadowColor: theme.palette.background.default,
      '&:hover': {
        filter: 'brightness(0.8)'
      },
      '&:focus': {
        outline: 'none'
      }
    },
    sweetAlertCancelButton: {
      textAlign: 'center',
      textDecoration: 'none',
      textDecorationColor: '#fff',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
      backgroundColor: '#ffffff',
      border: `1px solid #3453D1`,
      fontFamily: 'Poppins',
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.primary.main,
      'box-shadow': 'none !important',
      shadowColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },
    sweetAlertSuccess: {
      color: theme.palette.text.primary,
      fontFamily: 'Poppins',
      fontSize: theme.typography.h3,
      '& div': {
        backgroundColor: 'transparent !important',
      }
    },
    sweetAlert: {
      color: theme.palette.text.primary,
      fontFamily: 'Poppins',
      fontSize: theme.typography.h3,
    }
  }));
  
  export default useStyles;
  